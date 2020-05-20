import React from 'react';
export default class Click extends React.Component {
    constructor(props){
        super(props);
        this.state = {current : 0};
    }
    handleClick(){
        let {onChange } = this.props;
        this.setState(({current}) =>{
            let activeIndex = current +1;
            onChange && onChange(activeIndex);
            return {
                current:activeIndex
            }
        });
    }
    render(){
        return(
            <div onClick={this.handleClick.bind(this)}> 
                {this.props.children}
            </div>
        )
    }
}