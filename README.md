This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## PostHog Analytics Setup

This project includes PostHog analytics integration for tracking user behavior and conversions.

### Environment Variables

Add the following to your `.env.local` file:

```bash
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_project_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

### Features Implemented

- **Event Tracking**: Form submissions, button clicks, video interactions
- **User Identification**: When users submit forms with email
- **Session Recording**: Automatic session recording enabled
- **Custom Properties**: User roles, occupations, form completion data

### Getting Your PostHog API Key

1. Sign up at [PostHog](https://posthog.com)
2. Create a new project
3. Go to Project Settings → API Keys
4. Copy your Project API Key
5. Add it to your `.env.local` file

### Tracked Events

- `form_submitted` - When users complete the signup form
- `button_clicked` - Navigation and CTA button clicks
- `video_interaction` - Video play, pause, and completion events
- `page_viewed` - Automatic page view tracking

"# hive-landing" 
