import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './bootstrap/bootstrap.scss'
import './scss/app.scss'

import Admin from './admin/admin'
import Main from './main/main'

class App extends Component {
  render() {
    return (
      <div id='app'>
        <Switch>
          <Route path='/admin' component={Admin} />
          <Route path='/' component={Main} />
        </Switch>

        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossOrigin="anonymous"></link>
      </div>
    );
  }
}

export default App;
