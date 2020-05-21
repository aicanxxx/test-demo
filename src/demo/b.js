// import "react";
// // import "lodash";
// import "jquery";

// console.log('b.js');

// export var a = 'a';
// export var b = 'b';
// export var c = 'c';
// 
// b.js
var obj = {
	a: 'a',
	b: 'b'
}

export default obj;

// ES6代码
import stone from '../middlewares/stone'

export default function () {
	console.log('test');
}
// 转码
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = _default;

var _stone = _interopRequireDefault(require("../middlewares/stone"));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _default() {
	console.log('test');
}

// CommonJs代码
var stone = require('../middlewares/stone');

module.exports = function () {
	console.log('test');
}
// 转码
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = _default;

var _stone = _interopRequireDefault(require("../middlewares/stone"));

function _interopRequireDefault(obj) {
	return obj && obj.__esModule ? obj : { default: obj };
}

function _default() {
	console.log('test');
}
// export default {
// 	a,
// 	b,
// }

// 报错
// export default var a = 'a';

// 报错
// export a;

// export default b;

// b.js

// let e = require('./e.js');

// console.log('e:', e); // a: { output: 'test' }

	Module.runMain = function () {
		Module._load(process.argv[1], null, true);
	};
