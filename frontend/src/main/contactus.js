import React, { Component } from 'react'

export default class contactus extends Component {
  render() {
    return (
      <div className='contactus'>
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center left">
              <h2 className="hf">
                Get in touch with us
              </h2>
              <p className='text-muted mt-2'>
                Let us know what you are thinking
              </p>
              <form className='mt-4'>
                <input type="text" id="name" placeholder="Name" />
                <input type="text" id="name" placeholder="Phone" />
                <input type="text" id="name" placeholder="Email" />
                <textarea rows='3' type="text" id="name" placeholder="Your message" />
                <button id="enquiry-btn" className='mt-4'>
                  Send
                </button>
              </form>
            </div>
            <div className="col-md-6 right text-center">
              <h2 className="text-center hf">Contact</h2>
              <p className="mt-2">Have a question? We can help you...</p>

              <div className="mt-5  info">
                <div>
                  <span className="font-weight-bold">
                    <i className="mx-2 fa fa-map"></i> Address
                  </span>
                  <div>
                    1156, Tower B2, 11th Floor, <br />
                    Spaze I Tech Park, Sohna Road, <br />
                    Sector 49, Gurgaon - 122001
                    </div>
                </div>

                <div className='mt-4'>
                  <span className="font-weight-bold">
                    <i className="mx-2 fa fa-envelope"></i> Email
                  </span>
                  <div> zenithec@gmail.com</div>
                </div>

                <div className='mt-4'>
                  <span className="font-weight-bold">
                    <i className="mx-2 fa fa-phone"></i> Phone
                </span>
                  <div> +91 8940073123</div>
                  <div>+91 9787536393</div>
                </div>

                <div className="mt-4">
                  <span className="font-weight-bold">
                    Social
                    <br />
                  </span>
                  <div className="social">
                    <i className="fab mx-2 fa-facebook"></i>
                    <i className="fab mx-2 fa-twitter"></i>
                    <i className="fab mx-2 fa-linkedin"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
