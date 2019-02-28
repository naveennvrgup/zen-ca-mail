import React, { Component } from 'react'
import { Link } from "react-scroll";

export default class navbar extends Component {
    state = {
        smn_active: false
    }

    toggle_sm_nav = (e) => {
        console.log('toggle');
        console.log(this.state.smn_active)
        this.setState({
            ...this.state,
            smn_active: !this.state.smn_active
        })// end of setstate
    }

    bnlink = (section, link_name) => <Link
        activeClass='active_link'
        to={section}
        spy={true}
        smooth={true}
        offset={-75}
        duration={500}
    >{link_name}</Link>

    bignav = () =>
        <div className='bignav'>
            <div className="brand hf">
                Mr. J K GUPTA
            </div>
            <ul>
                <li className="nlink">
                    {this.bnlink('cover', 'Home')}
                </li>
                <li className="nlink">
                    {this.bnlink('aboutus', 'About')}
                </li>
                <li className="nlink">
                    {this.bnlink('values', 'Values')}
                </li>
                <li className="nlink">
                    {this.bnlink('services', 'Services')}
                </li>
                <li className="nlink">
                    {this.bnlink('clients', 'Clients')}
                </li>
                <li className="nlink">
                    {this.bnlink('contactus', 'Contact')}
                </li>
            </ul>

            <div className="right">
                <div className="slink">
                    <a href="https://www.facebook.com/pages/JK-Gupta-Chartered-Accountant/235462179990288"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
                <div className="slink">
                    <a href="https://twitter.com/cajeetugupta8"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
                <div className="slink">
                    <a href="https://in.linkedin.com/in/jeetu-gupta-74308440"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>

    smnav = () =>
        <div className={`smnav ${this.state.smn_active ? 'smn_active' : ''}`}>
            <div className="show">
                <div className="brand hf">
                    MR. J K GUPTA
                </div>
                <div className="trigger">
                    <button onClick={this.toggle_sm_nav}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
            </div>
            <div className="hide">
                <div className="left">
                    <div className="nlink">Home</div>
                    <div className="nlink">Values</div>
                    <div className="nlink">About</div>
                    <div className="nlink">Services</div>
                    <div className="nlink">Contact</div>
                </div>
                <div className="right">
                    <div className="clink">
                        zenithec@gmail.com
                </div>
                    <div className="slink">
                        <a href="https://www.facebook.com/pages/JK-Gupta-Chartered-Accountant/235462179990288"
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                    <div className="slink">
                        <a href="twitter.com"
                            target='_blank'
                            rel="https://twitter.com/cajeetugupta8"
                        >
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                    <div className="slink">
                        <a href="https://in.linkedin.com/in/jeetu-gupta-74308440"
                            target='_blank'
                            rel="noopener noreferrer"
                        >
                            <i className="fab fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    render() {
        return (
            <div>
                <div className="d-none d-lg-block">
                    {this.bignav()}
                </div>
                <div className="d-lg-none">
                    {this.smnav()}
                </div>
            </div>
        )
    }
}