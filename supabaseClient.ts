import { createClient } from '@supabase/supabase-js';

// Load env variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase URL or Anon Key missing! Auth will not work.');
}

// Create single supabase client for interacting with your database
export const supabase = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseAnonKey || 'placeholder'
);

// Helper to get current user
export const getCurrentUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
};
