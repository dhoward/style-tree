var chai = require("chai");
var lib = require("../src/main");
var {styles} = require("./styles/css");
var classNames = require("./styles/classNames");
var renderStyles = lib.renderStyles;
chai.should();

var styles = renderStyles(styles);

describe('renderStyles', function() {
  describe('global classes', function() {
    it('should render correctly', function () {
      styles.should.contain(`.${classNames.firstClass} { height:100px;line-height:2;width:200px; }`);
    });
  });

  describe('nested classes', function() {
    it('should render correctly', function () {
      styles.should.contain(`.${classNames.firstClass} .${classNames.secondClass} { color:red;text-align:center; }`);
    });
  });

  describe('modifier classes', function() {
    it('should render correctly', function () {
      styles.should.contain(`.${classNames.firstClass}.${classNames.firstClassModifier} { height:777px; }`);
    });
  });

  describe('pseudo selectors', function() {
    it('should render correctly', function () {
      styles.should.contain(`.${classNames.firstClass}:hover { color:hovercolor; }`);
    });
  });

  describe('media queries', function() {
    it('should render outside any other selectors', function () {
      styles.should.contain(`@media (max-width: 300px) { .${classNames.firstClass} .${classNames.secondClass} { padding:10px;margin:20px; } }`);
    });
  });

  describe('javascript identifiers', function() {
    it('should be converted to css notation', function () {
      styles.should.contain("text-align");
    });
  });

  describe('numerical values', function() {
    it('should be converted to pixel values where appropriate', function () {
      styles.should.contain("height:100px;");
    });

    it('should remain numbers where appropriate', function () {
      styles.should.contain("line-height:2;");
    });
  });
});