// Supabase SDK - Load via CDN in HTML as well, but for code: 
// Provide your env variables via .env or replace directly here for frontend env

const SUPABASE_URL = 'https://lgwpdigdhnooiyxztxqi.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxnd3BkaWdkaG5vb2l5eHp0eHFpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5NDM4MTksImV4cCI6MjA5NDUxOTgxOX0.b1EumFjEItbxfXe9D9CevMTylnV0mSCOIHr7f_YKnPQ'
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
