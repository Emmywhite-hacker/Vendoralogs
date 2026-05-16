// Supabase SDK - Load via CDN in HTML as well, but for code: 
// Provide your env variables via .env or replace directly here for frontend env

const SUPABASE_URL = 'https://<your-supabase-project-id>.supabase.co'; // <-- FILL
const SUPABASE_KEY = '<your-anon-key>'; // <-- FILL

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper: Check auth, get user, sign out users
window.VendoraSupabase = {
    supabase,
    async getUser() {
        const { data: { user } } = await supabase.auth.getUser();
        return user;
    },
    async logout() {
        await supabase.auth.signOut();
        window.location.href = '/login.html';
    }
};
