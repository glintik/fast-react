
/**
 * VTagTuple[type, node, tag, key, attrsHash, attrsLen, constAttrsLen, ...attrs, ...children]
 **/
// 0/*type*/
// 1/*node*/
// 2/*tag*/
// 3/*key*/
// 4/*refT*/
// 5/*ownerT*/
// 6/*attrsHash*/
// 7/*attrsLen*/
// 8/*constAttrsLen*/
// 9/*attrsStartPos*/

/**
 * VTextTuple[type, node, value]
 */
// 0/*type*/
// 1/*nodeText*/
// 2/*text*/

/**
 * VArrayTuple[type, parentNode, keyMap, sourceArray, ...values]
 */
// 0/*type*/
// 1/*parentNodeArr*/
// 2/*keymap*/
// 3/*sourceArray*/
// 4/*arrayFirstNode*/

/**
 * VChildren[type, parentNode, refComponent, ...values]
 */
// 0/*type*/
// 1/*parentNodeChild*/
// 2/*refComponent*/
// 3/*VChildrenFirstNode*/

/**
 * VComponentTuple[type, parentNode, Ctor, key, ref, instance, children, props, propsChildren?]
 */
// 0/*type*/
// 1/*parentNode*/
// 2/*Ctor*/
// 3/*keyCmp*/
// 4/*ref*/
// 5/*ownerC*/
// 6/*instance*/
// 7/*children*/
// 8/*props*/
// 9/*propsChildren*/