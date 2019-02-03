import React, { Component } from 'react'

export default class brief extends Component {
    render() {
        return (
            <div className="row mt-5 brief">
                <div className="col-md-3 n-card-wrapper">
                    <div className=' n-card'>
                        <div className='admin-orange n-card-i'>
                            <i className="fa fa-users fa-2x text-white"></i>
                        </div>
                        <div className='n-card-info'>
                            <div className="n-card-title">Subscribers</div>
                            <div className="n-card-metric">{this.props.subscribers.total}</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 n-card-wrapper">
                    <div className=' n-card'>
                        <div className='admin-green n-card-i'>
                            <i className="far fa-envelope fa-2x text-white"></i>
                        </div>
                        <div className='n-card-info'>
                            <div className="n-card-title">Drafts</div>
                            <div className="n-card-metric">{this.props.drafts.total}</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 n-card-wrapper">
                    <div className=' n-card'>
                        <div className='admin-red n-card-i'>
                            <i className="far fa-newspaper fa-2x text-white"></i>
                        </div>
                        <div className='n-card-info'>
                            <div className="n-card-title">Newsfeed</div>
                            <div className="n-card-metric">{this.props.news.total}</div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3 n-card-wrapper">
                    <div className=' n-card'>
                        <div className='admin-sky-blue n-card-i'>
                            <i className="fa fa-server fa-2x text-white"></i>
                        </div>
                        <div className='n-card-info'>
                            <div className="n-card-title">Server</div>
                            <div className="n-card-metric">{this.props.subscribers.total}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
