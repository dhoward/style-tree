import Selector from "./selector"
import css from "./css";
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


const createStyle = (styleObj, obj, property) => {
  const item = obj[property];
  const propertyName = util.isModifier(property) ? property.substr(1, property.length-1) : property;
  const classHash = util.createClassName(item);
  const klass = new Selector(propertyName, classHash);
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