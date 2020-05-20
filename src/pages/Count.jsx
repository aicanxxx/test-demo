import React, {Component} from "react"
import('../styles/count.scss');
import lodash from 'lodash'

export default class Count extends Component {
	constructor(props){
		super(props)
		this.state = {
			num : 0
		}
	}
	// 直接在定义函数时就使用箭头函数
	handleClick(){
		console.log(this);
		this.setState({
		    num: this.state.num + 1
		})
	}

	render(){
		return(
			<main className="main">
				<div className="countpage">
					<p className="show">{`当前值：${this.state.num}`}</p>
					<button className="button" onClick={this.handleClick.bind(this)}>点我点我～</button>
				</div>
			</main>
			
		)
	}
}
