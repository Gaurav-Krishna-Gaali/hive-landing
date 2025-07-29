'use client'

import { useEffect } from 'react'
import posthog from '@/lib/posthog'

interface PostHogProviderProps {
  children: React.ReactNode
}

export default function PostHogProvider({ children }: PostHogProviderProps) {
  useEffect(() => {
    // Initialize PostHog and track initial page view only on client side
    if (typeof window !== 'undefined') {
      // Small delay to ensure proper initialization
      const timer = setTimeout(() => {
        posthog.capture('$pageview')
      }, 100)
      
      return () => clearTimeout(timer)
    }
  }, [])

  return <>{children}</>
} 