import React, { Component } from 'react'
import { Link } from 'react-scroll'

export default class footer extends Component {
    flink = (to, name) => <Link
        to={to}
        smooth={true}
        duration={500}
        offset={-75}>
        {name}
    </Link>


    render() {
        return (
            <footer id='footer'>
                <div id="info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3" id='fservices'>
                                <h4>Our Expertise</h4>
                                <div>Service Tax, Excise, Customs </div>
                                <div>Goods and Service tax </div>
                                <div>Provident Fund </div>
                                <div>Export incentives </div>
                                <div>and more </div>
                            </div>
                            <div className="col-md-3 flinks" id='fnav'>
                                <h4>Navigation</h4>
                                <div>{this.flink('cover', 'Home')}</div>
                                <div>{this.flink('aboutus', 'About Us')}</div>
                                <div>{this.flink('values', 'Values')}</div>
                                <div>{this.flink('services', 'Practices')}</div>
                                <div>{this.flink('clients', 'Clients')}</div>
                                <div>{this.flink('contactus', 'Contact')}</div>
                            </div>
                            <div className="col-md-3" id='fsubscribe'>
                                <h4>newsletter</h4>
                                <div>Subscribe to the email newsletter to stay updated on finance!</div>
                                <div className="text-center">
                                </div>
                                <div className="footer_sub_link mt-3">
                                    {/* {this.flink('subscribe', 'Subscribe')} */}
                                    <Link to='none' onClick={this._opensub}>Subscribe</Link>
                                </div>
                            </div>
                            <div className="col-md-3" id='fcredits'>
                                <h4>Credits</h4>
                                <div>Website built by <br />
                                    <span className="font-weight-bold">
                                        <a rel='noopener noreferrer' href="https://zenithec.com" target='_blank'>Zenithec Techware</a>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="rights">
                    <div className="container">
                        All rights reserved.
                    </div>
                </div>
            </footer>
        )
    }

    _opensub = e => {
        e.preventDefault()
        document.querySelector('.sub-btn').click()
    }
}
