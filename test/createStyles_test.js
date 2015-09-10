var chai = require("chai");
var Selector = require("../src/selector");
var lib = require("../src/main");
var {styles, badStyle, badStyle2} = require("./styles/css");
var createStyles = lib.createStyles;
chai.should();

var styles = createStyles(styles);

describe('createStyles', function() {
  it('should create a style object', function () {
    styles.should.be.a("object");
  });

  it('should throw an error if a reserved word is used', function () {
    var badStyleCreator = function() {
      createStyles(badStyle);
    };

    var badStyleCreator2 = function() {
      createStyles(badStyle2);
    };

    badStyleCreator.should.throw(Error);
    badStyleCreator2.should.throw(Error);
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

  describe('subsequent calls to createStyles', function() {
    before(function() {
      var styles = createStyles({
        anotherClass: {
          height: 100
        }
      });
    });

    it('should add the new styles to the original style object', function () {
      var firstClassSelector = styles.firstClass instanceof Selector;
      var anotherClassSelector = styles.anotherClass instanceof Selector;
      firstClassSelector.should.be.true;
      anotherClassSelector.should.be.true;
    });
  });
});


