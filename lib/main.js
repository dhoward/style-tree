import css from "./css"
import util from "./util"

const allStyles = [];
const allStylesObj = {};


const createPrefix = (prefix, className) => {
  if (util.isMediaQuery(className)) {
    return [`${className} { ${prefix}`.trimLeft(), `} }`];
  }

  if(util.isModifier(className)) {
    const klass = className.substr(1, className.length-1);
    return [`${prefix}.${klass}`.trimLeft(), `}`];
  }

  if(util.isPseudoSelector(className)) {
    return [`${prefix}${className}`.trimLeft(), `}`];
  }

  return [`${prefix} .${className}`.trimLeft(), `}`];
}


const printStyle = (pre, className, styleObj) => {
  const [prefix, suffix] = createPrefix(pre, className);
  let styles = `${prefix} {`;

  for (var prop in styleObj) {
    if (styleObj.hasOwnProperty(prop)) {

      if(typeof styleObj[prop] === "object") {
        printStyle(prefix, prop, styleObj[prop]);
      } else {
        styles += prop+":"+styleObj[prop]+";";
      }

    }
  }

  styles += `${suffix}`;

  allStyles.unshift(styles);
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