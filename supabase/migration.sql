-- Run this in Supabase SQL Editor (https://supabase.com/dashboard > SQL Editor)

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  provider text not null check (provider in ('stripe', 'liqpay')),
  status text not null default 'inactive',
  stripe_customer_id text,
  stripe_subscription_id text,
  liqpay_order_id text,
  current_period_end timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id)
);

alter table public.subscriptions enable row level security;

create policy "Users can read own subscription"
  on public.subscriptions for select
  using (auth.uid() = user_id);

create policy "Service role can manage all"
  on public.subscriptions for all
  using (true)
  with check (true);
