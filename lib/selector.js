import util from "./util"

class Selector {
  constructor(parent, property, object) {
    const name = util.isModifier(property) ? property.substr(1, property.length-1) : property;
    const item = object[property];
    const hash = util.createClassName(item);

    this._hash = hash;
    this.readable = name;
    this.andReadable = `${name} ${hash}`;

    this.createChildren(item);

    parent[name] = this;
  }

  toString() {
    return this._hash;
  }

  createChildren(item) {
    for (var prop in item) {
      if (!item.hasOwnProperty(prop)) {
        continue;
      }

      if (typeof item[prop] !== "object" || util.isPseudoSelector(prop) || util.isMediaQuery(prop)) {
        continue;
      }

      new Selector(this, prop, item);
    }
  }
}

export default Selector;
