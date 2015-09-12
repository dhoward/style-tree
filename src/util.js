import hash from 'shorthash';

const util = {

  beginsWith(string, token) {
    return string[0] === token;
  },

  isMediaQuery(selector) {
    return util.beginsWith(selector, "@");
  },

  isModifier(selector) {
    return util.beginsWith(selector, "$");
  },

  isPseudoSelector(selector) {
    return util.beginsWith(selector, ":");
  },

  sortObject(obj) {
    return Object.keys(obj)
      .sort()
      .reduce( (acc, key) => {
        const val = obj[key];
        if ( val || val === 0 ) acc[key] = val;
        return acc;
      }, {});
  },

  stringifyObject(obj) {
    const keys = Object.keys(obj);
    const length = keys.length;
    let str = "";

    for (let i = 0; i < length; i++) {
      str += keys[i] + obj[keys[i]];
    }

    return str;
  },

  createClassName(parentSelector, property, styles) {
    const styleObject = util.sortObject(styles);
    const styleString = util.stringifyObject(styleObject);
    const hashString = hash.unique(`${parentSelector}${property}${styleString}`);
    return `_${hashString}`;
  }

}

export default util;