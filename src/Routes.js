import React from 'react';

import { Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';

const Routes = () => (
    <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />

    </Switch> 
);

export  default Routes;