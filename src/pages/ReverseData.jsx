import React from 'react';
import Click from '../component/Click.jsx'

export default class ReverseDate extends React.Component {
    constructor(props) {
        super(props);
        this.state = { selectedIndex: 0 };
    }
    onChange(index) {
        this.setState({
            selectedIndex: index,
        });
    }
    render() {
        let { selectedIndex } = this.state
        return (
            <Click onChange={this.onChange.bind(this)}>
                <p>点我加一：{selectedIndex}</p>
            </Click>
        )

    }
}