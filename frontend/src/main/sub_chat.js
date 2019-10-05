import React, { Component } from 'react'
import { ChatFeed, Message } from 'react-chat-ui'

export default class Sub_chat extends Component {
  state = {
    messages: [],
    conditions: [
      {
        message: 'Can i know your good name',

        api_call: false,
      },
      {
        message: 'Please enter your mobile number',

        api_call: false,
      },
      {
        message: 'Please enter your email address',
        regex: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        api_call: false,
      },
    ]
  };

  render() {
    const messages = []


    return (
      <div id="sub_chat">
        <div className="chat" >
          <div className="chat-title d-flex justify-content-between">
            <div>
              <h1>Sneha</h1>
              <h2>Chatbot</h2>
              <figure className="avatar text-center">
                <i className="fa fa-user"></i>
              </figure>
            </div>
            <div className='close-button'>
              close
            </div>
          </div>
          <div className="messages">
            <div className="messages-content">
              {messages}
              <div className="message">Hi there!</div>
              <div className="message message-personal">its naveensundar here!</div>
              <div className="message loading new"><span></span></div>
            </div>
          </div>
          <div className="message-box">
            <textarea type="text" className="message-input" placeholder="Type message..."></textarea>
            <button type="submit" className="message-submit">Send</button>
          </div>

        </div >
        <div className="bg"></div>
      </div>
    )

  }
}
