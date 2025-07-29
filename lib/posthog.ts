import posthog from 'posthog-js'

let isInitialized = false

// Initialize PostHog only on client side
const initPostHog = () => {
  if (typeof window !== 'undefined' && !isInitialized) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com',
      capture_pageview: false, // We'll handle this manually
      capture_pageleave: true,
      session_recording: {
        recordCrossOriginIframes: false,
      },
    })
    isInitialized = true
  }
}

// Helper function to identify users
export const identifyUser = (userId: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    initPostHog()
    posthog.identify(userId, properties)
  }
}

// Helper function to track custom events
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    initPostHog()
    posthog.capture(eventName, properties)
  }
}

// Helper function to set user properties
export const setUserProperties = (properties: Record<string, any>) => {
  if (typeof window !== 'undefined') {
    initPostHog()
    posthog.people.set(properties)
  }
}

// Helper function to track form submissions
export const trackFormSubmission = (formType: string, properties?: Record<string, any>) => {
  trackEvent('form_submitted', {
    form_type: formType,
    ...properties
  })
}

// Helper function to track video interactions
export const trackVideoInteraction = (videoName: string, action: 'play' | 'pause' | 'complete', properties?: Record<string, any>) => {
  trackEvent('video_interaction', {
    video_name: videoName,
    action,
    ...properties
  })
}

// Helper function to track button clicks
export const trackButtonClick = (buttonName: string, properties?: Record<string, any>) => {
  trackEvent('button_clicked', {
    button_name: buttonName,
    ...properties
  })
}

// Helper function to track page views
export const trackPageView = (pageName: string, properties?: Record<string, any>) => {
  trackEvent('page_viewed', {
    page_name: pageName,
    ...properties
  })
}

export default posthog 