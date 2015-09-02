var chai = require("chai");
var lib = require("../lib/main");
var css = require("./styles/css");
var renderStyles = lib.renderStyles;
chai.should();

var styles = renderStyles(css);

describe('renderStyles', function() {
  describe('global classes', function() {
    it('should render correctly', function () {
      var style = styles[0];
      style.should.equal(".firstClass { height:100px;line-height:2;width:200px; }");
    });
  });

  describe('nested classes', function() {
    it('should render correctly', function () {
      var style = styles[1];
      style.should.equal(".firstClass .secondClass { color:red;text-align:center; }");
    });
  });

  describe('modifier classes', function() {
    it('should render correctly', function () {
      var style = styles[4];
      style.should.equal(".firstClass.firstClassModifier { height:777px; }");
    });
  });

  describe('pseudo selectors', function() {
    it('should render correctly', function () {
      var style = styles[3];
      style.should.equal(".firstClass:hover { color:hovercolor; }");
    });
  });

  describe('media queries', function() {
    it('should render outside any other selectors', function () {
      var style = styles[2];
      style.should.equal("@media (max-width: 300px) { .firstClass .secondClass { padding:10px;margin:20px; } }");
    });
  });

  describe('javascript identifiers', function() {
    it('should be converted to css notation', function () {
      var style = styles[1];
      style.should.contain("text-align");
    });
  });

  describe('numerical values', function() {
    it('should be converted to pixel values where appropriate', function () {
      var style = styles[0];
      style.should.contain("height:100px;");
    });

    it('should remain numbers where appropriate', function () {
      var style = styles[0];
      style.should.contain("line-height:2;");
    });
  });
});