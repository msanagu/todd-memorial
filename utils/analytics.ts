// Helper to track events safely
// This prevents errors if the user has an ad-blocker or if GA isn't loaded

export const trackEvent = (
  action: string,
  params?: {
    category?: string;
    label?: string;
    value?: number;
    [key: string]: any;
  }
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, params);
  } else {
    // Optional: Log to console in development
    console.log(`[Analytics] ${action}`, params);
  }
};
