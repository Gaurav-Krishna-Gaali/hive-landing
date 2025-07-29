const fs = require('fs');
const path = require('path');

console.log('🔍 Checking environment configuration...\n');

const envPath = path.join(process.cwd(), '.env.local');
const requiredVars = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_POSTHOG_KEY'
];

// Check if .env.local exists
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found!');
  console.log('\n📝 Please create a .env.local file in the root directory with the following variables:');
  console.log('\n# Supabase Configuration');
  console.log('NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key');
  console.log('\n# PostHog Configuration');
  console.log('NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key_here');
  console.log('NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com');
  console.log('\n💡 You can get these values from:');
  console.log('- Supabase: Project Settings → API');
  console.log('- PostHog: Project Settings → API Keys');
  process.exit(1);
}

// Read and check .env.local
const envContent = fs.readFileSync(envPath, 'utf8');
const envVars = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim();
  }
});

console.log('✅ .env.local file found');
console.log('\n📋 Environment variables status:');

let allGood = true;

requiredVars.forEach(varName => {
  const value = envVars[varName];
  if (!value) {
    console.log(`❌ ${varName}: Missing`);
    allGood = false;
  } else if (value.includes('your-') || value.includes('your_')) {
    console.log(`⚠️  ${varName}: Placeholder value detected`);
    allGood = false;
  } else {
    console.log(`✅ ${varName}: Configured`);
  }
});

if (allGood) {
  console.log('\n🎉 All environment variables are properly configured!');
  console.log('You can now run the development server with: npm run dev');
} else {
  console.log('\n⚠️  Please update your .env.local file with actual values.');
  process.exit(1);
} 