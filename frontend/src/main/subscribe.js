import React, { Component } from 'react'
import fuser from '../axios'
import SubChat from './sub_chat'

export default class subscribe extends Component {
    _show = e => {
        e.preventDefault()
        document.querySelector('.sub_chat').classList.remove('d-none')
    }

    componentDidMount() {
        if (!localStorage['subscriber']) {
            setTimeout(() => {
                document.querySelector('.sub_chat').classList.remove('d-none')
            }, 1000)
        }
    }


    render() {
        return (
            <div className='sub-wrapper' >
                <SubChat />
                <div className="sub-btn-div">
                    <div className="anim-holder">
                        <button onClick={this._show} className='sub-btn'>
                            <i style={{fontSize: '25px'}} className="far fa-comment-dots"></i>
                        </button>
                        <div className="at-anim"></div>
                    </div>
                </div>
            </div>
        )
    }
}
