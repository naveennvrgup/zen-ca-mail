import React, { Component } from 'react'

import Cover from './cover'
import Subscribe from './subscribe'
import Values from './values'
import Navbar from './navbar'

export default class main extends Component {
    render() {
        return (
            <div className='main'>
                <Navbar />
                <Cover />
                <Subscribe />
                <Values />
            </div>
        )
    }
}
