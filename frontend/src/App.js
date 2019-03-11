import React, { Component, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom'
import './bootstrap/bootstrap.scss'
import './scss/app.scss'
import ProtectedRoute from './admin/auth/protected_route'
import './assets/spinner.css'
import Admin from './admin/admin'
import Login from './admin/auth/login'
import Main from './main/main'

// const Admin = React.lazy(() => import('./admin/admin'))
// const Main = React.lazy(() => import('./main/main'))
// const Login = React.lazy(() => import('./admin/auth/login'))

class App extends Component {
  componentDidMount = () => {
    let fav = document.querySelector('[rel="shortcut icon"]')
    fav.href=require('./assets/rupee.png')
    console.log(fav);
  }


  render() {
    return (
      <div id='app'>
        <Suspense fallback={<div className="lds-dual-ring"></div>}>

          <Switch>
            <ProtectedRoute path='/admin' component={Admin} />
            <Route path='/user_login/' component={Login} />
            <Route path='/' component={Main} />
          </Switch>
        </Suspense>
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>
      </div>
    );
  }
}

export default App;
