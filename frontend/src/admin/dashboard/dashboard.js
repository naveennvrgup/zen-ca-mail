import React, { Component } from 'react'
import faxios from '../../axios'

import Brief from './brief'
import EmailsSentChart from './emails_sent_chart'

export default class dashboard extends Component {
    axios = faxios()
    state = {
        drafts: {},
        news: {},
        subscribers: {},
        metrics: [],
    }

    componentDidMount = () => {
        this.axios.get('api/get_delivery_reports/')
            .then(d => {
                console.log(d.data);
            })
        this.axios.get('api/get_draft_details/')
            .then(d => {
                console.log(d.data);
            })
        this.axios.get('api/subscribers_brief/')
            .then(d => {
                console.log(d.data);
                this.setState({
                    ...this.state,
                    subscribers: d.data
                })// end of setstate
            })
        this.axios.get('api/drafts_brief/')
            .then(d => {
                console.log(d.data);
                this.setState({
                    ...this.state,
                    drafts: d.data
                })// end of setstate
            })
        this.axios.get('api/news_brief/')
            .then(d => {
                console.log(d.data);
                this.setState({
                    ...this.state,
                    news: d.data
                })// end of setstate
            })
    }


    render() {
        return (
            <div className='p-5 dashboard'>
                <h1 className=''>Dashboard</h1>
                <Brief
                    subscribers={this.state.subscribers}
                    drafts={this.state.drafts}
                    news={this.state.news}
                />
                <EmailsSentChart />
            </div>
        )
    }
}
