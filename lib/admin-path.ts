/**
 * Returns the admin base path using the public env variable.
 * e.g. /admin/787c0a54-360c-4d04-b922-84161d179693
 *
 * Falls back to /admin if UUID is not configured.
 */
export function getAdminBasePath(): string {
  return '/admin'
}
