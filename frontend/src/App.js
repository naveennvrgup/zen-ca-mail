import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './bootstrap/bootstrap.scss'
import './scss/app.scss'
import ProtectedRoute from './admin/auth/protected_route'
import Admin from './admin/admin'
import Login from './admin/auth/login'
import Main from './main/main'
import Recruitment from './main/recruitment'
import './assets/spinner.css'

// app.scss is the single entry point for all the scss files
// scss files are structed hierarchially
// the SPA is divided into two parts 
// 1. main - the website visible for everyone
// 2.admin - custom admin panel
// ProtectedRoute comp will allow the user to use the protected route only when token is present int the sessionstorage
class App extends Component {

  render() {
    return (
      <div id='app'>
        <Switch>
          <ProtectedRoute path='/admin' component={Admin} />
          <Route path='/user_login/' component={Login} />
          <Route path='/recruitment/' component={Recruitment} />
          <Route path='/' component={Main} />
        </Switch>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>
      </div>
    );
  }
}

export default App;
