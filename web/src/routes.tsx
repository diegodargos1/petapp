import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Maps from './pages/Maps'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/map" component={Maps} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;