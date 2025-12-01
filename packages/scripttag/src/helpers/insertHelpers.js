/**
 * @param el
 * @param referenceNode
 */
export const insertAfter = (el, referenceNode) => {
  referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
};

/**
 * @param el
 * @param referenceNode
 */
export const insertBefore = (el, referenceNode) => {
  referenceNode.parentNode.insertBefore(el, referenceNode);
};

/**
 * @param el
 * @param referenceNode
 */
export const insertInside = (el, referenceNode) => {
  referenceNode.parentNode.appendChild(el);
};
