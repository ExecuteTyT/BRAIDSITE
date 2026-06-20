/**
 * Universal helper for generating Telegram bot CTA URLs with source tracking.
 *
 * Pattern: ?start=<REF>__<label>
 *   REF   — referral identifier (kept stable across all links for the bot)
 *   __    — separator (double underscore is valid in Telegram start payload)
 *   label — alphanumeric source tag (only [A-Za-z0-9_])
 *
 * Bot side:
 *   1. Receives `/start <REF>__<label>`
 *   2. Splits payload by `__` (first occurrence)
 *   3. Logs ref + label as the source attribution
 *
 * Telegram start payload constraints: max 64 chars, [A-Za-z0-9_-].
 * The REF is base64-like string without padding, so it stays within the rules.
 */

const REF = 'Nzg5NjAxMDY0MA';
const SEP = '__';

const sanitize = (raw: string): string =>
  raw.replace(/[^A-Za-z0-9_]/g, '_').slice(0, 50);

/**
 * Build a Telegram bot URL with a source label.
 * @example
 *   tgBotUrl('home_hero')  // https://t.me/braidvpn_bot?start=Nzg5NjAxMDY0MA__home_hero
 *   tgBotUrl('srv_discord_final')
 *   tgBotUrl('blog_youtube-no-ads')
 */
export const tgBotUrl = (label: string): string =>
  `https://t.me/braidvpn_bot?start=${REF}${SEP}${sanitize(label)}`;

/**
 * Backward-compatible plain URL without label (treated as `direct` on bot side).
 * Use only in noscript fallbacks or static HTML where labels are not feasible.
 */
export const TELEGRAM_BOT_URL_PLAIN = `https://t.me/braidvpn_bot?start=${REF}${SEP}direct`;
