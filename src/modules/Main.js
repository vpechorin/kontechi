import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Page from './Page';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/:pageName" component={Page} />
    </Switch>
  </main>
)

export default Main;
