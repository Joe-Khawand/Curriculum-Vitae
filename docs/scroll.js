/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scroll.js":
/*!***********************!*\
  !*** ./src/scroll.js ***!
  \***********************/
/***/ (() => {

eval("//! --------------------------------- Smooth Scrolling ----------------------------------------\n$(document).ready(function ($) {\n  console.log(\"click\");\n  $('.smoothscroll').on('click', function (e) {\n    e.preventDefault();\n    var target = this.hash,\n        $target = $(target);\n    $('html, body').stop().animate({\n      'scrollTop': $target.offset().top\n    }, 800, 'swing', function () {\n      window.location.hash = target;\n    });\n  });\n});\nTweenMax.staggerFrom(\".heading\", 0.8, {\n  opacity: 0,\n  y: 20,\n  delay: 0.2\n}, 0.4);\n\n//# sourceURL=webpack://curriculum-vitae/./src/scroll.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/scroll.js"]();
/******/ 	
/******/ })()
;