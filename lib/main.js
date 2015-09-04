import Selector from "./selector"
import util from "./util"


const createSelector = (prefix, selector, styleObj) => {
  if (util.isMediaQuery(selector)) {
    return [`${selector.trimLeft()} { ${prefix}`, `} }`];
  }

  if(util.isPseudoSelector(selector)) {
    return [`${prefix.trimLeft()}${selector}`, `}`];
  }

  const classHash = util.createClassName(styleObj);

  if(util.isModifier(selector)) {
    return [`${prefix.trimLeft()}.${classHash}`, `}`];
  }

  if (prefix) {
    return [`${prefix.trimLeft()} .${classHash}`, `}`];
  }

  return [`.${classHash}`, `}`];
}


const renderStyle = (array, pre, className, styleObj) => {
  const [selector, close] = createSelector(pre, className, styleObj);
  const open = `${selector} {`;

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