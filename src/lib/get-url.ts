export function getUrl(path?: string) {
  const baseUrl = process.env.NEXT_PUBLIC_URL || ''
  const normalizePath = path && !path.startsWith('/') ? `/${path}` : path || ''

  return `${baseUrl}${normalizePath}`
}