import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import LandingStore from './pages/LandingStore';
import Maps from './pages/Maps';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingStore} />
                <Route path="/Dashboard" exact component={Dashboard} />
                <Route path="/landing" exact component={Landing} />
                <Route path="/map" component={Maps} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;