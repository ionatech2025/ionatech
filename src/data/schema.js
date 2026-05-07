/**
 * Single source of truth for editable site content shapes.
 * Mirrors the columns used by the database in db/schema.sql.
 *
 * To add a new content type:
 *   1. Add a typedef + RESOURCES entry below.
 *   2. Add a CREATE TABLE to db/schema.sql.
 *   3. Add handlers in api/content/[resource].js and api/admin/[...path].js.
 *   4. Add list+edit pages under src/pages/admin/<name>/.
 *   5. Add or update the public component in src/Components/<Name>/ to fetch from /api/content/<name>.
 */

/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} category
 * @property {string} iconName       Lucide icon name (e.g. "Code", "Smartphone").
 * @property {string} image          Image URL or imported asset (Phase 1: asset import; Phase 2+: URL).
 * @property {string} [client]       Iona client/customer name for case studies.
 * @property {string} [projectUrl]   Live link or case study URL.
 * @property {string[]} [techStack]
 * @property {number} sortOrder
 * @property {boolean} published
 */

/**
 * @typedef {Object} Service
 * @property {number} id
 * @property {string} slug
 * @property {string} title
 * @property {string} description
 * @property {string} iconName
 * @property {string} iconImage      Small illustrated icon for the card header.
 * @property {string} image
 * @property {string} colorClass     Tailwind class for the icon tint, e.g. "text-blue-600".
 * @property {string[]} features
 * @property {{overview:string, technologies:string[], benefits:string[]}} details
 * @property {number} sortOrder
 * @property {boolean} published
 */

/**
 * @typedef {Object} TeamMember
 * @property {number} id
 * @property {string} name
 * @property {string} role
 * @property {string} bio
 * @property {string} image
 * @property {number} sortOrder
 * @property {boolean} published
 */

/**
 * @typedef {Object} AboutContent
 * @property {string} eyebrow
 * @property {string} titleLead
 * @property {string} titleHighlight
 * @property {string} description
 * @property {string} image
 * @property {string} statBadgeValue
 * @property {string} statBadgeLabel
 * @property {Array<{iconName:string,label:string,detail:string}>} stats
 */

/**
 * @typedef {Object} ContactInfo
 * @property {string} email
 * @property {string} phone
 * @property {string} address
 * @property {string} whatsappNumber
 * @property {string} web3formsAccessKey  Server-only after Phase 2; in Phase 1 is read by frontend.
 */

export const RESOURCES = ['products', 'services', 'team', 'about', 'contact'];
