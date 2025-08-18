-- Create tasks table with RLS
create table public.tasks (
    id uuid default gen_random_uuid() primary key,
    title text not null,
    status text not null check (status in ('todo', 'doing', 'done')),
    created_at timestamptz default now(),
    owner uuid references auth.users(id) on delete cascade not null
);

-- Enable Row Level Security
alter table public.tasks enable row level security;

-- Create policy to allow users to select their own tasks
create policy "Users can view their own tasks"
    on public.tasks for select
    using (auth.uid() = owner);

-- Create policy to allow users to insert their own tasks
create policy "Users can create their own tasks"
    on public.tasks for insert
    with check (auth.uid() = owner);

-- Create policy to allow users to update their own tasks
create policy "Users can update their own tasks"
    on public.tasks for update
    using (auth.uid() = owner)
    with check (auth.uid() = owner);

-- Create policy to allow users to delete their own tasks
create policy "Users can delete their own tasks"
    on public.tasks for delete
    using (auth.uid() = owner);
