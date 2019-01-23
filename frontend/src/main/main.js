import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'


import Menu from './menu/big'
import Getstarted from './get_started/get_started'
import Home from './home/home'
    
export default class main extends Component {

    render() {
        return (
            <div className='index'>
                <Menu />
                <Switch>
                    <Route path='/home/' component={Home} />
                    <Route path='/' component={Getstarted} />
                </Switch>
            </div>
        )
    }
}
