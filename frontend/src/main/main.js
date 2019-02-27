import React, { Component } from 'react'

import Cover from './cover'
import Subscribe from './subscribe'
import Values from './values'
import Navbar from './navbar'
import Aboutus from './aboutus'
import Contactus from './contactus'
import Footer from './footer'

export default class main extends Component {
    render() {
        return (
            <div className='main'>
                <Navbar />
                <Cover />
                <Subscribe />
                <Values />
                <Aboutus />
                <Contactus />
                <Footer />
            </div>
        )
    }
}
