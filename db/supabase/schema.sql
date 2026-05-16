-- Users Table
create table if not exists users (
    id uuid primary key default uuid_generate_v4(),
    email text unique not null,
    password_hash text,
    name text,
    is_admin boolean default false,
    created_at timestamptz default now()
);

-- Wallet Table
create table if not exists wallets (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users (id) on delete cascade,
    balance numeric(15,2) default 0,
    updated_at timestamptz default now()
);

-- Transactions Table
create table if not exists transactions (
    id uuid primary key default uuid_generate_v4(),
    type varchar(20) check (type in ('deposit', 'purchase', 'refund')),
    amount numeric(15,2) not null,
    user_id uuid references users (id) on delete cascade,
    status varchar(20) default 'pending',
    reference text, -- Kora Pay txn ref or system ref
    created_at timestamptz default now()
);

-- Products Table
create table if not exists products (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    description text,
    image_url text,
    category varchar(50),
    price numeric(15,2) not null,
    is_featured boolean default false,
    created_at timestamptz default now()
);

-- Product Variants
create table if not exists product_variants (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid references products(id) on delete cascade,
    name text not null,
    price numeric(15,2),
    delivery_url text, -- File or URL delivered after purchase
    stock integer default 10
);

-- Orders Table
create table if not exists orders (
    id uuid primary key default uuid_generate_v4(),
    product_id uuid references products(id),
    variant_id uuid references product_variants(id),
    user_id uuid references users (id),
    price numeric(15,2),
    status varchar(20) default 'completed',
    delivery_url text,
    created_at timestamptz default now()
);

-- Notifications Table
create table if not exists notifications (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users (id),
    title text,
    body text,
    is_read boolean default false,
    created_at timestamptz default now()
);

-- Support/Help Desk
create table if not exists support_tickets (
    id uuid primary key default uuid_generate_v4(),
    user_id uuid references users(id),
    message text,
    reply text,
    status varchar(20) default 'open', -- open or closed
    created_at timestamptz default now(),
    replied_at timestamptz
);

-- Landing Page Editable Settings/Texts
create table if not exists landing_settings (
    id uuid primary key default uuid_generate_v4(),
    key text primary key,
    value text
);

-- Ad Banners
create table if not exists advertisements (
    id uuid primary key default uuid_generate_v4(),
    image_url text,
    link_url text,
    is_active boolean default true,
    created_at timestamptz default now()
);
