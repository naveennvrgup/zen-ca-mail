import React, { Component } from 'react'

export default class subscribe extends Component {
    render() {
        return (
            <div className='subscribe text-center'>
                <h2>Subscribe Our Newsletter</h2>
                <p>We provide useful updates on finance via email.</p>
                <form>
                    <input type="text" placeholder='Your Name' className="name" />
                    <input type="email" placeholder='Your Email' className="email" />
                    <input type="text" placeholder='Your Phone no.' className="phone" />
                </form>
            </div>
        )
    }
}
