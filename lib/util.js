const util = {

  isMediaQuery(selector) {
    return selector[0] === "@";
  },

  isModifier(selector) {
    return selector[0] === "$";
  },

  isPseudoSelector(selector) {
    return selector[0] === ":";
  }

}

export default util;