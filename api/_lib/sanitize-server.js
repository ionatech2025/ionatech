/**
 * Server-side mirror of src/lib/sanitize.js. The browser sanitizer requires
 * a DOM; on the server we run a regex-based stripper. The allow-list is the
 * same so what we accept here renders identically through the client filter.
 *
 * Defence-in-depth: even if a future view forgets to call sanitizeRichText
 * before rendering, the data in the DB cannot contain script/style/href.
 */

const ALLOWED_TAGS = ['strong', 'em', 'b', 'i', 'br'];
const ALLOWED_TAG_REGEX = new RegExp(
  `^<\\/?(?:${ALLOWED_TAGS.join('|')})(?:\\s*\\/)?>$`,
  'i',
);

export function sanitizeRichText(input) {
  if (input == null) return '';
  let html = String(input);

  // Drop entire <script>/<style> elements including their bodies.
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  // Drop HTML comments.
  html = html.replace(/<!--[\s\S]*?-->/g, '');

  // For every remaining tag, keep it if (and only if) it is an allow-listed
  // tag with no attributes. Otherwise strip the tag and keep the inner text.
  return html.replace(/<[^>]*>/g, (tag) => {
    return ALLOWED_TAG_REGEX.test(tag) ? tag.toLowerCase() : '';
  });
}

/** Strip all HTML to plain text. Use for fields that should never render markup. */
export function sanitizePlainText(input) {
  if (input == null) return '';
  return String(input).replace(/<[^>]*>/g, '').trim();
}
