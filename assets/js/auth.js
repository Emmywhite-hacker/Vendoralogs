const { supabase } = window.VendoraSupabase || {};

// Helper: display error messages
function showAuthError(message) {
    document.getElementById('auth-error').textContent = message;
}

// SIGNUP
async function handleSignup(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { name } }});
    if (error) return showAuthError(error.message);
    window.location.href = '/login.html';
}

// LOGIN
async function handleLogin(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return showAuthError(error.message);
    window.location.href = '/marketplace.html';
}

// LOGOUT
function handleLogout() {
    window.VendoraSupabase.logout();
}
