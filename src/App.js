import React, { Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';

// Lazy load - Code splitting => Chỉ load components khi mà components được gọi. Cần sử dụng chung với tag Suspense
const Photo = React.lazy(() => import('./pages/Photo'));
const Category = React.lazy(() => import('./pages/Category'));
const Home = React.lazy(() => import('./pages/Home'));
const User = React.lazy(() => import('./pages/User'));

function App() {
  return (
    <div className='photo-app'>
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/photos' component={Photo} />
            <Route path='/categories' component={Category} />
            <Route path='/user' component={User} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
