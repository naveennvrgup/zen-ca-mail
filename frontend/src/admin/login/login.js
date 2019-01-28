import React, { Component } from 'react'
import faxios from '../../axios'; const axios = faxios()

export default class login extends Component {
    componentDidMount = () => {
        let login = document.querySelector('.login');
        this.username = login.querySelector('.username')
        this.password = login.querySelector('.password')
    }
    
    
    login_handler = e =>{
        e.preventDefault()
        axios.post('login/',{
            username: this.username.value,
            password: this.password.value
        }).then(d=>{
            sessionStorage.setItem('token', `Token ${d.data.token}`)
            this.props.history.push('/admin/')
        })
    }

    render() {
        return (
            <div className='login d-flex justify-content-center align-items-center'>
                <form className="p-5">
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
