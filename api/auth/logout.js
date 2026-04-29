import { json, methodNotAllowed } from '../_lib/respond.js';
import { clearAuthCookie } from '../_lib/auth.js';

export default function handler(req, res) {
  if (req.method !== 'POST') return methodNotAllowed(res, ['POST']);
  clearAuthCookie(res);
  json(res, 200, { ok: true });
}
