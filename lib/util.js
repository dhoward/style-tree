import { createMarkupForStyles } from 'react/lib/CSSPropertyOperations';

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
  }

}

export default util;