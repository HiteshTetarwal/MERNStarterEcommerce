import React from 'react';
import Home from './core/Home';
import { BrowserRouter, Switch, Route } from "react-router-dom";

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;