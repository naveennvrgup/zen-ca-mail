import React, { Component } from 'react'

export default class cookiepolicy extends Component {
    state = {
        already_visited: false
    }
    
    componentDidMount() {
        if(localStorage['already_visited']){
            this.setState({
                ...this.state,
                already_visited: true
            })
        }
    }


    render() {
        return (
            <div className={this.state.already_visited ? 'd-none': "cookie"}>
                <div className="cookie-bg"></div>
                <div className='cookie-policy'>
                    <p>
                        The rules of the Bar Council of India prohibit law firms from advertising and soliciting work through communication in the public domain. This website is meant solely for the purpose of information and not for the purpose of advertising. jkgupta.in does not intend to solicit clients through this website. We do not take responsibility for decisions taken by the reader based solely on the information provided in the website. By clicking on <b>‘ENTER’</b>, the visitor acknowledges that the information provided in the website (a) does not amount to advertising or solicitation and (b) is meant only for his/her understanding about our activities and who we are.
            </p>
                    <p>
                        By continuing to use this site you consent to our <b>Terms</b> and <b>Privacy Policy</b>.
            </p>
                    <div className="d-flex justify-content-around">
                        <button className='enter-btn' onClick={this._agree}>Enter</button>
                        <button className='exit-btn' onClick={this._exit}>Exit</button>
                    </div>
                </div>
            </div>
        )
    }

    _agree = e =>{
        e.preventDefault()
        this.setState({
            ...this.state,
            already_visited: true,
        })
        localStorage['already_visited'] = true
    }

    _exit = e => {
        e.preventDefault()
        window.location = 'http://google.com'
    }
}
