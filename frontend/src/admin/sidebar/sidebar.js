import React, { Component } from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'

class sidebar extends Component {
    render() {
        return (
            <div className='sidebar pt-5'>
                <NavLink to='/admin/dashboard/' className="link w-100">
                    <i className="far fa-chart-bar"></i>
                    <span>Dashboard</span>
                </NavLink>
                <NavLink to='/admin/group/' className="link w-100">
                    <i className="fa fa-users"></i>
                    <span to='/admin/group'>Subscribers</span>
                </NavLink>
                <NavLink to='/admin/email/' className="link w-100">
                    <i className="far fa-envelope"></i>
                    <span to='/admin/email'>E-mail</span>
                </NavLink>
                <NavLink to='/admin/news/' className="link w-100">
                    <i className="far fa-newspaper"></i>
                    <span to='/admin/news'>Newsfeed</span>
                </NavLink>
                <NavLink to='/admin/Signout/' className="link w-100">
                    <i className="fas fa-sign-out-alt"></i>
                    <span to='/admin/signout'>Signout</span>
                </NavLink>
            </div>
        )
    }
}

export default withRouter(sidebar)