-- Migration: Create clean form_responses table with only used fields
-- This migration creates a fresh table with only the fields that are actually used in the form

-- Drop the existing table if it exists (WARNING: This will delete all existing data)
drop table if exists public.form_responses;

-- Create the new table with only the fields currently used in the form
create table public.form_responses (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  pincode text not null,
  role text not null,
  email text not null,
  opinion text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add indexes for better query performance
create index form_responses_email_idx on public.form_responses(email);
create index form_responses_role_idx on public.form_responses(role);
create index form_responses_pincode_idx on public.form_responses(pincode);
create index form_responses_created_at_idx on public.form_responses(created_at);

-- Enable Row Level Security (RLS) for better security
alter table public.form_responses enable row level security;

-- Create a policy that allows inserting new records (for form submissions)
create policy "Allow form submissions" on public.form_responses
  for insert with check (true);

-- Create a policy that allows reading records (you can modify this based on your needs)
create policy "Allow reading form responses" on public.form_responses
  for select using (true);

-- Add comments for documentation
comment on table public.form_responses is 'Stores form submissions from the Hive landing page with only the fields currently used in the form';
comment on column public.form_responses.full_name is 'Full name of the person submitting the form (required)';
comment on column public.form_responses.pincode is '6-digit pincode/postal code (required)';
comment on column public.form_responses.role is 'Role in the movement: user/volunteer/both (required)';
comment on column public.form_responses.email is 'Email for early access and updates (required)';
comment on column public.form_responses.opinion is 'Personal story or thoughts about joining the movement (optional)';
comment on column public.form_responses.created_at is 'Timestamp when the form was submitted (auto-generated)'; 