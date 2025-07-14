# Supabase Database Management

This directory contains the Supabase configuration and migrations for the Hive landing page project.

## Setup Instructions

### 1. Install Supabase CLI (if not already installed)
```bash
npm install -g supabase
# or use npx
npx supabase --version
```

### 2. Link to your Supabase project
```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

Replace `YOUR_PROJECT_REF` with your actual Supabase project reference ID (found in your project settings).

### 3. Apply migrations to your database
```bash
npx supabase db push
```

This will apply all migrations in the `migrations/` directory to your Supabase database.

### 4. View your database in the dashboard
After running the migration, you can view your `form_responses` table in the Supabase dashboard under:
- **Table Editor** → `form_responses`

## Migration Files

- `20250114000000_create_form_responses.sql` - Creates the main form responses table with all necessary columns and security policies.

## Environment Variables

Make sure to add these to your `.env` file:
```
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

## Useful Commands

- `npx supabase db diff` - Generate a new migration from schema changes
- `npx supabase db reset` - Reset your database (⚠️ destructive)
- `npx supabase status` - Check the status of your local development setup

## Table Schema

The `form_responses` table includes:
- `id` (UUID, primary key)
- `full_name` (text, required)
- `phone_number` (text, required)
- `date_of_birth` (date, optional)
- `gender` (text, optional)
- `occupation` (text, optional)
- `role` (text, optional)
- `email` (text, optional)
- `opinion` (text, optional)
- `created_at` (timestamp, auto-generated) 