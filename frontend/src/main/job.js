import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class job extends Component {
    render() {
        return (
            <div className='job container text-center font-weight-bold p-5'>
                <div className="row align-items-center">
                    <div className="col-md-6 d-none d-md-block">
                        <img id='hiring_img' src={require('../assets/hiring.gif')} alt="we are hiring image" />
                    </div>
                    <div className="col-md-6">
                        <h2>We are hiring. Wanna learn?</h2>
                        <a href='mailto:jkgupta.hr@gmail.com?subject=Query regarding job opportunities in JKG' className="button">Shoot us a mail here <i className="fa fa-mail"></i></a>
                        <div className="half_black mt-2">(jkgupta.hr@gmail.com)</div>
                        <h2 className='mt-5'>Looking for a career opportunities? </h2>
                        <NavLink className='button mt-3' to='/recruitment'>Apply Here</NavLink>
                    </div>
                </div>
            </div>
        )
    }
}
