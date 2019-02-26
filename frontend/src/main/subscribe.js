import React, { Component } from 'react'

export default class subscribe extends Component {
    render() {
        return (
            <div className='subscribe text-center p-5'>
                <h2 className='hf'>Subscribe to our Newsletter</h2>
                <p>We provide useful updates on finance via email.</p>
                <form>
                    <input type="text" placeholder='Name' className="name" />
                    <input type="email" placeholder='Email' className="email" />
                    <input type="text" placeholder='Phone no.' className="phone" />
                    <div className="text-center mt-3">
                        <button>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}
