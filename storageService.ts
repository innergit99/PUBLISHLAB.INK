
import { GeneratedImage } from './types';
import { supabase, getCurrentUser } from './supabaseClient';

const DB_NAME = 'ArtisanAI_DB';
const STORE_NAME = 'creations';
const DB_VERSION = 1;

export class StorageService {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        }
      };

      request.onsuccess = (event: any) => {
        this.db = event.target.result;
        resolve();
      };

      request.onerror = (event: any) => {
        console.error('IndexedDB error:', event.target.error);
        reject(event.target.error);
      };
    });
  }

  async saveImage(image: GeneratedImage): Promise<void> {
    // 1. Save locally (Always)
    if (!this.db) await this.init();
    await new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(image);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // 2. Sync to Cloud (If logged in)
    try {
      const user = await getCurrentUser();
      if (user) {
        const shapeForDb = {
          id: image.id,
          user_id: user.id,
          image_url: image.url, // Corrected from imageUrl
          prompt: image.prompt,
          tool_used: image.tool, // Corrected from toolType
          created_at: new Date(image.timestamp).toISOString(),
          metadata: {
            seo: image.seo,
            mockupUrl: image.mockupUrl,
            kdpBlueprint: image.kdpBlueprint,
            productionDossier: image.productionDossier
          }
        };

        const { error } = await supabase
          .from('creations')
          .upsert(shapeForDb);

        if (error) console.error('Cloud Sync Error:', error.message);
      }
    } catch (e) {
      // Don't fail the save if cloud fails
      console.warn('Sync failed (Offline?)');
    }
  }

  async getAllImages(): Promise<GeneratedImage[]> {
    // 1. Try to fetch from cloud first if online/authed
    try {
      const user = await getCurrentUser();
      if (user) {
        const { data, error } = await supabase
          .from('creations')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data && !error) {
          // Map back to app format
          return data.map(item => ({
            id: item.id,
            url: item.image_url, // Corrected from imageUrl
            prompt: item.prompt,
            tool: item.tool_used, // Corrected from toolType
            timestamp: new Date(item.created_at).getTime(),
            // Unpack metadata if it exists
            seo: item.metadata?.seo,
            mockupUrl: item.metadata?.mockupUrl,
            kdpBlueprint: item.metadata?.kdpBlueprint,
            productionDossier: item.metadata?.productionDossier
          }));
        }
      }
    } catch (e) {
      console.warn('Cloud fetch failed, using local cache');
    }

    // 2. Fallback to LocalDB
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        // Sort by timestamp descending
        const results = (request.result as GeneratedImage[]).sort((a, b) => b.timestamp - a.timestamp);
        resolve(results);
      };
      request.onerror = () => reject(request.error);
    });
  }

  async deleteImage(id: string): Promise<void> {
    if (!this.db) await this.init();

    // Local delete
    await new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Cloud delete
    try {
      const user = await getCurrentUser();
      if (user) {
        await supabase.from('creations').delete().eq('id', id);
      }
    } catch (e) {
      console.error('Cloud delete failed', e);
    }
  }

  async clearAll(): Promise<void> {
    if (!this.db) await this.init();
    // Local clear
    await new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // We typically DON'T clear cloud DB on "Clear History", but if requested:
    // await supabase.from('creations').delete().eq('user_id', user.id); 
  }
}

export const storage = new StorageService();
