import React, { Component } from 'react'

export default class contactus extends Component {
  render() {
    return (
      <div className='contactus my-5'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center">
              <h4 className="hf">
                Get in touch with us
              </h4>
              <p className='text-muted'>
                Let us know what you are thinking
              </p>
              <form>
                <input type="text" id="name" placeholder="Name" />
                <input type="text" id="name" placeholder="Phone" />
                <input type="text" id="name" placeholder="Email" />
                <textarea rows='3' type="text" id="name" placeholder="Your message" />
              </form>
            </div>
            <div className="col-md-6">
            </div>
          </div>
        </div>
      </div>
    )
  }
}
