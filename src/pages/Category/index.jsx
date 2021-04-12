import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFound';
import AddEditPage from './pages/AddEditPage';
import MainPage from './pages/MainPage';

const Category = (props) => {
  const match = useRouteMatch();
  console.log({ match });

  return (
    <Switch>
      <Route exact path={match.url} component={MainPage} />

      <Route path={`${match.url}/add`} component={AddEditPage} />
      <Route path={`${match.url}/:categoryId`} component={AddEditPage} />

      <Route component={NotFound} />
    </Switch>
  );
};

Category.propTypes = {};

export default Category;
