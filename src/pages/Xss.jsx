import React, {Component} from 'react'

export default class Xss extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchValue:''
		}

	}
	getInputValue = (e) => {
		this.setState({searchValue:e.target.value})
	}
	render(){
		return(
			<main className="main">
			   <div className="mainpage">
				   {/* <h1 className="title">Xss!!</h1>  */}
				   	<form action='localhost:3245' method='post' >
						<textarea type="text" name="search" placeholder="请输入观点" ></textarea>
						<input type="submit" value="提交" />
					</form>
					{/* <button>搜索</button> */}
					<div>
						您搜索的关键词是：><script>console.log('xss')</script>
					</div>
				</div> 
			</main>
			
		)
	}
}