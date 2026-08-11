create table if not exists public.kaoyan_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.kaoyan_profiles enable row level security;

create policy "Users can read their own kaoyan profile"
  on public.kaoyan_profiles
  for select
  using (auth.uid() = user_id);

create policy "Users can create their own kaoyan profile"
  on public.kaoyan_profiles
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own kaoyan profile"
  on public.kaoyan_profiles
  for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
