// ============================================
// AUTHENTICATION FUNCTIONS
// ============================================

function showAuthError(message) {
    const errorEl = document.getElementById('auth-error');
    if (errorEl) {
        errorEl.textContent = message;
        errorEl.classList.remove('hidden');
    }
    console.error('Auth Error:', message);
}

function clearAuthError() {
    const errorEl = document.getElementById('auth-error');
    if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('hidden');
    }
}

async function handleSignup(e) {
    e.preventDefault();
    console.log('ðŸ”„ Signup initiated...');
    
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) {
        showAuthError('âŒ Supabase not initialized. Refresh and try again.');
        return;
    }
    
    clearAuthError();
    
    const name = document.querySelector('input[name="name"]')?.value;
    const email = document.querySelector('input[name="email"]')?.value;
    const password = document.querySelector('input[name="password"]')?.value;
    
    if (!name || !email || !password) {
        showAuthError('âŒ Please fill in all fields');
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });
        
        if (error) {
            showAuthError(`âŒ ${error.message}`);
            return;
        }
        
        console.log('âœ… Signup successful');
        alert('âœ… Signup successful! Please confirm your email, then login.');
        
        // Clear form
        document.getElementById('signupForm')?.reset();
        
        // Redirect after 2 seconds
        setTimeout(() => {
            window.location.href = '/login.html';
        }, 2000);
        
    } catch (error) {
        showAuthError(`âŒ Signup failed: ${error.message}`);
        console.error('Signup exception:', error);
    }
}

async function handleLogin(e) {
    e.preventDefault();
    console.log('ðŸ”„ Login initiated...');
    
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) {
        showAuthError('âŒ Supabase not initialized. Refresh and try again.');
        return;
    }
    
    clearAuthError();
    
    const email = document.querySelector('input[name="email"]')?.value;
    const password = document.querySelector('input[name="password"]')?.value;
    
    if (!email || !password) {
        showAuthError('âŒ Please fill in all fields');
        return;
    }
    
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });
        
        if (error) {
            showAuthError(`âŒ ${error.message}`);
            return;
        }
        
        console.log('âœ… Login successful');
        localStorage.setItem('vendoraUser', JSON.stringify(data.user));
        
        alert('âœ… Login successful!');
        setTimeout(() => {
            window.location.href = '/marketplace.html';
        }, 1000);
        
    } catch (error) {
        showAuthError(`âŒ Login failed: ${error.message}`);
        console.error('Login exception:', error);
    }
}

function handleLogout() {
    if (window.VendoraSupabase?.logout) {
        window.VendoraSupabase.logout();
    }
}

console.log('âœ… Auth handlers loaded');
