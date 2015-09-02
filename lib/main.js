import css from "./css"
import util from "./util"

const allStyles = [];


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

  return [`${prefix.trimLeft()} .${selector}`, `}`];
}


const renderStyle = (pre, className, styleObj) => {
  const [selector, close] = createSelector(pre, className);
  const open = `${selector} {`;

  let styles = {};
  for (var prop in styleObj) {
    if (!styleObj.hasOwnProperty(prop)) {
      continue;
    }

    if (typeof styleObj[prop] === "object") {
      renderStyle(selector, prop, styleObj[prop]);
    } else {
      styles[prop] = styleObj[prop];
    }
  }

  const markup = util.createMarkup(styles);
  const rule = util.wrapStyles(open, close, markup);

  allStyles.unshift(rule);
}


const renderStyles = (styleObj) => {
  for (var property in styleObj) {
    renderStyle("", property, styleObj[property]);
  }

  for (let i = 0; i < allStyles.length; i++) {
    console.log(allStyles[i]);
  }
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

  console.log(allStyles);
}



renderStyles(css);
createStyles(css);