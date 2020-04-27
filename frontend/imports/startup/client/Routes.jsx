import React from 'react';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';

import MainPage from '/imports/ui/pages/MainPage';
import TermPage from '/imports/ui/pages/TermPage';

const browserHistory = createBrowserHistory();
const routes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/termos-de-uso" component={TermPage} />
    </Switch>
  </Router>
);

export default routes;
