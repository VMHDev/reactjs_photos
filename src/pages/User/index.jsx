import React from 'react';
import { Route, Switch, Redirect, useRouteMatch } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';

const User = (props) => {
  const match = useRouteMatch();
  console.log({ match });

  return (
    <Switch>
      <Route exact path={match.url}>
        <Redirect to={`${match.url}/login`} />
      </Route>
      <Route path={`${match.url}/login`} component={Login} />
      <Route path={`${match.url}/register`} component={Register} />
      <Route path={`${match.url}/forgotpassword`} component={ForgotPassword} />
    </Switch>
  );
};

User.propTypes = {};

export default User;
