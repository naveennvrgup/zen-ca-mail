import React, { Component } from 'react'
import fuser from '../axios'
// import News from './news'

export default class subscribe extends Component {
    axios = fuser()
    state = {
        popup: false,
    }

    Error = () => <div className="my-3 text-danger">{this.state.error}</div>
    Success = () => <div className='my-3'>{this.state.success}</div>

    componentDidMount = () => {
        this.form = document.querySelector('.sub-wrapper .left form')
        this.name = this.form.querySelector('.name')
        this.email = this.form.querySelector('.email')
        this.mobile = this.form.querySelector('.phone')

        console.log(this.subscribe)

    }


    add_sub_handler = e => {
        e.preventDefault()
        if (!this.form.checkValidity()) {
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

    _show = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            popup: true
        })
    }

    _close = e => {
        e.preventDefault()
        this.setState({
            ...this.state,
            popup: false,
            success: null
        })
    }


    render() {
        return (
            <div className='sub-wrapper'>
                <div ref={ele => this.subscribe = ele} className={this.state.popup ? 'subscribe py-3 py-md-5' : 'd-none'} id='subscribe'>
                    <div className="left text-center">
                        <h2 className='hf fadeInUp' data-wow-delay='0.2s'>Subscribe</h2>
                        <p className='px-md-5 fadeInUp' data-wow-delay='0.4s'>Get latest business newsletters via email.</p>
                        {this.state.error ? <this.Error /> : ''}
                        {this.state.success ? <this.Success /> : ''}
                        <form className={this.state.success ? 'd-none' : ''} data-wow-delay='0.8s'>
                            <input type="text" placeholder='Name' className="name" required />
                            <input type="email" placeholder='Email' className="email" required />
                            <input type="text" placeholder='Phone no.' className="phone" required />
                            <div className="text-center mt-3">
                                <button disabled={this.state.success} className="mr-3" onClick={this.add_sub_handler}>
                                    Submit
                                        </button>
                                <button className='bg-danger' onClick={this._close}>
                                    No Thanks
                                        </button>
                            </div>
                        </form>
                        {this.state.success ? <div className="text-center mt-3">
                            <button className='bg-success' onClick={this._close}>
                                Close
                                </button>
                        </div> : ''}
                    </div>
                </div>

                <div className={this.state.popup ? 'd-none' : "sub-btn-div"}>
                    <div className="anim-holder">
                        <button onClick={this._show} className='sub-btn'>
                            <i className="fa fa-newspaper"></i>
                        </button>
                        <div className="at-anim"></div>
                    </div>
                </div>
            </div>
        )
    }
}
