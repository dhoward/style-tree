import {createMarkupForStyles} from 'react/lib/CSSPropertyOperations';
import util from "./util";

class Selector {
  constructor(parent, property, object) {
    const name = util.isModifier(property) ? property.substr(1, property.length-1) : property;
    const item = object[property];

    this._name = property;
    this._styles = {};
    this._children = [];
    this._styles = this.createStylesAndChildren(item);
    this._hash = util.createClassName(this._styles);

    this._isModifier = util.isModifier(property);
    this._isPseudo = util.isPseudoSelector(property);
    this._isMediaQuery = util.isMediaQuery(property);

    this.readable = name;
    this.andReadable = `${name} ${this._hash}`;

    this._parent = parent;
    parent[name] = this;
  }

  toString() {
    const base = this._isModifier ? `${this._parent.toString()} ` : "";
    return `${base}${this._hash}`;
  }

  createStylesAndChildren(item) {
    let styles = {};

    for (var prop in item) {
      if (!item.hasOwnProperty(prop)) {
        continue;
      }

      if (prop === "readable" || prop === "andReadable") {
        throw new Error(`Warning: you are attempting to create a selector using the reserved name ${prop}`);
      }

      if (typeof item[prop] !== "object") {
        styles[prop] = item[prop];
        continue;
      }

      this._children.push(new Selector(this, prop, item));
    }

    return styles;
  }

  render(allStyles, pre) {
    const [selector, close] = this.createSelector(pre, this._name, this._styles);
    const open = `${selector} {`.trimLeft();
    const markup = createMarkupForStyles(this._styles);
    const rule = `${open} ${markup} ${close}`;

    allStyles.push(rule);
    this._children.map((child) => child.render(allStyles, selector));

    return allStyles;
  }

  createSelector(prefix, selector, styleObj) {
    if (this._isMediaQuery) {
      return [`${selector} { ${prefix.trimLeft()}`, `} }`];
    }

    if(this._isPseudo) {
      return [`${prefix}${selector}`, `}`];
    }

    const classHash = util.createClassName(styleObj);
    const separator = this._isModifier ? "" : " ";

    return [`${prefix}${separator}.${classHash}`, `}`];
  }
}

export default Selector;
