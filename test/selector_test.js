var chai = require("chai");
var css = require("./styles/css");
var classNames = require("./styles/classNames");
var Selector = require("../lib/selector");
var sel;
chai.should();

describe("Selector", function() {
  describe("constructor", function() {
    before(function(){
      sel = new Selector({}, "firstClass", css);
    })

    it("should create a Selector object", function () {
      sel.should.be.a("object");
    });
  });

  describe('toString', function() {
    it("should return the selector's hash", function () {
      var selName = sel.toString()
      selName.should.equal(`${classNames.firstClass}`);
    });
  });

  describe('readable', function() {
    it("should return the selector's name", function () {
      var selName = sel.readable
      selName.should.equal("firstClass");
    });
  });

  describe('andReadable', function() {
    it("should return the selector's name and hash", function () {
      var selName = sel.andReadable
      selName.should.equal(`firstClass ${classNames.firstClass}`);
    });
  });
});