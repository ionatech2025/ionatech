import { json, methodNotAllowed, serverError } from '../_lib/respond.js';
import { requireAdmin } from '../_lib/auth.js';

export default function handler(req, res) {
  if (req.method !== 'GET') return methodNotAllowed(res, ['GET']);
  try {
    const u = requireAdmin(req);
    json(res, 200, { user: { id: u.uid, email: u.email } });
  } catch (err) {
    serverError(res, err);
  }
}
