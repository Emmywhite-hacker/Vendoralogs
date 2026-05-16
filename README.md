# Vendora Market

A premium Nigerian digital marketplace for verified and social media accounts, boosting, and digital goods.

**Built with:**  
- HTML5, CSS3 (Tailwind CDN), Vanilla JavaScript  
- Supabase (Auth + Postgres DB)  
- Kora Pay for wallet deposits  
- Fully responsive, dark/light mode, dashboard, wallet, admin tools  

---

## Features

- Modern fintech design – black, gold, blue gradients
- Glassmorphism, neon/soft glow buttons, premium UI
- Supabase Auth: signup, login, secure sessions
- Marketplace: Verified accounts, boosting, digital products
- Admin: full dashboard CRUD, ad/banner control, stats, wallet management
- Kora Pay: customer wallet deposits, webhooks, instant wallet crediting
- AI-styled, animated hero (integration ready)
- Live statistics, testimonials, notifications, help/chat system

---

## Folder Structure

```
public/         – Main app HTML files
admin/          – Admin dashboard
assets/js/      – All JavaScript modules (page-specific scripts, config, etc.)
assets/img/     – Images, logos, hero art etc.
styles/         – Custom CSS
db/             – Supabase SQL schema
README.md, .env – Project & env setup
```

---

## Quick Setup

1. **Get a Supabase Project**

   - Create a project at https://supabase.com, get the URL and anon/public key

2. **Set up your Supabase tables**

   - Use `db/supabase_schema.sql`  
   - Apply via SQL Editor in your Supabase dashboard

3. **Configure Supabase & Kora Pay**

   - Duplicate `.env.example` as `.env` and fill in your Supabase project URL, anon key, and Kora Pay keys

4. **Frontend Hosting**

   - Upload `public/`, `admin/`, `assets/`, `styles/` to Netlify, Vercel, or any static host

5. **Admin Access**

   - The first registered user (via `/signup.html`) should be manually marked as admin in `users` table, or use Supabase dashboard

6. **Kora Pay Integration**

   - See `assets/js/kora-pay.js`, set up webhooks for production

---

## Live Demo

_N/A – Host to see in action_

---

## Environment Variables (`.env.example`)

```
SUPABASE_URL=<your-supabase-url>
SUPABASE_ANON_KEY=<your-supabase-anon-key>
KORA_PAY_MERCHANT_ID=<your-kora-merchant-id>
KORA_PAY_PUBLIC_KEY=<your-kora-public-key>
```

---

## Credits

- [TailwindCSS CDN](https://cdn.tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/icons/)
- [Kora Pay](https://korapay.com)
- [Supabase](https://supabase.com)

---

## License

MIT