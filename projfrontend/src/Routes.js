import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;