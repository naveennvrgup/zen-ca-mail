import React, { Component } from 'react'

export default class footer extends Component {
    render() {
        return (
            <footer>
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
                            <h4>Social</h4>
                            <div>Stay tuned with the help of social media!</div>
                            <div className="social-links">
                                <i className="fab fa-facebook"></i>
                                <i className="fab fa-twitter"></i>
                                <i className="fab fa-linkedin"></i>
                            </div>
                            <div>Subscribe to the newsletter!</div>
                            <button id='footer_sub_btn'>Subscribe</button>
                        </div>
                        <div className="col-md-3">
                            <h4>Credits</h4>
                            <div>Website built by Zenithec Techware </div>
                        </div>
                    </div>
                    <div id="rights">
                        All rights reserved.
                    </div>
                </div>
            </footer>
        )
    }
}
