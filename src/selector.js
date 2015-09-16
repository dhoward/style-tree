import {createMarkupForStyles} from 'react/lib/CSSPropertyOperations';
import util from "./util";

class Selector {
  constructor(parent, property, object) {
    const name = util.isModifier(property) ? property.substr(1, property.length-1) : property;
    const item = object[property];
    const parentSelector = parent ? parent._selector : "";
    const {styles, children} = Selector.createStyles(item);

    this._name = property;
    this._hash = util.createClassName(parentSelector, property, styles);

    this._isModifier = util.isModifier(property);
    this._isPseudo = util.isPseudoSelector(property);
    this._isMediaQuery = util.isMediaQuery(property);

    this.readable = name;
    this.andReadable = `${name} ${this._hash}`;

    this._createRule(parentSelector, this._name, styles, this._isMediaQuery);

    this._children = this._createChildren(children);

    if (parent) {
      this._parent = parent;
      parent[name] = this;
    }
  }

  toString() {
    const base = this._isModifier ? `${this._parent.toString()} ` : "";
    return `${base}${this._hash}`;
  }

  render(allStyles) {
    allStyles.push(this._rule);
    this._children.map((child) => child.render(allStyles));
  }

  static createStyles(item) {
    const styles = {};
    const children = [];

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

      children.push({prop, item});
    }

    return {styles, children};
  }

  _createChildren(children) {
    return children.map(({prop, item}) => new Selector(this, prop, item));
  }

  _createRule(parentSelector, name, styles, isMediaQuery) {
    const open = this._createSelector(parentSelector, name);
    const close = isMediaQuery ? "} }" : "}";
    const markup = createMarkupForStyles(styles);
    const rule = `${open} { ${markup} ${close}`;

    this._selector = open;
    this._rule = rule;
  }

  _createSelector(parentSelector = "", selector) {
    if (this._isMediaQuery) {
      return `${selector} { ${parentSelector.trimLeft()}`;
    }

    if(this._isPseudo) {
      return `${parentSelector}${selector}`;
    }

    const separator = this._isModifier || !parentSelector.length ? "" : " ";
    return `${parentSelector}${separator}.${this._hash}`;
  }
}

export default Selector;
