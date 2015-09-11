import Selector from "./selector"
import util from "./util"

const allStyles = {};

const createStyles = (styleObj) => {
  // TODO: return only the styles created during this call, to avoid collisions
  // store global (top-level) styles can be kept in an array
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
    style.render(renderedStyles);
  }

  return renderedStyles.join(" ");
}

export {
  createStyles,
  renderStyles
}