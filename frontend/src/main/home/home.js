import React, { Component } from 'react'

import About from './about'
import Clients from './clients'
import Contact from './contact'
import Footer from './footer'
import News from './news'
import Services from './services'
import Subscribe from './subscribe'

export default class home extends Component {
    render() {
        return (
            <div className="index">
                <About />
                <News />
                <Services />
                <Clients />
                <Subscribe />
                <Contact />
                <Footer />
            </div>
        )
    }
}
