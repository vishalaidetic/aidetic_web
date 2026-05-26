/**
 * HMAC-SHA-256 session helpers using the Web Crypto API.
 * Compatible with the Next.js Edge Runtime (no Node.js built-ins).
 */

export const ADMIN_SESSION_COOKIE = 'admin_session'

function getSecret(): string {
  const secret = process.env.SESSION_SECRET
  if (!secret) throw new Error('SESSION_SECRET is not set in environment variables')
  return secret
}

/** Import the raw secret as a CryptoKey for HMAC-SHA-256 */
async function importKey(secret: string): Promise<CryptoKey> {
  const enc = new TextEncoder()
  return crypto.subtle.importKey(
    'raw',
    enc.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  )
}

/** ArrayBuffer → lowercase hex string */
function bufToHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('')
}

/** hex string → Uint8Array */
function hexToBuf(hex: string): Uint8Array {
  const pairs = hex.match(/.{2}/g) ?? []
  return new Uint8Array(pairs.map((b) => parseInt(b, 16)))
}

/**
 * Creates a signed session token for the given email.
 * Format:  base64url(email):timestamp:hmac-hex
 */
export async function createSessionToken(email: string): Promise<string> {
  const key = await importKey(getSecret())
  const emailB64 = btoa(email)
  const timestamp = Date.now().toString()
  const payload = `${emailB64}:${timestamp}`
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload))
  return `${payload}:${bufToHex(sig)}`
}

/**
 * Verifies a session token.
 * Returns the admin email on success, or null if invalid / tampered.
 */
export async function verifySessionToken(token: string): Promise<string | null> {
  try {
    const parts = token.split(':')
    if (parts.length !== 3) return null

    const [emailB64, timestamp, receivedHex] = parts
    const payload = `${emailB64}:${timestamp}`
    const key = await importKey(getSecret())

    const valid = await crypto.subtle.verify(
      'HMAC',
      key,
      hexToBuf(receivedHex) as any,
      new TextEncoder().encode(payload)
    )

    return valid ? atob(emailB64) : null
  } catch {
    return null
  }
}
