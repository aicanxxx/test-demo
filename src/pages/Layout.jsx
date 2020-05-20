import React,{Component} from "react";
import { BrowserRouter, Link } from "react-router-dom";
import '../styles/layout.scss';
import configList from '../config.js'
export default class Layout extends Component{
    
    render(){
        return(
            <nav className="menu">
                <ul>
                {
                    configList.length > 0 && configList.map(item => {
                        return(
                            <li key={item.path}><Link to={item.path}>to{item.component.name}</Link></li>
                        )
                    })
                }
                </ul>
            </nav>
            
        )
    }
}