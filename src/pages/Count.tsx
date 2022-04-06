import React from "react"
import '../styles/count.scss';
import lodash from 'lodash';
import a from '../demo/a.js';

export default class Count extends React.Component<any, any> {
	constructor(props){
		super(props)
		this.state = {
			num : 0
		}
	}
	// 直接在定义函数时就使用箭头函数
	handleClick(){
		console.log(this);
		a.d();
		this.setState({
		    num: this.state.num + 1
		})
	}

	render(){
		return(
			<div className="main">
				<div className="countpage">
					<p className="show">{`当前值：${this.state.num}`}</p>
					<button className="button" onClick={this.handleClick.bind(this)}>点我点我～</button>
				</div>
			</div>
			
		)
	}
}
