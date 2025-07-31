-- Migration: Replace occupation column with pincode column
-- This migration updates the form_responses table to use pincode instead of occupation

-- Add the new pincode column
alter table public.form_responses add column pincode text;

-- Update the comment for the new column
comment on column public.form_responses.pincode is '6-digit pincode/postal code (optional)';

-- Drop the old occupation column
alter table public.form_responses drop column occupation;

-- Add an index for pincode queries if needed
create index if not exists form_responses_pincode_idx on public.form_responses(pincode); 