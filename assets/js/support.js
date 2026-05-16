const { supabase } = window.VendoraSupabase || {};

// User send help/complaint
async function sendSupportMessage(e) {
    e.preventDefault();
    const msg = e.target.message.value;
    const user = await window.VendoraSupabase.getUser();
    if (!user) return alert('Not logged in');
    const { data, error } = await supabase.from('support_tickets').insert([{ user_id: user.id, message: msg }]);
    if (error) alert('Send failed');
    else alert('Message sent!');
}
// Admin: reply to support ticket (admin page)
async function replySupport(id) {
    const reply = prompt('Your reply:');
    if (!reply) return;
    const { error } = await supabase.from('support_tickets').update({ reply, status: 'closed', replied_at: new Date().toISOString() }).eq('id', id);
    if (error) alert('Reply failed');
    else alert('Reply sent!');
}
