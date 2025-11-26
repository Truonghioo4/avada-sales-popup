import {splitUrls, normalizePath, isUrlMatch} from './handleUrls';

/**
 * @param settings
 * @returns {boolean}
 */
export function isShowPop(settings = {}) {
  const {allowShow, includedUrls = '', excludedUrls = ''} = settings;
  const currentUrl = window.location.pathname;
  const normalizedCurrentUrl = normalizePath(currentUrl);

  const includedUrlsArray = splitUrls(includedUrls);
  const excludedUrlsArray = splitUrls(excludedUrls);

  const isExcluded = excludedUrlsArray.some(url => isUrlMatch(normalizedCurrentUrl, url));
  if (isExcluded) return false;

  if (allowShow === 'all') return true;
  else if (allowShow === 'specific') {
    if (includedUrlsArray.length === 0) return false;
    const isIncluded = includedUrlsArray.some(url => isUrlMatch(normalizedCurrentUrl, url));
    return isIncluded;
  }
  return false;
}
