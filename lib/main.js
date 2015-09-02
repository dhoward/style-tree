import css from "./css"
import util from "./util"


const createSelector = (prefix, selector) => {
  if (util.isMediaQuery(selector)) {
    return [`${selector.trimLeft()} { ${prefix}`, `} }`];
  }

  if(util.isModifier(selector)) {
    const klass = selector.substr(1, selector.length-1);
    return [`${prefix.trimLeft()}.${klass}`, `}`];
  }

  if(util.isPseudoSelector(selector)) {
    return [`${prefix.trimLeft()}${selector}`, `}`];
  }

  if (prefix) {
    return [`${prefix.trimLeft()} .${selector}`, `}`];
  }

  return [`.${selector}`, `}`];
}


const renderStyle = (array, pre, className, styleObj) => {
  const [selector, close] = createSelector(pre, className);
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


const createStyle = (styleObj, obj, property) => {
  const item = obj[property];
  const propertyName = util.isModifier(property) ? property.substr(1, property.length-1) : property;
  const klass = new String(propertyName);
  styleObj[propertyName] = klass;

  for (var prop in item) {
    if (!item.hasOwnProperty(prop)) {
      continue;
    }

    if (typeof item[prop] !== "object" || util.isPseudoSelector(prop) || util.isMediaQuery(prop)) {
      continue;
    }

    createStyle(klass, item, prop);
  }

}


const createStyles = (styleObj) => {
  const allStyles = {};

  for (var property in styleObj) {
    createStyle(allStyles, styleObj, property);
  }

  return allStyles;
}

export {
  createStyles,
  renderStyles
}