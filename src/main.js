import Selector from "./selector"
import util from "./util"

const allStyles = [];

const createStyles = (styleObj) => {
  const currentStyles = {}

  for (var property in styleObj) {
    const selector = new Selector(null, property, styleObj);
    allStyles.push(selector);
    currentStyles[property] = selector;
  }

  return currentStyles;
}

const renderStyles = (styleObj) => {
  if (styleObj) {
    createStyles(styleObj);
  }

  const renderedStyles = [];
  const numStyles = allStyles.length;

  for (var i=0; i < numStyles; i++) {
    allStyles[i].render(renderedStyles);
  }

  return renderedStyles.join(" ");
}

export {
  createStyles,
  renderStyles
}