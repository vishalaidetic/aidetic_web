import { SignJWT, jwtVerify } from 'jose'

export const ADMIN_SESSION_COOKIE = 'x_token'

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback-secret-for-development-only-1234567890')

export async function createSessionToken(email: string): Promise<string> {
  const token = await new SignJWT({ email, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(SECRET)
  
  return token
}

export async function verifySessionToken(token: string) {
  try {
    const verified = await jwtVerify(token, SECRET)
    return verified.payload
  } catch (err) {
    return null
  }
}
