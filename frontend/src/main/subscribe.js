import React, { Component } from 'react'
import fuser from '../axios'

export default class subscribe extends Component {
    axios = fuser()
    state = {}

    Error = () => <div className="my-3 text-danger">{this.state.error}</div>
    Success = () => <div className='my-3'>{this.state.success}</div>

    componentDidMount = () => {
        this.form = document.querySelector('.subscribe form')
        this.name = this.form.querySelector('.name')
        this.email = this.form.querySelector('.email')
        this.mobile = this.form.querySelector('.phone')
    }


    add_sub_handler = e => {
        e.preventDefault()
        if(!this.form.checkValidity()){
            this.setState({
                ...this.state,
                error: 'Please fill all the fields with valid details!'
            })// end of setstate
            return
        }

        this.axios.post('/api/sub_from_main/', {
            'name': this.name.value,
            'email': this.email.value,
            'mobile': this.mobile.value
        }).then(d => {
            d = d.data
            console.log(d)
            if (d.error) {
                this.setState({
                    ...this.state,
                    error: d.error,
                    success: null,
                })// end of setstate
            } else {
                this.setState({
                    ...this.state,
                    success: d.msg,
                    error: null,
                })// end of setstate
            }
        })
    }

    render() {
        return (
            <div className='subscribe text-center'>
                <h2 className='hf'>Subscribe to our Newsletter</h2>
                <p>We provide useful updates on finance via email.</p>
                {this.state.error ? <this.Error /> : ''}
                {this.state.success ? <this.Success /> : ''}
                <form className={this.state.success ? 'd-none' : ''}>
                    <input type="text" placeholder='Name' className="name" required/>
                    <input type="email" placeholder='Email' className="email" required/>
                    <input type="text" placeholder='Phone no.' className="phone" required/>
                    <div className="text-center mt-3">
                        <button disabled={this.state.success} onClick={this.add_sub_handler}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}