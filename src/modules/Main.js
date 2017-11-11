import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Page from './Page';
import NotFound from './NotFound';

const Main = () => (
  <main>
    <Switch>
      <Redirect from="/home" to="/"/>
      <Route exact path="/" component={Home} />
      <Route exact path="/c/:pageName" component={Page} />
      <Route component={NotFound}/>
    </Switch>
  </main>
);

export default Main;
