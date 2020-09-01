import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import User from './User';


const Main = () =>{
    return (
        <main className="main">
        <HashRouter>
        <Switch>
        <Route
          exact
          path="/store-natalia-poveda"
          render={({ match }) => {
            return <div>Home</div>;
          }}
        />
        <Route
          path="/store-natalia-poveda/posts"
          component={User}
        />
        </Switch>
        </HashRouter>    
        
        </main>
    );
}

export default Main;