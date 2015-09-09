import hash from 'shorthash';
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

  stringifyObject(obj) {
    const keys = Object.keys(obj);
    const length = keys.length;
    let str = "";

    for (let i = 0; i < length; i++) {
      str += keys[i] + obj[keys[i]];
    }

    return str;
  },

  createClassName(styleObj) {
    let styles = {};

    for (var prop in styleObj) {
      if (!styleObj.hasOwnProperty(prop) || typeof styleObj[prop] === "object") {
        continue;
      }
      styles[prop] = styleObj[prop];
    }

    const styleObject = util.sortObject(styles);
    const styleString = util.stringifyObject(styleObject);
    return hash.unique(styleString);
  }

}

export default util;