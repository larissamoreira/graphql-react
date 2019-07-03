import React from 'react';
import './App.css';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import AuthPage from './pages/Auth';
import Bookings from './pages/Bookings';
import Events from './pages/Events';
import MainNav from "./components/Navigation/MainNav";

function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <MainNav />
        <main className="main-content">
          <Switch>
            <Redirect from='/' to="/auth" exact />
            <Route path='/auth' component={AuthPage} />
            <Route path='/events' component={Events} />
            <Route path='/bookings' component={Bookings} />
          </Switch>
        </main>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
