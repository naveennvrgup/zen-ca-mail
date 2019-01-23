import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Index extends Component {

  render() {
    let text = (
      <div>
        <div className="px-5 pb-5 ml-5 catch-phrase display-3">
          A catch phrase for the company goes here
            </div>
        <div className="px-5 pb-5 ml-5 text-secondary brief ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numquam nostrum libero animi sunt minus, voluptas delectus beatae atque impedit consectetur
            </div>
        <div className="home-link text-center mb-5">
          <Link to="/home/">Continue</Link>
        </div>
      </div>
    )

    return (
      <div className="get-started row mx-0 align-items-center">
        <div className="col-md-6">
          {text}
        </div>
        <div className="col-md-6 cover-img">
          {text}
        </div>
      </div>
    )
  }
}
