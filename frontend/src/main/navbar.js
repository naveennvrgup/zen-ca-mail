import React, { Component } from 'react'

export default class navbar extends Component {
    state = {
        smn_active: true
    }

    toggle_sm_nav = (e) => {
        console.log('toggle');
        console.log(this.state.smn_active)
        this.setState({
            ...this.state,
            smn_active: !this.state.smn_active
        })// end of setstate
    }

    bignav =
        <div className='bignav'>
            <div className="brand hf">
                MR. J K GUPTA
            </div>
            <div className="left">
                <div className="nlink">Home</div>
                <div className="nlink">Values</div>
                <div className="nlink">About</div>
                <div className="nlink">Services</div>
                <div className="nlink">Contact</div>
            </div>
            <div className="right">
                <div className="slink">
                    <a href="facebook.com">
                        <i className="fab fa-facebook"></i>
                    </a>
                </div>
                <div className="slink">
                    <a href="twitter.com">
                        <i className="fab fa-twitter"></i>
                    </a>
                </div>
                <div className="clink">
                    zenithec@gmail.com
            </div>
                <div className="clink">
                    +91 89400 73123
                </div>
            </div>
        </div>

    smnav = () =>
        <div className={`smnav ${this.state.smn_active ? 'smn_active' : ''}`}>
            <div className="show">
                <div className="brand hf">
                    MR. J K GUPTA
                </div>
                <div className="trigger">
                    <button onClick={this.toggle_sm_nav}>
                        <i className="fa fa-bars"></i>
                    </button>
                </div>
            </div>
            <div className="hide">
                <div className="left">
                    <div className="nlink">Home</div>
                    <div className="nlink">Values</div>
                    <div className="nlink">About</div>
                    <div className="nlink">Services</div>
                    <div className="nlink">Contact</div>
                </div>
                <div className="right">
                    <div className="clink">
                        zenithec@gmail.com
                </div>
                    <div className="slink">
                        <a href="facebook.com">
                            <i className="fab fa-facebook"></i>
                        </a>
                    </div>
                    <div className="slink">
                        <a href="twitter.com">
                            <i className="fab fa-twitter"></i>
                        </a>
                    </div>
                    <div className="clink">
                        +91 89400 73123
                </div>
                </div>
            </div>
        </div>

    render() {
        return (
            <div>
                <div className="d-none d-lg-block">
                    {this.bignav}
                </div>
                <div className="d-lg-none">
                    {this.smnav()}
                </div>
            </div>
        )
    }
}