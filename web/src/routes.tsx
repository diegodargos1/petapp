import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Maps from './pages/Maps'
import Cadastrar from './pages/Cadastrar'

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
                <Route path="/map" component={Maps} />
                <Route path="/cadastrar" component={Cadastrar} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;