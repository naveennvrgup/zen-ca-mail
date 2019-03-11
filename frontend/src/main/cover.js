import React, { Component } from 'react'
import { Link } from 'react-scroll'

export default class cover extends Component {
    render() {
        return (
            <div className='cover' id='cover'>
                <div className="container">
                    <div className="wrapper">
                        <div className="intro p-4 p-md-5 ml-md-5">
                            <h1 className="hf name">J K GUPTA</h1>
                            <h1 className="hf desig">CHARTED ACCOUNTANT</h1>
                            <p className="mt-3">
                                Damn Fine Tax Litigators and Advisors.
                            </p>
                            <div className="mt-5">
                                <Link
                                    smooth={true}
                                    duration={500}
                                    offset={-75}
                                    to='contactus'
                                    id="to_contactus_btn" className='btn-link'>
                                    Contact Us
                                </Link>
                                <Link
                                    smooth={true}
                                    duration={500}
                                    offset={-100}
                                    to='subscribe'
                                    id="to_subscribe_btn" className='btn-link'>
                                    Subscribe
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
