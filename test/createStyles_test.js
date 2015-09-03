var chai = require("chai");
var Selector = require("../lib/selector");
var lib = require("../lib/main");
var css = require("./styles/css");
var createStyles = lib.createStyles;
chai.should();

var styles = createStyles(css);

describe('createStyles', function() {
  it('should create a style object', function () {
    styles.should.be.a("object");
  });

  describe('global classes', function() {
    it('should be children of the style object', function () {
      var style = styles.firstClass;
      var isSelector = style instanceof Selector;
      isSelector.should.be.true;
      style.readable.should.equal("firstClass");
    });
  });

  describe('nested classes', function() {
    it('should be children of their class namespace', function () {
      var style = styles.firstClass.secondClass;
      var isSelector = style instanceof Selector;
      isSelector.should.be.true;
      style.readable.should.equal("secondClass");
    });
  });

  describe('modifier classes', function() {
    it('should be children of their class namespace', function () {
      var style = styles.firstClass.firstClassModifier;
      var isSelector = style instanceof Selector;
      isSelector.should.be.true;
      style.readable.should.equal("firstClassModifier");
    });
  });
});