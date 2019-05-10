import React, { Component } from 'react'
import faxios from '../../axios';

export default class login extends Component {
    axios = faxios()
    state = {
        error_msg: ''
    }
    componentDidMount = () => {
        let login = document.querySelector('.login');
        this.username = login.querySelector('.username')
        this.password = login.querySelector('.password')
    }


    login_handler = e => {
        e.preventDefault()
        this.axios.post('login/', {
            username: this.username.value,
            password: this.password.value
        }).then(d => {
            // when a login is successful the user token is saved in the sessionstorage
            sessionStorage.setItem('token', `Token ${d.data.token}`)
            this.props.history.push('/admin/dashboard/')
            console.log('hello')
        }).catch(d => {
            this.setState({
                ...this.state,
                error_msg: 'Error: Invalid credentials'
            })// end of setstate
        })
    }

    render() {
        return (
            <div className='login d-flex justify-content-center align-items-center'>
                <form className="p-5">
                    <div className="text-center text-danger">{this.state.error_msg}</div>
                    <div className="form-group">
                        <label className='font-weight-bold'>Username:</label>
                        <input type="text" className="username text-center form-control" />
                    </div>
                    <div className="form-group">
                        <label className='font-weight-bold'>Password:</label>
                        <input type="password" className="password text-center form-control" />
                    </div>
                    <div className="text-center">
                        <button
                            onClick={this.login_handler}
                            className="btn btn-primary">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}
