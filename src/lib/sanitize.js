// Tiny allow-list HTML sanitizer for admin-authored copy that needs minimal
// formatting (currently the About description). Keeps a fixed set of inline
// tags (<strong>, <em>, <b>, <i>, <br>) and strips everything else, including
// attributes (so href/onclick/style are impossible). DOM-based — runs in the
// browser only. For server-side use we'd need a different implementation.
const ALLOWED = new Set(['STRONG', 'EM', 'B', 'I', 'BR']);

function clean(node) {
  // Keep text nodes verbatim.
  if (node.nodeType === 3) return node.cloneNode(true);

  // For elements: keep only allow-listed tags, drop attributes, recurse on children.
  if (node.nodeType === 1) {
    if (ALLOWED.has(node.tagName)) {
      const next = document.createElement(node.tagName.toLowerCase());
      for (const child of node.childNodes) next.appendChild(clean(child));
      return next;
    }
    // Disallowed tag: keep children, drop the wrapper.
    const frag = document.createDocumentFragment();
    for (const child of node.childNodes) frag.appendChild(clean(child));
    return frag;
  }

  // Comments, anything else: drop.
  return document.createDocumentFragment();
}

export function sanitizeRichText(html) {
  if (typeof html !== 'string' || !html) return '';
  if (typeof document === 'undefined') return ''; // SSR guard
  const tpl = document.createElement('template');
  tpl.innerHTML = html;
  const out = document.createElement('div');
  for (const node of tpl.content.childNodes) out.appendChild(clean(node));
  return out.innerHTML;
}
