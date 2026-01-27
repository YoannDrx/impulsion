// ============================================================================
// GAMIFICATION UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate user level based on XP
 * Formula: level = floor(sqrt(xp / 100)) + 1
 */
export function calculateLevel(xp: number): number {
  return Math.floor(Math.sqrt(xp / 100)) + 1;
}

/**
 * Check if a date is within the last 24 hours
 */
export function isWithin24Hours(date: Date): boolean {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const hours24 = 24 * 60 * 60 * 1000;
  return diff <= hours24;
}

/**
 * Check if a date is from yesterday (for streak continuation)
 */
export function isYesterday(date: Date): boolean {
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  return (
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear()
  );
}

/**
 * Check if a date is today
 */
export function isToday(date: Date): boolean {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
}
