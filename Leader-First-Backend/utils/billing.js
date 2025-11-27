export function ensurePeriodWindow(user) {
  const now = new Date();
  // Example: 30-day window from periodStart
  const days = 30;
  const msInDay = 24 * 60 * 60 * 1000;
  if (!user.periodStart || (now - user.periodStart) / msInDay >= days) {
    user.periodStart = now;
    user.publishedCountPeriod = 0;
  }
}

export function canPublish(user) {
  // Allow if plan is active OR published < 2 within period
  if (user.planStatus === "active") return true;
  return user.publishedCountPeriod < 2;
}
