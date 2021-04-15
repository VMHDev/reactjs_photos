import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';

// Constants
import {
  PATH_LOGIN,
  PATH_REGISTER,
  PATH_FORGOTPASSWORD,
} from '../../constants/route';

// Lazy load Components page
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword/ForgotPassword'));

// Main
const User = (props) => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route exact path={match.url}>
        <Redirect to={match.url + PATH_LOGIN} />
      </Route>
      <Route path={match.url + PATH_LOGIN} component={Login} />
      <Route path={match.url + PATH_REGISTER} component={Register} />
      <Route
        path={match.url + PATH_FORGOTPASSWORD}
        component={ForgotPassword}
      />
    </Switch>
  );
};

User.propTypes = {};

export default User;
