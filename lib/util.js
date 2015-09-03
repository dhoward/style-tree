import hash from 'object-hash';
import {createMarkupForStyles} from 'react/lib/CSSPropertyOperations';

const util = {

  isMediaQuery(selector) {
    return selector[0] === "@";
  },

  isModifier(selector) {
    return selector[0] === "$";
  },

  isPseudoSelector(selector) {
    return selector[0] === ":";
  },

  createMarkup(obj) {
    return createMarkupForStyles(obj);
  },

  wrapStyles(open, close, styles) {
    return `${open} ${styles} ${close}`
  },

  sortObject(obj) {
    return Object.keys( obj )
      .sort()
      .reduce( (acc, key) => {
        const val = obj[key];
        if ( val || val === 0 ) acc[key] = val;
        return acc;
      }, {});
  },

  createClassName(styleObj) {
    let styles = {};
    for (var prop in styleObj) {
      if (!styleObj.hasOwnProperty(prop) || typeof styleObj[prop] === "object") {
        continue;
      }
      styles[prop] = styleObj[prop];
    }

    styles = util.sortObject(styles);
    return hash(styles);
  }

}

export default util;