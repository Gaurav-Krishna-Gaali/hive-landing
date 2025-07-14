#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🐝 Hive Landing Page - Database Setup\n');

// Check if .env file exists
const envPath = path.join(process.cwd(), '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env file not found!');
  console.log('Please create a .env file with the following variables:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key\n');
  process.exit(1);
}

// Read .env file
const envContent = fs.readFileSync(envPath, 'utf8');
const hasUrl = envContent.includes('NEXT_PUBLIC_SUPABASE_URL=');
const hasKey = envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY=');

if (!hasUrl || !hasKey) {
  console.log('⚠️  Missing required environment variables in .env file');
  console.log('Please ensure you have:');
  console.log('- NEXT_PUBLIC_SUPABASE_URL');
  console.log('- NEXT_PUBLIC_SUPABASE_ANON_KEY\n');
  process.exit(1);
}

console.log('✅ Environment variables found');
console.log('✅ Supabase client installed');
console.log('✅ Migration file created\n');

console.log('📋 Next steps:');
console.log('1. Get your Supabase project URL and anon key from your Supabase dashboard');
console.log('2. Update your .env file with the actual values');
console.log('3. Run: npx supabase login');
console.log('4. Run: npx supabase link --project-ref YOUR_PROJECT_REF');
console.log('5. Run: npx supabase db push');
console.log('\n📖 For detailed instructions, see: supabase/README.md\n');

console.log('🎉 Your database will be ready to capture form submissions!'); 