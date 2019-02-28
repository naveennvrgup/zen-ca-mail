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

            {/* <Scrollspy
                offset={-200}
                className="left"
                items={['cover', 'values', 'services', 'aboutus', 'contactus']}
                currentClassName="active_link">
                <li className="nlink">
                    <a href="#cover">Home</a>
                </li>
                <li className="nlink">
                    <a href="#values">Values</a>
                </li>
                <li className="nlink">
                    <a href="#services">Services</a>
                </li>
                <li className="nlink">
                    <a href="#aboutus">About</a>
                </li>
                <li className="nlink">
                    <a href="#contactus">Contact</a>
                </li>
            </Scrollspy> */}
            <div className="right">
                <div className="slink">
                    <a href="facebook.com">
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
                <div className="slink">
                    <a href="twitter.com">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
                <div className="slink">
                    <a href="twitter.com">
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
                        <a href="facebook.com">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                    <div className="slink">
                        <a href="twitter.com">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                    <div className="clink">
                        +91 8940073123
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