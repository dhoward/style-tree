import Selector from "./selector"
import util from "./util"

const allStyles = {};

const createStyles = (styleObj) => {
  for (var property in styleObj) {
    new Selector(allStyles, property, styleObj);
  }

  return allStyles;
}

const renderStyles = (styleObj) => {
  if (styleObj) {
    createStyles(styleObj);
  }

  const renderedStyles = [];
  for (var prop in allStyles) {
    const style = allStyles[prop];
    style.render(renderedStyles, "", prop, style);
  }

  return renderedStyles.join(" ");
}

export {
  createStyles,
  renderStyles
}