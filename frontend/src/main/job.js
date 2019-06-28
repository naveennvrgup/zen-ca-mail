import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

export default class job extends Component {
    render() {
        return (
            <div className='job text-center font-weight-bold p-5'>
                <span>Looking for a career opportunities? </span>
                <NavLink to='/recruitment'>Click Here</NavLink>
            </div>
        )
    }
}
