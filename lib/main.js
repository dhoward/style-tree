import Selector from "./selector"
import util from "./util"

const renderStyles = (styleObj) => {
  const styles = createStyles(styleObj);
  let allStyles = [];

  for (var prop in styles) {
    const style = styles[prop];
    style.render(allStyles, "", prop, style);
  }

  return allStyles.join(" ");
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