/**
 * Turns "/photos/x.jpg" into a URL that also works when the site is
 * deployed under a sub-path (Vite `base`). Full URLs pass through untouched.
 */
export function resolvePhotoSrc(src: string): string {
  if (/^(https?:|data:|blob:)/.test(src) || !src.startsWith('/')) return src;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${src}`;
}
