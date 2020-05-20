import Home from "./pages/Home.jsx";
import Count from "./pages/Count.jsx";
// import Layout from "./pages/Layout.jsx";
import Test from "./pages/Test.jsx";
import Xss from "./pages/Xss.jsx";
import ReverseData from './pages/ReverseData.jsx';
import Ref from './pages/Ref.jsx';
import RenderProp from './pages/RenderProp.jsx';
import DeepClone from './pages/DeepClone.jsx'
import TestHooks from './pages/TestHooks.jsx'
import TestPromise from './pages/TestPromise.jsx'

export default [
    {
        path : '/',
        component: Home
    },
    {
        path : '/count',
        component: Count
    },
    {
        path : '/test',
        component: Test
    },
    {
        path : '/xss',
        component: Xss
    },
    {
        path : '/reversedata',
        component: ReverseData
    },
    {
        path : '/ref',
        component: Ref
    },
    {
        path : '/renderprop',
        component: RenderProp
    },
    {
        path : '/deepClone',
        component: DeepClone
    },
    ,
    {
        path : '/hooks',
        component: TestHooks
    },
    {
        path : '/promise',
        component: TestPromise
    }
]