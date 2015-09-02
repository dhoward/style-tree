import css from "./css"
import util from "./util"

const allStyles = [];
const allStylesObj = {};


const createPrefix = (prefix, className) => {
  if (util.isMediaQuery(className)) {
    return [`${className.trimLeft()} { ${prefix}`, `} }`];
  }

  if(util.isModifier(className)) {
    const klass = className.substr(1, className.length-1);
    return [`${prefix.trimLeft()}.${klass}`, `}`];
  }

  if(util.isPseudoSelector(className)) {
    return [`${prefix.trimLeft()}${className}`, `}`];
  }

  return [`${prefix.trimLeft()} .${className}`, `}`];
}


const printStyle = (pre, className, styleObj) => {
  const [selector, close] = createPrefix(pre, className);
  const open = `${selector} {`;
  // console.log("-----");
  // console.log(pre);
  // console.log(open);
  // console.log(close);
  // let styles = `${prefix}`;

  // console.log("-----------");
  // console.log(util.createMarkup(styleObj));

  let styles = {};
  for (var prop in styleObj) {
    if (!styleObj.hasOwnProperty(prop)) {
      continue;
    }

    if(typeof styleObj[prop] === "object") {
      printStyle(selector, prop, styleObj[prop]);
    } else {
      // styles += prop+":"+styleObj[prop]+";";
      styles[prop] = styleObj[prop];
    }
  }

  const markup = util.createMarkup(styles);
  const rule = util.wrapStyles(open, close, markup);
  // styles += `${suffix}`;

  allStyles.unshift(rule);
}


const printStyles = (styleObj) => {
  for (var property in styleObj) {
    printStyle("", property, styleObj[property]);
  }

  for(let i = 0; i < allStyles.length; i++) {
    console.log(allStyles[i]);
  }
}


const createStyle = (styleObj, obj, property) => {

  const item = obj[property];
  const klass = new String(property);
  styleObj[property] = klass;

  for (var prop in item) {
    if (!item.hasOwnProperty(prop)) {
      continue;
    }

    if(util.isPseudoSelector(prop) || util.isMediaQuery(prop)) {
      continue;
    }

    if(typeof item[prop] === "object") {
      if(util.isModifier(prop)) {
        createStyle(klass, item[prop], prop.substr(1, prop.length-1));
      } else {
        createStyle(klass, item[prop], prop);
      }
    }
  }

}


const createStyles = (styleObj) => {
  for (var property in styleObj) {
    createStyle(allStylesObj, styleObj, property);
  }

  console.log(allStylesObj);
}



printStyles(css);
createStyles(css);