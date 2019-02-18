import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class sidebar extends Component {
    render() {
        return (
            <div className='sidebar'>
                <div className="w-100 pt-3 px-3 text-right">
                    <button className="btn close-sidebar-btn">
                        <i className="fa fa-bars fa-2x p-0"></i>
                    </button>
                </div>
                <div className="admin-logo w-100">
                    <i className="fa fa-user fa-3x"></i>
                </div>
                <div className="contents pt-3">
                    {/* <h5 className='w-100 text-white mt-3'>Admin</h5> */}
                    <div className='links mt-4'>
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
                </div>
            </div>
        )
    }
}

export default withRouter(sidebar)