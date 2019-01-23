import React, { Component } from 'react'
import { Link, Route, Switch, withRouter } from 'react-router-dom'
import '../../assets/scss/big.scss'

export default class big extends Component {
    render() {
        let Before = () => (
            <div className="links d-flex">
                <div className="link mr-3">
                    <Link to='/getStarted/' className='active get-started'>Get Started</Link>
                </div>
                <div className="link mr-3">
                    <Link to='/newsfeed/' className=''>Newfeed</Link>
                </div>
            </div>
        )

        let After = () => (
            <div className="links d-flex">
                <div className="link mr-3">
                    <Link to='/about/' className='active'>About Us</Link>
                </div>
                <div className="link mr-3">
                    <Link to='/services/'>Services</Link>
                </div>
                <div className="link mr-3">
                    <Link to='/clients/'>Our Clients</Link>
                </div>
                <div className="link mr-3">
                    <Link to='/newsfeed/'>Newfeed</Link>
                </div>
                <div className="link mr-3">
                    <Link to='/subscribe/'>Subscribe</Link>
                </div>
                <div className="link mr-3">
                    <Link to='/contactus/'>Contact Us</Link>
                </div>
            </div>
        )

        return (
            <div>
                <div className="big_menubar d-none d-md-flex align-items-center justify-content-between">
                    <Link to='/'>
                        <div className="brand d-flex align-items-center">
                            <div className="brand_logo mx-3">
                                <img src={require('../../assets/img/logo.png')} alt="" />
                            </div>
                            <div className="brand_name">
                                Brandname
                            </div>
                        </div>
                    </Link>
                    <Switch>
                        <Route path='/:page/' component={After} />
                        <Route path='/' component={Before} />
                    </Switch>
                </div>
            </div>
        )
    }
}