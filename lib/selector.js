class Selector {
  constructor(name, hash) {
    this.readable = name;
    this.andReadable = `${name} ${hash}`;
    this._hash = hash;
  }

  toString() {
    return this._hash;
  }
}

export default Selector;
