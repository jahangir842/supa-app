-- Insert sample tasks (replace USER_ID with an actual user ID after they sign up)
insert into public.tasks (title, status, owner)
values
    ('Set up project structure', 'done', 'USER_ID'),
    ('Implement authentication', 'doing', 'USER_ID'),
    ('Create task management UI', 'todo', 'USER_ID'),
    ('Set up deployment pipeline', 'todo', 'USER_ID');
