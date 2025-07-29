import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Analytics } from '@vercel/analytics/next';
import PostHogProvider from "@/components/PostHogProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Hive - Your Neighborhood Safety Network",
  description: "Where neighbors become first responders. Join the movement for safer communities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen relative`}
        suppressHydrationWarning={true}
      >
        <PostHogProvider>
          <BackgroundBeams className="fixed inset-0 -z-10" />
          {children}
          <Analytics/>
        </PostHogProvider>
      </body>
    </html>
  );
}
