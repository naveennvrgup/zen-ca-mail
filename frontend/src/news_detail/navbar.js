import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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

    bignav = () =>
        <div className='bignav'>
            <div className="brand hf wow fadeIn" data-wow-duration='2s'>
                J K GUPTA
            </div>
            <ul>
                <li className="nlink wow fadeInRight" data-wow-delay='0s'>
                    <Link to={'/'}>Homepage</Link>
                </li>
            </ul>

            <div className="right">
                <div className="slink wow zoomIn" data-wow-delay='0.1s'>
                    <a href="https://www.facebook.com/pages/JK-Gupta-Chartered-Accountant/235462179990288"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
                <div className="slink  wow zoomIn" data-wow-delay='0.2s'>
                    <a href="https://twitter.com/cajeetugupta8"
                        target='_blank'
                        rel="noopener noreferrer"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
                <div className="slink  wow zoomIn" data-wow-delay='0.3s'>
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
                    J K GUPTA
                </div>
                <div className="trigger">
                    <button onClick={this.toggle_sm_nav}>
                        {this.state.smn_active ?
                            <i className="fa fa-times"></i> :
                            <i className="fa fa-bars"></i>}
                    </button>
                </div>
            </div>
            <div className="hide">
                <div onClick={() => this.setState({
                    ...this.state,
                    smn_active: false
                })} className="left">
                    <div className="smlink">
                        <Link to={'/'}>Homepage</Link>
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