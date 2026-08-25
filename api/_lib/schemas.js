import { z } from 'zod';
import { sanitizeRichText, sanitizePlainText } from './sanitize-server.js';

/**
 * Shared Zod schemas for admin write endpoints. Each schema models the JSON
 * body the admin form posts. Strings are sanitized first (HTML stripped or
 * narrowed to an allow-list) and *then* length-checked, so a payload like
 * "<b></b>" cannot satisfy a min(1) field by virtue of the markup.
 *
 * `.partial()` versions accept the same shape with every field optional —
 * suitable for PATCH endpoints that update only a subset of fields.
 */

const SLUG_RE = /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;

// Data-URL allow-list. Explicitly excludes `data:image/svg+xml` because SVG
// can carry script payloads (the same reason we reject SVG uploads).
const SAFE_DATA_URL_RE = /^data:image\/(?:jpeg|png|gif|webp|avif);(?:[a-z0-9-]+;)*base64,/i;

const trimToString = (v) => (typeof v === 'string' ? v.trim() : '');

const slug = z.preprocess(trimToString, z.string().min(1).max(80).regex(SLUG_RE, 'invalid_slug'));

const title = z.preprocess(
  (v) => sanitizePlainText(typeof v === 'string' ? v.trim() : ''),
  z.string().min(1).max(200),
);

const shortText = (max) =>
  z.preprocess(
    (v) => sanitizePlainText(typeof v === 'string' ? v.trim() : ''),
    z.string().max(max),
  );

const richText = (max) =>
  z.preprocess(
    (v) => sanitizeRichText(typeof v === 'string' ? v.trim() : ''),
    z.string().max(max),
  );

const url = z.string().trim().max(2048).url().or(z.literal('').transform(() => ''));

const pathOrUrl = z
  .string()
  .trim()
  .max(2048)
  .refine(
    (v) =>
      v === '' ||
      v.startsWith('/') ||
      /^https?:\/\//i.test(v) ||
      v.startsWith('blob:') ||
      SAFE_DATA_URL_RE.test(v),
    'invalid_image_url',
  );

const sortOrder = z.number().int().min(-32_768).max(32_767);
const published = z.boolean();

const techStackEntry = z.preprocess(
  (v) => sanitizePlainText(typeof v === 'string' ? v.trim() : ''),
  z.string().min(1).max(40),
);

export const ProductCreate = z.object({
  slug,
  title,
  description: richText(4000).optional().default(''),
  category: shortText(80).optional().default(''),
  iconName: shortText(80).nullish(),
  image: pathOrUrl.nullish(),
  client: shortText(120).optional().default(''),
  projectUrl: url.optional().default(''),
  techStack: z.array(techStackEntry).max(40).optional().default([]),
  sortOrder: sortOrder.optional().default(0),
  published: published.optional().default(true),
});
export const ProductUpdate = ProductCreate.partial();

export const ServiceCreate = z.object({
  slug,
  title,
  description: richText(4000).optional().default(''),
  iconName: shortText(80).nullish(),
  iconImage: pathOrUrl.nullish(),
  image: pathOrUrl.nullish(),
  colorClass: shortText(120).nullish(),
  features: z.array(shortText(200)).max(60).optional().default([]),
  details: z.record(z.string().max(60), z.unknown()).optional().default({}),
  sortOrder: sortOrder.optional().default(0),
  published: published.optional().default(true),
});
export const ServiceUpdate = ServiceCreate.partial();

export const ProjectCreate = z.object({
  slug,
  title,
  description: richText(4000).optional().default(''),
  client: shortText(120).optional().default(''),
  projectUrl: url.optional().default(''),
  image: pathOrUrl.nullish(),
  iconName: shortText(80).nullish(),
  techStack: z.array(techStackEntry).max(40).optional().default([]),
  status: shortText(40).optional().default('live'),
  sortOrder: sortOrder.optional().default(0),
  published: published.optional().default(true),
});
export const ProjectUpdate = ProjectCreate.partial();

export const TeamCreate = z.object({
  name: title,
  role: shortText(120).optional().default(''),
  bio: richText(2000).optional().default(''),
  image: pathOrUrl.nullish(),
  sortOrder: sortOrder.optional().default(0),
  published: published.optional().default(true),
});
export const TeamUpdate = TeamCreate.partial();

const statEntry = z.object({
  label: shortText(80),
  value: shortText(40),
});

export const AboutPatch = z.object({
  eyebrow: shortText(80).optional().default(''),
  titleLead: shortText(200).optional().default(''),
  titleHighlight: shortText(200).optional().default(''),
  description: richText(4000).optional().default(''),
  image: pathOrUrl.nullish(),
  statBadgeValue: shortText(40).optional().default(''),
  statBadgeLabel: shortText(80).optional().default(''),
  stats: z.array(statEntry).max(20).optional().default([]),
});

export const ContactPatch = z.object({
  email: z.string().trim().email().max(254).or(z.literal('')).optional().default(''),
  phone: shortText(40).optional().default(''),
  address: shortText(200).optional().default(''),
  whatsappNumber: z
    .string()
    .trim()
    .max(20)
    .regex(/^\d*$/, 'invalid_whatsapp_number')
    .optional()
    .default(''),
  web3formsAccessKey: shortText(80).optional().default(''),
});

/**
 * Validate a request body. On success returns the parsed value; on failure
 * sends a 400 with the first issue and returns null so the handler can stop.
 */
export function validate(schema, body, res, badRequest) {
  const result = schema.safeParse(body);
  if (!result.success) {
    const first = result.error.issues[0];
    badRequest(res, `validation:${first.path.join('.') || 'body'}:${first.message}`);
    return null;
  }
  return result.data;
}
