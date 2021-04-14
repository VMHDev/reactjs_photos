import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';

// Constants
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_USER,
} from './constants/route';

// Lazy load Components page
const Photo = React.lazy(() => import('./pages/Photo/Photo'));
const Category = React.lazy(() => import('./pages/Category/Category'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const User = React.lazy(() => import('./pages/User/User'));

// Main
function App() {
  return (
    <div className='photo-app'>
      <Suspense fallback={<div>Loading ...</div>}>
        <Router>
          <Header />

          <Switch>
            <Redirect exact from="/" to={PATH_HOME} />

            <Route exact path={PATH_HOME} component={Home} />
            <Route path={PATH_PHOTOS} component={Photo} />
            <Route path={PATH_CATEGORIES} component={Category} />
            <Route path={PATH_USER} component={User} />
            
            <Route component={NotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
