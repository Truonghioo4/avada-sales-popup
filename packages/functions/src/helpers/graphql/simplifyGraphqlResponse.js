/**
 * Recursively simplifies a GraphQL response by removing specified keys and flattening structures based on ignore keys.
 *
 * @param {any} data - Data input GraphQL response.
 * @param {object} [options] - Configuration options.
 * @param {string[]} [options.removeKeys=[]] - Keys to be removed from the response.
 * @param {string[]} [options.ignoreKeys=[]] - Keys to be ignored and their values to be flattened.
 * @returns {any} - Simplified GraphQL response.
 */

export function simplifyGraphqlResponse(data, options = {}) {
  const config = {
    removeKeys: options.removeKeys || [],
    ignoreKeys: options.ignoreKeys || []
  };

  if (data === null || typeof data !== 'object') {
    return data;
  }

  // 2. (Array)
  if (Array.isArray(data)) {
    // Call recursively for each item in the array
    return data.map(item => simplifyGraphqlResponse(item, config));
  }

  for (const key of config.ignoreKeys) {
    if (data[key] !== undefined) {
      // If value is an array, process each item
      if (Array.isArray(data[key])) {
        return data[key].map(item => simplifyGraphqlResponse(item, config));
      }
      // If value is an object, process it recursively
      else if (typeof data[key] === 'object' && data[key] !== null) {
        return simplifyGraphqlResponse(data[key], config);
      }
    }
  }

  // 4. Object
  const newObj = {};
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      // Remove keys in the removeKeys list
      if (config.removeKeys.includes(key)) continue;
      // Recursively process each property
      newObj[key] = simplifyGraphqlResponse(data[key], config);
    }
  }
  return newObj;
}
