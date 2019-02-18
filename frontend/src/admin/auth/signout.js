import React, { Component } from 'react'

export default class signout extends Component {
    signout_handler = e => {
        e.preventDefault()
        sessionStorage.clear('token')
        this.props.history.push('/user_login/')
    }

    render() {
        return (
            <div className='text-center'>
                <div className="font-weight-bold">
                    Are you sure want to sign out?
                </div>
                <div className='mt-3'>
                    <button
                        onClick={this.signout_handler}
                        className="btn mx-3 btn-outline-danger">Sign out</button>
                    <button
                        onClick={this.props.history.goBack}
                        className="btn mx-3 btn-primary">No, goback</button>
                </div>
            </div>
        )
    }
}
