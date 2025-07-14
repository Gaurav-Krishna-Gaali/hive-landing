-- Migration: Create form_responses table for Hive landing page
-- This table stores form submissions from the Hive landing page

create table if not exists public.form_responses (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone_number text not null,
  date_of_birth date,
  gender text,
  occupation text,
  role text,
  email text,
  opinion text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for better query performance
create index if not exists form_responses_email_idx on public.form_responses(email);
create index if not exists form_responses_created_at_idx on public.form_responses(created_at);

-- Enable Row Level Security (RLS) for better security
alter table public.form_responses enable row level security;

-- Create a policy that allows inserting new records (for form submissions)
create policy "Allow form submissions" on public.form_responses
  for insert with check (true);

-- Create a policy that allows reading records (you can modify this based on your needs)
create policy "Allow reading form responses" on public.form_responses
  for select using (true);

-- Add comments for documentation
comment on table public.form_responses is 'Stores form submissions from the Hive landing page';
comment on column public.form_responses.full_name is 'Full name of the person submitting the form';
comment on column public.form_responses.phone_number is 'Phone number for contact';
comment on column public.form_responses.date_of_birth is 'Date of birth (optional)';
comment on column public.form_responses.gender is 'Gender selection (optional)';
comment on column public.form_responses.occupation is 'Occupation/profession (optional)';
comment on column public.form_responses.role is 'Role in the movement (user/volunteer/both)';
comment on column public.form_responses.email is 'Email for early access (optional)';
comment on column public.form_responses.opinion is 'Personal story or thoughts (optional)'; 