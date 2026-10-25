type Fbq = (...args: unknown[]) => void;

export function track(event: string, params?: Record<string, unknown>, eventId?: string) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  if (!fbq) return;
  if (eventId) fbq("track", event, params ?? {}, { eventID: eventId });
  else fbq("track", event, params ?? {});
}

export function trackCustom(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  const fbq = (window as unknown as { fbq?: Fbq }).fbq;
  fbq?.("trackCustom", event, params ?? {});
}
