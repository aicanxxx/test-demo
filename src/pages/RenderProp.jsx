import React, { Component } from 'react'
import withMouse from '../component/Mouse.jsx';
import img from '../img/mora.png';
class Cat extends React.Component {
    render() {
        const mouse = this.props.mouse;
        return (
            <div>
                <h1>移动鼠标!</h1>
                <img src={img} style={{ position: 'absolute', left: mouse.x, top: mouse.y }} />
            </div>
        );
    }
}
export default withMouse(Cat);
