import React, { Component } from 'react'

import Cover from './cover'
import Subscribe from './subscribe'
import Values from './values'
import Navbar from './navbar'
import Aboutus from './aboutus'
import Contactus from './contactus'
import Footer from './footer'
import News from './news'

export default class main extends Component {
    render() {
        return (
            <div className='main'>
                <Navbar />
                <Cover />
                <Subscribe />
                <News />
                <Values />
                <Aboutus />
                <Contactus />
                <Footer />
            </div>
        )
    }
}
