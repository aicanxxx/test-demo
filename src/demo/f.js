    
// b.js
export var a = 'a';
export var b = 'b';
export var c = 'c';
// 或
var a = 'a', b = 'b', c = 'c';
export {
    a,
    b,
    c
}
// 或给变量重命名
var a = 'a', b = 'b', c = 'c';
export {
    a as e,
    b,
    c
}
// 报错
export a;


    
// a.js
import { a,b,c } from './b.js'
// 给接口重命名
import {a as e,b,c} from './b.js'
console.log(e,b,c); // a b c
    // 或
import * as all from './b.js';
console.log(all.a,all.b,all.c); // "a" "b" "c"

// b.js
var a = 'a', b = 'b';
export var c = 'c';
export default {
    a,
    b,
}
// a.js
import all,{c} from './b.js'  // 可以不用{ }的方式来获取export default
console.log(all.a, all.b, c); // a b c

// b.js
var a = 'a', b = 'b';
export var c = 'c';
var d = {a,b}
export {
    d as default,
}
// a.js
import all,{c} from './b.js' // 同样是可行的
console.log(all.a, all.b, c); // a b c
// 报错
export default var a = 'a';

 // a.mjs
 export var a = 'a';
 export var b = 'b';
 export var c = 'c';

 // b.mjs
 import {a,b,c} from './a.mjs'
 console.log(a,b,c);

 // 运行代码
 $ node --experimental-modules ./b.mjs

// a.js
module.exports = {
    a: 'a',
    b: 'b'
}
// b.js
import all from './a.js'
console.log(all.a,all.b); // a b 

    
// ES6代码
import stone from '../middlewares/stone'
export default function () {
    let stoneData = Object.assign({}, stone.base64);
    this.stone = stoneData;
}
// 转码
"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = _default;

var _stone = _interopRequireDefault(require("../middlewares/stone"));

// 判断是否有__esModule属性，如果有，则已经转码，如果不是，则添加default属性
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}

function _default() {
    var stoneData = Object.assign({}, _stone.default.base64);
    this.stone = stoneData;
}

// 混用代码
import stone from '../middlewares/stone'

module.exports = function () {
    let stoneData = Object.assign({}, stone.base64);
    this.stone = stoneData;
}
// 转码
"use strict";
var _stone = _interopRequireDefault(require("../middlewares/stone"));

// 判断是否是ES6的模块，如果是直接返回，如果不是，则添加default属性
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
}
module.exports = function (app, config) {
    var stoneData = Object.assign({}, _stone.default.base64);
    this.stone = stoneData;
};

// a.js
console.log('module:',module);
/*
module: Module {
id: '/Users/aican/mytestrepos/webpack4-demo/src/demo/a.js',
exports: {},
parent: Module {...},
filename: '/Users/aican/mytestrepos/webpack4-demo/src/demo/a.js',
loaded: false,
children: [],
paths:
[ '/Users/aican/mytestrepos/webpack4-demo/src/demo/node_modules',
    '/Users/aican/mytestrepos/webpack4-demo/src/node_modules',
    '/Users/aican/mytestrepos/webpack4-demo/node_modules',
    '/Users/aican/mytestrepos/node_modules',
    '/Users/aican/node_modules',
    '/Users/node_modules' ]
}
*/
exports.output = 'test';

// b.js
let a = require('./a.js');
console.log('a:', a); // a: { output: 'test' }

    function _inherits(subClass, superClass) { 
        if (typeof superClass !== "function" && superClass !== null) { 
            throw new TypeError("Super expression must either be null or a function");
        } 
        subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); 
        if (superClass) _setPrototypeOf(subClass, superClass); 
    }



