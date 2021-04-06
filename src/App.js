import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import NotFound from './components/NotFound';

// Lazy load - Code splitting => Chỉ load components khi mà components được gọi. Cần sử dụng chung với tag Suspense
const Photo = React.lazy(() => import('./pages/Photo'));

function App() {
  return (
    <div className='photo-app'>
      <Suspense fallback={<div>Loading ...</div>}>
        <BrowserRouter>
          <Header />

          <Switch>
            <Redirect exact from='/' to='/photos' />

            <Route path='/photos' component={Photo} />
            <Route component={NotFound} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    </div>
  );
}

export default App;
