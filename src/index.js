import React from 'react'
import ReactDOM from 'react-dom'
import route from './router/index.js';
// import $ from 'jquery';



ReactDOM.render(
    <div className="layout">
         {route}        
    </div>,
    document.getElementById('root')
);