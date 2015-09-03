var chai = require("chai");
var Selector = require("../lib/selector");
var sel;
chai.should();

describe("Selector", function() {
  describe("constructor", function() {
    before(function(){
      sel = new Selector("testSelector", "testHash");
    })

    it("should create a Selector object", function () {
      sel.should.be.a("object");
    });
  });

  describe('toString', function() {
    it("should return the selector's hash", function () {
      var selName = sel.toString()
      selName.should.equal("testHash");
    });
  });

  describe('readable', function() {
    it("should return the selector's name", function () {
      var selName = sel.readable
      selName.should.equal("testSelector");
    });
  });
});