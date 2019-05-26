import React, { Component } from 'react'
import { Link } from 'react-scroll'

export default class cover extends Component {
    render() {
        return (
            <div className='cover' id='cover'>
                <div className="container">
                    <div className="wrapper">
                        <div className="intro p-4 p-md-5 ml-md-5">
                            <h1 className="hf name">
                                <div className="wow fadeInUp">Damn Fine Tax</div>
                                <div className="wow fadeInUp" data-wow-delay='0.3s'>Litigators and Advisors</div>
                            </h1>
                            {/* <h1 className="hf desig">B.COMM, FCA, LLB</h1>
                            <p className="mt-3">
                                Damn Fine Tax Litigators and Advisors.
                            </p> */}
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
                                    onClick={this._opensub}
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

    _opensub = e => {
        e.preventDefault()
        document.querySelector('.sub-btn').click()
    }
}
