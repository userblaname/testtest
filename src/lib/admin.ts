export const ADMIN_CREDENTIALS = {
  email: 'admin@test.com',
  password: 'admin123'
}

export function isAdminUser(email: string, password: string): boolean {
  return email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password
}