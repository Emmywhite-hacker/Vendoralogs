const { supabase } = window.VendoraSupabase || {};

// Load wallet data/balance
async function loadWallet() {
    const user = await window.VendoraSupabase.getUser();
    if (!user) return;
    const { data: wallets } = await supabase.from('wallets').select('*').eq('user_id', user.id);
    let wallet = wallets[0] || { balance: 0 };
    document.getElementById('wallet-balance').textContent = 'â‚¦' + wallet.balance.toLocaleString();
    // Load transactions...
    const { data: txs } = await supabase.from('transactions').select('*').eq('user_id', user.id);
    document.getElementById('wallet-txs').innerHTML =
        txs.map(tx => `<tr><td>${tx.created_at.slice(0,16).replace('T',' ')}</td><td>${tx.type}</td><td>â‚¦${tx.amount}</td><td>${tx.status}</td></tr>`).join('');
}

// Deposit action (mock/demo)
function depositWallet(e) {
    e.preventDefault();
    const amt = parseInt(e.target.amount.value, 10) || 0;
    if (amt <= 0) return alert('Amount must be > 0');
    openKoraPay(amt, null, async res => {
        alert('Deposit complete (simulate)');
        // After webhook, refresh wallet
        loadWallet();
    });
}
