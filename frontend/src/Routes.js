import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';

import HomePage from './pages/App';
import Article from './pages/Article';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/read' component={Article} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
