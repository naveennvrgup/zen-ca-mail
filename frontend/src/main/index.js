import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'

import BigMenubar from './menu/big'
import About from './home/about'
import Clients from './home/clients'
import Contact from './home/contact'
import Footer from './home/footer'
import News from './home/news'
import Services from './home/services'
import Subscribe from './home/subscribe'

let Index = () =>
    <div className="index">
        <About />
        <News />
        <Services />
        <Clients />
        <Subscribe />
        <Contact />
        <Footer />
    </div>

    
export default class index extends Component {

    render() {
        return (
            <div>
                <BigMenubar />
                <Switch>
                    <Route path='/' component={Index} />
                </Switch>
            </div>
        )
    }
}
