-- Migration: Clean up form_responses table to only include used fields
-- This migration removes unused columns and keeps only the fields that are actually used in the form

-- Drop unused columns
alter table public.form_responses drop column if exists phone_number;
alter table public.form_responses drop column if exists date_of_birth;
alter table public.form_responses drop column if exists gender;

-- Update the table structure to match the current form fields
-- The table now only contains:
-- - id (uuid, primary key)
-- - full_name (text, required)
-- - pincode (text, required)
-- - role (text, required)
-- - email (text, required)
-- - opinion (text, optional)
-- - created_at (timestamp, auto-generated)

-- Update comments to reflect the current schema
comment on table public.form_responses is 'Stores form submissions from the Hive landing page with only the fields currently used in the form';
comment on column public.form_responses.full_name is 'Full name of the person submitting the form (required)';
comment on column public.form_responses.pincode is '6-digit pincode/postal code (required)';
comment on column public.form_responses.role is 'Role in the movement: user/volunteer/both (required)';
comment on column public.form_responses.email is 'Email for early access and updates (required)';
comment on column public.form_responses.opinion is 'Personal story or thoughts about joining the movement (optional)';

-- Ensure we have the right indexes for the fields we're actually using
create index if not exists form_responses_role_idx on public.form_responses(role);
create index if not exists form_responses_pincode_idx on public.form_responses(pincode);
create index if not exists form_responses_email_idx on public.form_responses(email);
create index if not exists form_responses_created_at_idx on public.form_responses(created_at); 