create type public.app_role as enum ('admin', 'moderator', 'user');
create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users read own roles" on public.user_roles for select to authenticated using (user_id = auth.uid());

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean language sql stable security definer set search_path = public
as $$ select exists (select 1 from public.user_roles where user_id = _user_id and role = _role) $$;

create or replace function public.assign_first_admin()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end $$;
create trigger on_auth_user_created_first_admin after insert on auth.users
for each row execute function public.assign_first_admin();

create table public.ads (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid(),
  brand text not null,
  title text not null,
  body text not null default '',
  offer text not null default '',
  phone text not null default '',
  image_url text not null default '',
  is_own boolean not null default false,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  created_at timestamptz not null default now()
);
grant select on public.ads to anon;
grant select, insert, update, delete on public.ads to authenticated;
grant all on public.ads to service_role;
alter table public.ads enable row level security;
create policy "Public reads approved ads" on public.ads for select to anon, authenticated using (status = 'approved');
create policy "Owners read own ads" on public.ads for select to authenticated using (owner_id = auth.uid());
create policy "Admin reads all ads" on public.ads for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Users submit pending ads" on public.ads for insert to authenticated
  with check (owner_id = auth.uid() and ((status = 'pending' and is_own = false) or public.has_role(auth.uid(), 'admin')));
create policy "Admin updates ads" on public.ads for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admin or owner deletes ads" on public.ads for delete to authenticated using (owner_id = auth.uid() or public.has_role(auth.uid(), 'admin'));