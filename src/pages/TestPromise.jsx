import React, {useState, useMemo, useCallback} from 'react';

const Child = function({data}){
    return useMemo(()=>{
        console.log('data',data)
        return(
            <div>
                {data}
            </div>
        )
    },[data])
    
}

const TestPromise = function(){
    let [count, setCount] = useState(0);
    let [name, setName] = useState('qwer');
    // let Tchild = Child({data:name})
    // console.log(Tchild)

    return(
        <div>
            {count}
            <button onClick={() => {console.log(count);setCount(count + 1)}}>update count</button>
            <button onClick={() => {console.log(name);setName('hello '+name)}}>update Name</button>
            <Child data={name}></Child>
        </div>
    )
}

// export default function TestHook(){
//     return(
//         <div>
//             <TestHooks></TestHooks>
//         </div>
//     )
// }
export default TestPromise;