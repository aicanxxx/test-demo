// 大类上分，对象类型，非对象类型
// 对象类型包括 Object，Function，Array，Map，Set、基本包装类型等typeof运算值为object和function的类型
// 非对象类型是指基础类型null undefined number string boolean symbol
function isObject(object) {
    return object !== null && (typeof object === 'object' || typeof object === 'function')
}
// 对对象类型进行细分
// 可继续遍历，存在循环引用的情况
const arrayTag = '[object Array]'
const objectTag = '[object Object]'
const mapTag = '[object Map]'
const setTag = '[object Set]'
const argsTag = '[object Arguments]' // 函数传递的参数的集合
// 不需遍历, 无法复制或无需复制
const funcTag = '[object Function]'
const weakMapTag = '[object WeakMap]'
const weakSetTag = '[object WeakSet]'
const errorTag = '[object Error]' // 没有复制的意义，error有2个不可枚举的属性，message stack
// 其他
const symbolTag = '[object Symbol]'
const numberTag = '[object Number]'
const stringTag = '[object String]'
const booleanTag = '[object Boolean]'
const dateTag = '[object Date]'
const regTag = '[object RegExp]'
const promiseTag = '[object Promise]'
const deepCloneTags = [arrayTag, objectTag, mapTag, setTag, argsTag];
// weakMapTag, weakSetTag 函数复制没有意义 funcTag
const noCloneTags = [errorTag, weakMapTag, weakSetTag, funcTag]

// 获取类型
function getType(object) {
    return Object.prototype.toString.call(object)
}

// 遍历keys值
function arrayEach(array, func) {
    let len = array.length;
    let index = -1;
    while (++index < len) {
        func(array[index], index)
    }

}

// 获取初始状态
// function initCloneObject(target){
//     let type = getType(target)
//     if(type === argsTag || type === objectTag){
//         return Object.create(Object.getPrototypeOf(target))
//     }
//     let Ctor = target.constructor;
//     return new Ctor();
// }

function cloneRegExp(target) {
    let reg = /\w*$/;
    let result = new target.constructor(target.source, reg.exec(target))
    result.lastIndex = target.lastIndex
    return result;
}

function initCloneObject(target) {
    let Ctor = target.constructor;
    let type = getType(target);
    switch (type) {
        case objectTag:
        case argsTag:
            return Object.create(Object.getPrototypeOf(target))
        case arrayTag:
        case setTag:
        case mapTag:
            return new Ctor()
        case numberTag:
        case stringTag:
            return new Ctor(target)
        case booleanTag: // 布尔值需要转换，否则{false}会被转换为true
        case dateTag:
            return new Ctor(+target)
        case symbolTag:
            return Object(Symbol.prototype.valueOf.call(target))
        case regTag:
            return cloneRegExp(target)
        case promiseTag:
            return target.then()
        default: { }
    }
}

// 获取所有key值，包括Symbol类型
function getKeys(target) {
    let keys = [];
    let allKeys = Reflect.ownKeys(target) || [];
    allKeys.forEach(value => {
        if (target.propertyIsEnumerable(value)) {
            keys.push(value)
        }
    })
    return keys;
}
// 数组和arguments都是算成类数组,获取类数组的key
// function arrayLikeKeys(target){
//     let type = getType(target)
//     let isArrayLike = type === argsTag || type === arrayTag;
//     let keys = [];
//     if(isArrayLike){
//         for(let key in target){
//             if(target.hasOwnProperty(key)){
//                 keys.push(key)
//             }
//         }
//     } 
// }

// // 如果是类数组，类数组的定义是不为空，不为function类型（function有length属性），有length属性则值为>=0的整数
// function isArrayLike(target){
//     if(target !== null && typeof target !== 'function'){
//         let value = target.length;
//         return typeof value === 'number' && value >= 0 && value % 1 === 0
//     }
//     return false;
// }

// export default function deepClone(target, map = new WeakMap()){
//     // 如果基本类型，直接返回
//     if(!isObject(target)){
//         return target;
//     }
//     let result;
//     let type = getType(target);
//     if(noCloneTags.includes(type)){
//         return target;
//     }else{
//         result = initCloneObject(target);
//     }
//     // map的作用是解决循环引用
//     if(map.has(target)){
//         return target
//     }
//     map.set(target, result)
//     if(type === mapTag){
//         target.forEach((value,key) => {
//             result.set(key, deepClone(value, map))
//         });
//     }
//     if(type === setTag){
//         target.forEach(value => {
//             result.add(deepClone(value, map))
//         });
//     }

//     let keys = getKeys(target);
//     arrayEach(keys, (value,key) => {
//         if(keys){
//             key = value;
//         }
//         value = deepClone(target[key],map);
//         if(!(result.hasOwnProperty(key) && value === result[key])){
//             result[key] = value;
//         }
//     })
//     return result;
// }

// 判断一个value是否是对象
function isContinue(parent, key, value) {
    let type = getType(value);
    if (!isObject(value) || noCloneTags.includes(type)) {
        return true;
    }
    return false
}

export default function deepClone(target, map = new WeakMap()) {
    let result;
    let tree = [
        {
            parent: result,
            key: '',
            target
        }
    ]
    while (tree.length > 0) {
        let node = tree.pop();
        let key = node.key;
        let parent = node.parent;
        let target = node.target;
        // target本身可能不是一个对象，所以直接返回result，然后continue
        if (isContinue(result, key, target)) {
            if (key === '') {
                result = target;
            } else {
                parent[key] = target
            }
            // 跳过后面的代码遍历下一个属性
            continue;
        }

        // 用res来保存每一轮的初始化遍量
        let res;
        if (key === '') {
            // 确保result一直与parent指向同一个内存空间
            res = result = parent = initCloneObject(target);
        } else {
            res = parent[key] = initCloneObject(target);
        }
        // map的作用是解决循环引用
        if (map.has(target)) {
            parent[key] = target;
            continue;
        }
        map.set(target, res)

        let type = getType(target)

        if (type === mapTag) {
            target.forEach((value, key) => {
                if (!isContinue(res, key, value)) {
                    tree.push({
                        parent: res,
                        key,
                        target: value
                    })
                } else {
                    res.set(key, value)
                }
            });
        }
        if (type === setTag) {
            target.forEach(value => {
                if (!isContinue(res, key, value)) {
                    tree.push({
                        parent: res,
                        key: value,
                        target: value
                    })
                } else {
                    res.add(value)
                }
            });
        }
        let keys = getKeys(target);
        arrayEach(keys, (value, key) => {
            if (keys) {
                key = value;
                value = target[key]
            }
            if (isContinue(res, key, value)) {
                if (!(res.hasOwnProperty(key) && value === res[key])) {
                    res[key] = value;
                }
            } else {
                tree.push({
                    parent: res,
                    key,
                    target: value
                })
            }
        })
    }
    return result;
}