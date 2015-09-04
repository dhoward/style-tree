import Selector from "./selector"
import util from "./util"


const createSelector = (prefix, selector, styleObj) => {
  if (util.isMediaQuery(selector)) {
    return [`${selector} { ${prefix.trimLeft()}`, `} }`];
  }

  if(util.isPseudoSelector(selector)) {
    return [`${prefix}${selector}`, `}`];
  }

  const classHash = util.createClassName(styleObj);
  const separator = util.isModifier(selector) ? "" : " ";

  return [`${prefix}${separator}.${classHash}`, `}`];
}


const renderStyle = (array, pre, className, styleObj) => {
  const [selector, close] = createSelector(pre, className, styleObj);
  const open = `${selector} {`.trimLeft();

  let styles = {};
  for (var prop in styleObj) {
    if (!styleObj.hasOwnProperty(prop)) {
      continue;
    }

    if (typeof styleObj[prop] === "object") {
      renderStyle(array, selector, prop, styleObj[prop]);
    } else {
      styles[prop] = styleObj[prop];
    }
  }

  const markup = util.createMarkup(styles);
  const rule = util.wrapStyles(open, close, markup);

  array.unshift(rule);
}


const renderStyles = (styleObj) => {
  const allStyles = [];

  for (var property in styleObj) {
    renderStyle(allStyles, "", property, styleObj[property]);
  }

  return allStyles;
}

const createStyles = (styleObj) => {
  const allStyles = {};

  for (var property in styleObj) {
    new Selector(allStyles, property, styleObj);
  }

  return allStyles;
}

export {
  createStyles,
  renderStyles
}