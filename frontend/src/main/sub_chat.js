import React, { Component } from 'react'
import faxios from '../axios'

const check_email = text => {
  text = text.trim().toLowerCase()
  const email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return email_regex.test(text)
}

const check_mobile = text => {
  text = text.trim().toLowerCase()
  const mobile_regex = /^[0-9]{10}$/
  return mobile_regex.test(text)
}


export default class Sub_chat extends Component {
  state = {
    messages: [
      {
        message: 'Hi! I am Sneha',
        person: 'bot',
      },
      {
        message: 'We recommeded you subscribe to our email newsletter for latest financial news',
        person: 'bot',
      },
      {
        message: 'Can I know your good name please',
        person: 'bot',
        name: 'name',
      },
    ]
  };

  _scroll_down = () => {
    setTimeout(() => {
      this.chatbox.scrollTo(0, this.chatbox.scrollHeight)
    }, 100)
  }

  _new_user_chatmsg = (e) => {
    e.preventDefault()

    let { messages } = this.state
    const newchat = this.newchat.value
    const last_robot = messages[messages.length - 1]

    if(newchat.length<1){return}

    // show the users msg
    messages.push({
      message: newchat,
      person: 'customer',
    })
    this.setState({
      messages,
      loading: true
    })


    // after the users msg in rendered scroll down to reveal the full msg
    this._scroll_down()
    // show the next robot msg
    setTimeout(()=>this.robot_msg(newchat, last_robot), 500)
    this.newchat.value = ''
  }

  robot_msg = (text, last_robot) => {
    let { messages } = this.state

    // verify the user input
    const { name } = last_robot

    switch (name) {
      case 'name':
        this.setState({ [name]: text.trim() })
        messages.push({
          message: 'Please enter your mobile number',
          person: 'bot',
          name: 'mobile',
        })
        break

      case 'mobile':
        if (check_mobile(text)) {
          this.setState({ [name]: text.trim() })
          messages.push({
            message: 'Please enter your email address',
            person: 'bot',
            name: 'email',
          })
        } else {
          messages.push({
            message: 'Please enter a valid phone number like "8923423423"',
            person: 'bot',
            name: 'mobile',
          })
        }
        break


      case 'email':
        if (check_email(text)) {
          this.setState({ [name]: text.trim() })
          messages.push({
            message: 'Thank you for subscribing to us. Your information lie safe with us.',
            person: 'bot',
            name: 'done',
          })
          messages.push({
            message: 'Have a nice day.',
            person: 'bot',
            name: 'done',
          })

          localStorage['subscriber']=true
          // send the info to the backend
          faxios().post('/api/sub_from_main/', {
            'name': this.state.name,
            'email': text.trim(),
            'mobile': this.state.mobile
          }).then(d => {
            d = d.data
            console.log(d)
          })

        } else {
          messages.push({
            message: 'Please enter a valid email address like "example@gmail.com"',
            person: 'bot',
            name: 'email',
          })
        }
        break


      default: {
        messages.push({
          message: 'You are chating with a bot and my responses are limited :). Have a nice day!',
          person: 'bot'
        })
      }
    }

    this.setState({
      messages,
      loading: false
    })
    this._scroll_down()
  }

  _close = () => {
    document.querySelector('.sub_chat').classList.add('d-none')
  }

  render() {
    const messages = this.state.messages.map((msg, i) => {
      if (msg.person === 'bot') {
        return <div key={i} className="message">{msg.message}</div>
      } else {
        return <div key={i} className="message message-personal">{msg.message}</div>
      }
    })


    return (
      <div className="sub_chat d-none">
        <div className="chat" >
          <div className="chat-title d-flex justify-content-between">
            <div>
              <h1>Sneha</h1>
              <h2>Chatbot</h2>
              <figure className="avatar text-center">
                <i className="fa fa-user"></i>
              </figure>
            </div>
            <div onClick={this._close} className='close-button'>
              close
            </div>
          </div>
          <div className="messages" ref={ele => this.chatbox = ele}>
            <div className="messages-content">
              {messages}
              {this.state.loading ? <div className="message loading new"><span></span></div> : null}
            </div>
          </div>
          <form onSubmit={this._new_user_chatmsg} className="message-box">
            <input type="text" ref={ele => this.newchat = ele} className="message-input" placeholder="Type message..."></input>
            <button onClick={this._new_user_chatmsg} type="submit" className="message-submit">Send</button>
          </form>

        </div >
        <div className="bg"></div>
      </div>
    )

  }
}
