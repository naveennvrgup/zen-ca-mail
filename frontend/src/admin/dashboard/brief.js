import React, { Component } from 'react'

export default class brief extends Component {
    render() {
        return (
            <div className="row mt-2 px-0 brief justify-content-center">
                <div className="col-md-3 mt-3 col-sm-6 n-card-wrapper">
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
                <div className="col-md-3 mt-3 col-sm-6 com n-card-wrapper">
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
                <div className="col-md-3 mt-3 col-sm-6 n-card-wrapper">
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
            </div>
        )
    }
}
