import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Reservation from '../components/Reservation/Reservation';
import NotFound from '../components/NotFound/NotFound';

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Reservation} />
      {/* <Route exact path="/admin" component={Admin} /> */}
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export default Router;
