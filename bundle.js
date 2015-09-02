/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; })();

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

	var _css = __webpack_require__(1);

	var _css2 = _interopRequireDefault(_css);

	var _util = __webpack_require__(2);

	var _util2 = _interopRequireDefault(_util);

	var allStyles = [];
	var allStylesObj = {};

	var createPrefix = function createPrefix(prefix, className) {
	  if (_util2["default"].isMediaQuery(className)) {
	    return [(className + " { " + prefix).trimLeft(), "} }"];
	  }

	  if (_util2["default"].isModifier(className)) {
	    var klass = className.substr(1, className.length - 1);
	    return [(prefix + "." + klass).trimLeft(), "}"];
	  }

	  if (_util2["default"].isPseudoSelector(className)) {
	    return [("" + prefix + className).trimLeft(), "}"];
	  }

	  return [(prefix + " ." + className).trimLeft(), "}"];
	};

	var printStyle = function printStyle(pre, className, styleObj) {
	  var _createPrefix = createPrefix(pre, className);

	  var _createPrefix2 = _slicedToArray(_createPrefix, 2);

	  var prefix = _createPrefix2[0];
	  var suffix = _createPrefix2[1];

	  var styles = prefix + " {";

	  for (var prop in styleObj) {
	    if (styleObj.hasOwnProperty(prop)) {

	      if (typeof styleObj[prop] === "object") {
	        printStyle(prefix, prop, styleObj[prop]);
	      } else {
	        styles += prop + ":" + styleObj[prop] + ";";
	      }
	    }
	  }

	  styles += "" + suffix;

	  allStyles.unshift(styles);
	};

	var printStyles = function printStyles(styleObj) {
	  for (var property in styleObj) {
	    printStyle("", property, styleObj[property]);
	  }

	  for (var i = 0; i < allStyles.length; i++) {
	    console.log(allStyles[i]);
	  }
	};

	var createStyle = function createStyle(styleObj, obj, property) {

	  var item = obj[property];
	  var klass = new String(property);
	  styleObj[property] = klass;

	  for (var prop in item) {
	    if (!item.hasOwnProperty(prop)) {
	      continue;
	    }

	    if (_util2["default"].isPseudoSelector(prop) || _util2["default"].isMediaQuery(prop)) {
	      continue;
	    }

	    if (typeof item[prop] === "object") {
	      if (_util2["default"].isModifier(prop)) {
	        createStyle(klass, item[prop], prop.substr(1, prop.length - 1));
	      } else {
	        createStyle(klass, item[prop], prop);
	      }
	    }
	  }
	};

	var createStyles = function createStyles(styleObj) {
	  for (var property in styleObj) {
	    createStyle(allStylesObj, styleObj, property);
	  }

	  console.log(allStylesObj);
	};

	printStyles(_css2["default"]);
	createStyles(_css2["default"]);

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var style = {
	  firstClass: {
	    height: "100px",
	    width: "200px",

	    $firstClassModifier: {
	      height: "777px",

	      thingInsideIt: {
	        color: "babyblue"
	      }
	    },

	    ":hover": {
	      color: "hovercolor"
	    },

	    secondClass: {
	      color: "red",
	      textAlign: "center",

	      "@media (max-width: 300px)": {
	        padding: 10,
	        margin: 20
	      }
	    },

	    "@media (max-width: 600px)": {
	      fontSize: 8,
	      fontWeight: "bold"
	    }
	  }
	};

	exports["default"] = style;
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var util = {

	  isMediaQuery: function isMediaQuery(selector) {
	    return selector[0] === "@";
	  },

	  isModifier: function isModifier(selector) {
	    return selector[0] === "$";
	  },

	  isPseudoSelector: function isPseudoSelector(selector) {
	    return selector[0] === ":";
	  }

	};

	exports["default"] = util;
	module.exports = exports["default"];

/***/ }
/******/ ]);