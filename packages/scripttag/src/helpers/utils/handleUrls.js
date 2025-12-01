/**
 * @param urls
 * @returns {(null|string|string)[]}
 */
export function splitUrls(urls = '') {
  return urls
    .trim()
    .split(/[\s\n\r]+/)
    .filter(url => url.trim().length > 0);
}

/**
 * @param path
 * @returns {*|string}
 */
export function normalizePath(path) {
  if (!path || path === '/') return '/';
  const normalized = path.endsWith('/') ? path.slice(0, -1) : path;
  return normalized.startsWith('/') ? normalized : '/' + normalized;
}

/**
 * @param currentPath
 * @param targetPath
 * @returns {boolean}
 */
export function isUrlMatch(currentPath, targetPath) {
  const current = normalizePath(currentPath);
  const target = normalizePath(targetPath);

  if (target === '/') {
    return current === '/';
  }

  if (current === target) {
    return true;
  }

  return current.startsWith(target + '/');
}
