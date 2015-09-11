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

  createClassName(styles) {
    // TODO: hash classes based on name, content, and nesting so collisions will be irrelevant
    const styleObject = util.sortObject(styles);
    const styleString = util.stringifyObject(styleObject);
    return hash.unique(styleString);
  }

}

export default util;