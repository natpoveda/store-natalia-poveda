import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import User from './User';
import Home from './Home';


const Main = () => {
    return (
        <main className="main">
            <HashRouter basename="/store-natalia-poveda">
                <Switch>
                    <Route
                        path="/"
                        component={Home}
                        exact
                    />
                    <Route
                        path="/user"
                        component={User}
                        exact
                    />
                </Switch>
            </HashRouter>

        </main>
    );
}

export default Main;