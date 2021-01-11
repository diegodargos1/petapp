import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Cadastrar from './pages/Cadastrar'
import Landing from './pages/Landing'
import Maps from './pages/Maps'

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