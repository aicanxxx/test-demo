import deepClone from '../demo/deepClone.js'
import React from 'react'
import lodash from 'lodash'
export default function DeepClone(){
    let a = 123;
    console.log('a',deepClone(a))
    let b = function(){console.log(a)}
    console.log('b',deepClone(b))
    let c = /asd/img;
    console.log('c',deepClone(c))
    let d1 = function(a,b){return arguments};
    let d = d1({a:{a:1}},[1,2,3,4,{b:{c:/qqw/g}}]);
    console.log('d',deepClone(d))

    const map = new Map();
    map.set('key', 'value');
    map.set('ConardLi', 'code秘密花园');

    const set = new Set();
    set.add('ConardLi');
    set.add('code秘密花园');
    const g = /\w*$/.exec('/1233/f');
    let f = {
        field1: 1,
        field2: undefined,
        field3: {
            child: 'child'
        },
        field4: [2, 4, 8],
        empty: null,
        map,
        set,
        bool: new Boolean(true),
        num: new Number(2),
        str: new String(2),
        symbol: Object(Symbol(1)),
        date: new Date(),
        reg: /\d+/,
        error: new Error(),
        func1: () => {
            console.log('code秘密花园');
        },
        func2: function (a, b) {
            return a + b;
        }
    }
    f[Symbol('foo')] = g;
    f.str.test = 123;
    f.newF = f;
    console.log('f',deepClone(f))
    console.log(lodash.cloneDeep(f))
    return (
        
            <div>
                deepClone
            </div>

        
    )
}