import React from 'react';
import {Route, Switch} from 'react-router-dom';
import User from './User';


const Main = () =>{
    return (
        <main className="main">
        <Switch>
        <Route
          exact
          path="/"
          render={({ match }) => {
            return <div>Home</div>;
          }}
        />
        <Route
          path="/posts"
          component={User}
        />
        </Switch>
        </main>
    );
}

export default Main;