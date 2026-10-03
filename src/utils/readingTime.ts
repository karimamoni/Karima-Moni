/**
 * Calculates estimated reading time for article content.
 * Standard adult reading speed is approximately 200 words per minute.
 *
 * @param content The main article body content
 * @param excerpt Optional excerpt text to factor in
 * @returns Formatted reading time string (e.g. '5 min read', '1 min read')
 */
export function calculateReadingTime(content?: string, excerpt?: string): string {
  const combined = `${excerpt || ''} ${content || ''}`.trim();
  if (!combined) {
    return '1 min read';
  }

  // Remove common markdown characters and extra whitespace for accurate word counting
  const plainText = combined
    .replace(/[#*`_~[\]()>\\-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const words = plainText ? plainText.split(/\s+/).filter(Boolean).length : 0;
  const wordsPerMinute = 200;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));

  return `${minutes} min read`;
}
