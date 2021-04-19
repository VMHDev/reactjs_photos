import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spinner } from 'reactstrap';

import { updateStatusLogin } from 'redux/userSlice';
import Header from './components/Header';
import NotFound from './components/NotFound';

// Constants
import {
  PATH_HOME,
  PATH_PHOTOS,
  PATH_CATEGORIES,
  PATH_USER,
} from './constants/route';

// Styles
import './App.scss';

// Lazy load Components page
const Photo = React.lazy(
  () =>
    new Promise((resolve) => {
      setTimeout(() => resolve(import('./pages/Photo/Photo')), 1000);
    })
);
const Category = React.lazy(() => import('./pages/Category/Category'));
const Home = React.lazy(() => import('./pages/Home/Home'));
const User = React.lazy(() => import('./pages/User/User'));

// Main
function App() {
  const dispatch = useDispatch();
  // Handle events
  const handleLogoutClick = async () => {
    try {
      const action = updateStatusLogin('');
      await dispatch(action);
      return <Redirect to={PATH_HOME} />;
    } catch (error) {
      alert('Logout Fail!');
      console.log(error);
    }
  };

  // Render GUI
  return (
    <div className='photo-app'>
      <Suspense
        fallback={
          <div className='page-wrap d-flex flex-row align-items-center'>
            <div className='container'>
              <div className='row justify-content-center'>
                <Spinner style={{ width: '3rem', height: '3rem' }} />
              </div>
            </div>
          </div>
        }>
        <Router>
          <Header onLogoutClick={handleLogoutClick} />

          <Switch>
            <Redirect exact from='/' to={PATH_HOME} />

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
