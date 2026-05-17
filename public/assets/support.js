// ============================================
// SUPPORT & HELP FUNCTIONS
// ============================================

async function sendSupportMessage(e) {
    e.preventDefault();
    
    const supabase = window.VendoraSupabase?.supabase;
    if (!supabase) return;
    
    const user = await window.VendoraSupabase.getUser();
    if (!user) {
        alert('Please login first');
        return;
    }
    
    const message = e.target.message?.value;
    if (!message) {
        alert('Please enter a message');
        return;
    }
    
    try {
        const { error } = await supabase.from('support_tickets').insert([{
            user_id: user.id,
            message: message,
            status: 'open'
        }]);
        
        if (error) throw error;
        
        alert('âœ… Message sent! We\'ll respond soon.');
        e.target.reset();
        closeModal('support-modal');
        
    } catch (error) {
        console.error('Support message error:', error);
        alert('âŒ Error: ' + error.message);
    }
}

console.log('âœ… Support functions loaded');
