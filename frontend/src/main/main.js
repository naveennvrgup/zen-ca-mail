import React, { Component } from 'react'
import WOW from "wow.js";

import Cover from './cover'
import Subscribe from './subscribe'
import Values from './values'
import Navbar from './navbar'
import Aboutus from './aboutus'
import Contactus from './contactus'
import Footer from './footer'
import Services from './services'
import Clients from './client'
import Cookie from './cookie'
import Snews from './slick_news'
import Job from './job'

// it as the layout for the index page
export default class main extends Component {
    componentDidMount() {
        const wow = new WOW();
        wow.init();
    }


    render() {
        return (
            <div className='main'>
                <Navbar />
                <Cover />
                <Cookie />
                <Snews />
                <Subscribe />
                <Aboutus />
                <Values />
                <Services />
                <Clients />
                <Job/>
                <Contactus />
                <Footer />
            </div>
        )
    }
}
