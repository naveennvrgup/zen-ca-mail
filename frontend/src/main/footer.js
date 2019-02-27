import React, { Component } from 'react'

export default class footer extends Component {
    render() {
        return (
            <footer>
                <div id="info">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-3">
                                <h4>Our Services</h4>
                                <div>Lorem</div>
                                <div>Lpsum</div>
                                <div>Dollar</div>
                                <div>Emmet</div>
                                <div>Lorem</div>
                            </div>
                            <div className="col-md-3">
                                <h4>Navigation</h4>
                                <div>Home</div>
                                <div>About</div>
                                <div>Services</div>
                                <div>Contact Us</div>
                            </div>
                            <div className="col-md-3">
                                <h4>newsletter</h4>
                                <div>Subscribe to the email newsletter to stay updated on finance!</div>
                                <div className="text-center">
                                </div>
                                    <button id='footer_sub_btn'>Subscribe</button>
                            </div>
                            <div className="col-md-3">
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
}
