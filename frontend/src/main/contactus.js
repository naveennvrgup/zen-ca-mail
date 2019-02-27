import React, { Component } from 'react'
import fuser from '../axios'

export default class contactus extends Component {
  axios = fuser()
  state = {}

  componentDidMount = () => {
    this.form = document.querySelector('.contactus form')
    this.name = this.form.querySelector('#name')
    this.email = this.form.querySelector('#email')
    this.mobile = this.form.querySelector('#phone')
    this.msg = this.form.querySelector('#msg')
  }

  Error = () => <div className="text-danger my-3">{this.state.error}</div>

  place_enquiry_handler = e => {
    e.preventDefault()

    if (!this.form.checkValidity()) {
      this.setState({
        ...this.state,
        error: 'Please fill all the fields with valid details!'
      })// end of setstate
      return
    }

    this.axios.post('/api/send_enquiry/', {
      'name': this.name.value,
      'email': this.email.value,
      'mobile': this.mobile.value,
      'msg': this.msg.value
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
    }).catch(e => {
      console.error(e)
    })
  }

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
                {this.state.error ? <this.Error /> : ''}
                <input required type="text" id="name" placeholder="Name" />
                <input required type="text" id="phone" placeholder="Phone" />
                <input required type="text" id="email" placeholder="Email" />
                <textarea required rows='3' type="text" id="msg" placeholder="Your message" />
                <button onClick={this.place_enquiry_handler} id="enquiry-btn" disabled={this.state.success} className='mt-4'>
                  {this.state.success ? 'Message sent!' : 'Send'}
                </button>
              </form>
            </div>

            {/* right side */}
            <div className="col-md-6 right text-center">
              <h2 className="text-center hf">Contact</h2>
              <p className="mt-2">Have a question? We can help you...</p>

              <div className="mt-3  info">
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
