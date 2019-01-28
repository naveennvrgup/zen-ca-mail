import React, { Component } from 'react'
import faxios from '../../axios'; const axios = faxios()

export default class subscribe extends Component {
    state = {
        saved: false,
        verified: false,
    }

    componentDidMount = () => {
        this.subscribe = document.querySelector('#subscribe');
    }

    SubscribeHandler = (e) => {
        e.preventDefault()
        let subName = this.subscribe.querySelector('#subName');
        let subMobile = this.subscribe.querySelector('#subMobile');
        let subEmail = this.subscribe.querySelector('#subEmail');

        let payload = {
            name: subName.value,
            mobile: subMobile.value,
            email: subEmail.value,
        }

        axios.post('api/subscriber/', payload)
            .then((d) => {
                const data = d.data
                console.log(data);
                if (data.id) {
                    this.setState({
                        ...this.state,
                        ...data,
                        saved: true
                    })
                    if(!data.verified){
                        this.sendOtpHandler()
                    }
                }
            })
    }

    sendOtpHandler = (e = null) => {
        if (e) {
            e.preventDefault()
        }

        axios.post('api/sendOtp/', {
            id: this.state.id
        })
            .then(d => {
                console.log(d.data)
            }).catch(e => {
                console.error(e)
            })
    }

    VerifyOtpHandler = (e) => {
        e.preventDefault()
        let otp = this.subscribe.querySelector('#otp');

        axios.post('api/verifyOtp/', {
            otp: otp.value,
            id: this.state.id
        })
            .then(d => {
                console.log(d.data)
                this.setState({
                    ...this.state,
                    ...d.data,
                })
            }).catch(e => {
                console.error(e)
            })
    }

    wrongMailHandler = (e) => {
        e.preventDefault()

        axios.delete(`api/subscriber/${this.state.id}/`)
            .then(d => {
                console.log(d.data)
                this.setState({
                    ...this.state,
                    saved: false
                })
            }).catch(e => {
                console.error(e)
            })

    }

    render() {
        const newSub = (
            <div>
                <input type="text" id="subName" placeholder='name' />
                <input type="text" id="subMobile" placeholder='mobile' />
                <input type="email" id="subEmail" placeholder='email' />
                <input type="submit" onClick={this.SubscribeHandler} />
            </div>
        )

        const putOtp = (
            <div>
                {this.state.email}
                {this.state.verified ? "verification success" : 'not yet verified '}
                <input type="text" placeholder='otp' id="otp" />
                <input type="submit" onClick={this.VerifyOtpHandler} />
                <button className="btn btn-sm btn-outline-primary" onClick={this.sendOtpHandler}>
                    resend otp
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={this.wrongMailHandler}>
                    wrong email?
                </button>
            </div>
        )

        return (
            <form id='subscribe' className='my-5'>
                {this.state.saved ? putOtp : newSub}
            </form>
        )
    }
}
