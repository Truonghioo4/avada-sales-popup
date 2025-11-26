import React, {Suspense} from 'react';
import {Route, Switch} from 'react-router-dom';
import Home from '@assets/loadables/Home/Home';
import NotFound from '@assets/loadables/NotFound/NotFound';
import Notifications from '@assets/loadables/Notifications/Notifications';
import Settings from '@assets/loadables/Settings/Settings';
// import {routePrefix} from '@assets/config/app';
import LoadingPage from '@assets/pages/Loading/LoadingPage';

// eslint-disable-next-line react/prop-types
const Routes = () => (
  <Suspense fallback={<LoadingPage />}>
    <Switch>
      <Route exact path={'/'} component={Home} />
      <Route exact path={'/notifications'} component={Notifications} />
      <Route exact path={'/settings'} component={Settings} />
      <Route path="*" component={NotFound} />
    </Switch>
  </Suspense>
);

export default Routes;
