import React from 'react';
import CustomTextInput from '../component/CustomTextInput.jsx';
export default class Ref extends CustomTextInput {
  constructor(props){
    super(props);
    this.user = '1111'
  }
  componentDidMount(){
    console.log(this.testRef);
  }
  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    // this.textInput.current.focus();
    return (
      <div >重写函数</div>
    );
  }
  // render() {
  //   return (
  //     // <CustomTextInput ref={ref => {this.testRef = ref;}}></CustomTextInput>
  //     <div >重写函数111</div>
  //   );
  // }
}