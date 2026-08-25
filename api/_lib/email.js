import { Resend } from 'resend';

const FROM = 'iONA TECH <noreply@ionatec.com>';

let _client = null;

/**
 * Lazy Resend client — same pattern as db(): throws a clear 503 at request
 * time if RESEND_API_KEY is missing instead of crashing at import.
 */
function client() {
  if (_client) return _client;
  if (!process.env.RESEND_API_KEY) {
    const e = new Error('RESEND_API_KEY is not configured');
    e.status = 503;
    throw e;
  }
  _client = new Resend(process.env.RESEND_API_KEY);
  return _client;
}

export async function sendPasswordResetEmail({ to, resetUrl }) {
  const resend = client();
  const { error } = await resend.emails.send({
    from: FROM,
    to,
    subject: 'Reset your iONA TECH admin password',
    html: `
      <p>Someone requested a password reset for the iONA TECH admin account tied to this email address.</p>
      <p><a href="${resetUrl}">Reset your password</a></p>
      <p>This link expires in 1 hour and can only be used once. If you didn't request this, you can safely ignore this email — your password won't change.</p>
    `,
  });
  if (error) {
    const e = new Error(error.message || 'email_send_failed');
    e.status = 502;
    throw e;
  }
}
