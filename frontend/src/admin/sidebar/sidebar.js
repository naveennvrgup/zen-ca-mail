import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'

class sidebar extends Component {
    state = {
        sbopen: false // used to toggle the sidebar in the mobile view
    }

    toggle_sidebar = (e) => {
        this.setState({
            ...this.state,
            sbopen: !this.state.sbopen
        })// end of setstate
    }

    render() {
        return (
            <div className={`sidebar ${this.state.sbopen? 'sidebar-open': ''}`}>
                <div className="text-right">
                    <div
                        onClick={this.toggle_sidebar}
                        className="btn close-sidebar-btn">
                        <i className="fa fa-bars fa-2x p-0"></i>
                    </div>
                </div>
                <div className="contents pt-3">
                    <div className="admin-logo text-center ">
                        <i className="fa fa-user fa-3x"></i>
                    </div>
                    {/* <h5 className=' text-white mt-3'>Admin</h5> */}
                    <div className='links mt-4'>
                        <NavLink onClick={this.toggle_sidebar} to='/admin/dashboard/' className="link ">
                            <i className="far fa-chart-bar"></i>
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink onClick={this.toggle_sidebar} to='/admin/group/' className="link ">
                            <i className="fa fa-users"></i>
                            <span to='/admin/group'>Subscribers</span>
                        </NavLink>
                        <NavLink onClick={this.toggle_sidebar} to='/admin/email/' className="link ">
                            <i className="far fa-envelope"></i>
                            <span to='/admin/email'>E-mail</span>
                        </NavLink>
                        <NavLink onClick={this.toggle_sidebar} to='/admin/news/' className="link ">
                            <i className="far fa-newspaper"></i>
                            <span to='/admin/news'>Newsfeed</span>
                        </NavLink>
                        <NavLink onClick={this.toggle_sidebar} to='/admin/Signout/' className="link ">
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