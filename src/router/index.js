import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import configList from '../config.js'
import Layout from "../pages/Layout.jsx";

export default (
    <BrowserRouter>
        <Layout></Layout>
        <Switch>
            {
                configList.length > 0 && configList.map(item => {
                    return(
                        // 因为存在路由/,一定要加exact，否则其他路由/xxx都匹配到路由/下
                        <Route exact key={item.component.name} path={item.path} component={item.component}></Route>
                    )
                })
            }
        </Switch>
    </BrowserRouter>
)