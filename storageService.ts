
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
        if (!db.objectStoreNames.contains('characters')) {
          db.createObjectStore('characters', { keyPath: 'id' });
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
          type: image.tool, // Mapping ToolType to simple type string
          created_at: new Date(image.timestamp).toISOString(),
          data: {
            url: image.url,
            prompt: image.prompt,
            metadata: {
              seo: image.seo,
              mockupUrl: image.mockupUrl,
              kdpBlueprint: image.kdpBlueprint,
              productionDossier: image.productionDossier
            }
          }
        };

        const { error } = await supabase
          .from('content')
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
          .from('content')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (data && !error) {
          // Map back to app format
          return data.map(item => ({
            id: item.id,
            url: item.data?.url || '',
            prompt: item.data?.prompt || '',
            tool: item.type,
            timestamp: new Date(item.created_at).getTime(),
            seo: item.data?.metadata?.seo,
            mockupUrl: item.data?.metadata?.mockupUrl,
            kdpBlueprint: item.data?.metadata?.kdpBlueprint,
            productionDossier: item.data?.metadata?.productionDossier
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
        await supabase.from('content').delete().eq('id', id);
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
  }

  // --- PROJECT SPECIFIC SYNC (PHASE 5) ---

  /**
   * Saves a full project state (Blueprint + Project Config) to the cloud
   * Decoupled from "Image Generation" to allow early draft persistence
   */
  async saveProject(id: string, tool: string, project: any, blueprint: any): Promise<void> {
    // 1. Save Locally
    if (!this.db) await this.init();
    const projectRecord = {
      id,
      tool,
      timestamp: Date.now(),
      kdpProject: project,
      kdpBlueprint: blueprint,
      type: 'PROJECT'
    };

    await new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readwrite');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(projectRecord);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // 2. Sync to Cloud
    try {
      const user = await getCurrentUser();
      if (user) {
        const shapeForDb = {
          id: id,
          user_id: user.id,
          type: tool,
          created_at: new Date().toISOString(),
          data: {
            url: 'PROJECT_STATE',
            prompt: `Project: ${project.title || 'Untitled'}`,
            metadata: {
              kdpProject: project,
              kdpBlueprint: blueprint,
              isProjectState: true
            }
          }
        };

        const { error } = await supabase
          .from('content')
          .upsert(shapeForDb);

        if (error) console.error('Cloud Project Sync Error:', error.message);
      }
    } catch (e) {
      console.warn('Project Sync failed (Offline?)');
    }
  }

  /**
   * Fetches the most recent project state for a specific tool
   */
  async getLatestProject(tool: string): Promise<{ project: any, blueprint: any } | null> {
    try {
      const user = await getCurrentUser();
      if (user) {
        const { data, error } = await supabase
          .from('content')
          .select('data')
          .eq('user_id', user.id)
          .eq('type', tool)
          .eq('data->metadata->isProjectState', true)
          .order('created_at', { ascending: false })
          .limit(1);

        if (data && data.length > 0 && !error) {
          return {
            project: data[0].data.metadata.kdpProject,
            blueprint: data[0].data.metadata.kdpBlueprint
          };
        }
      }
    } catch (e) {
      console.warn('Cloud fetch for project failed');
    }

    // Local fallback
    if (!this.db) await this.init();
    return new Promise((resolve) => {
      const transaction = this.db!.transaction([STORE_NAME], 'readonly');
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        const records = request.result as any[];
        const latest = records
          .filter(r => r.tool === tool && r.type === 'PROJECT')
          .sort((a, b) => b.timestamp - a.timestamp)[0];

        if (latest) {
          resolve({ project: latest.kdpProject, blueprint: latest.kdpBlueprint });
        } else {
          resolve(null);
        }
      };
      request.onerror = () => resolve(null);
    });
  }

  // --- CHARACTER VAULT (PHASE 5) ---

  async saveCharacter(profile: any): Promise<void> {
    if (!this.db) await this.init();
    await new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['characters'], 'readwrite');
      const store = transaction.objectStore('characters');
      const request = store.put(profile);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    // Cloud Sync (Optional for now)
    try {
      const user = await getCurrentUser();
      if (user) {
        await supabase.from('characters').upsert({
          id: profile.id,
          user_id: user.id,
          data: profile,
          updated_at: new Date().toISOString()
        });
      }
    } catch (e) { }
  }

  async getAllCharacters(): Promise<any[]> {
    if (!this.db) await this.init();
    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction(['characters'], 'readonly');
      const store = transaction.objectStore('characters');
      const request = store.getAll();
      request.onsuccess = () => {
        resolve(request.result);
        transaction.commit(); // Explicitly commit the transaction
      };
      request.onerror = () => {
        transaction.abort(); // Abort on error
        resolve([]);
      };
      // Set a timeout to prevent hanging
      setTimeout(() => {
        if (transaction) {
          transaction.abort();
          resolve([]);
        }
      }, 5000); // 5 second timeout
    });
  }

  async deleteCharacter(id: string): Promise<void> {
    if (!this.db) await this.init();
    await new Promise<void>((resolve, reject) => {
      const transaction = this.db!.transaction(['characters'], 'readwrite');
      const store = transaction.objectStore('characters');
      const request = store.delete(id);
      request.onsuccess = () => {
        transaction.commit(); // Explicitly commit the transaction
        resolve();
      };
      request.onerror = () => {
        transaction.abort(); // Abort on error
        reject(request.error);
      };
      // Set a timeout to prevent hanging
      setTimeout(() => {
        if (transaction) {
          transaction.abort();
          resolve();
        }
      }, 3000); // 3 second timeout
    });

    try {
      const user = await getCurrentUser();
      if (user) {
        await supabase.from('characters').delete().eq('id', id);
      }
    } catch (e) { }
  }
}

export const storage = new StorageService();
