import React, { Component } from 'react'
import axios from '../../axios'
import { withRouter } from 'react-router-dom'

class toolbar extends Component {
    state = {
    }
    
    componentDidMount = () => {
        let total=this.props.count
        let drafts = 0
        let outbox = 0
        let sent = 0
        this.props.results.forEach(ele=>{
            switch(ele.status){
                case 0: drafts++;break
                case 1: outbox++;break
                case 2: sent++;break
            }
        })

        this.setState({
            ...this.state,
            total,
            drafts,
            outbox,
            sent
        })// end of setstate
    }
    

    newMailHandler = (e) => {
        e.preventDefault()
        axios.post('api/draft/', {
            subject: 'new draft'
        })
            .then(d => {
                console.log(d.data)
                this.props.history.push(`/admin/email/${d.data.id}/`)
            })
    }

    render() {
        return (
            <div className='tab p-4'>
                <div>
                    <i className="fa fa-circle text-primary"></i>
                    <span className="font-weight-bold mx-2">Total Emails:</span>
                    <span>{this.state.total}</span>
                </div>
                <div>
                    <i className="fa fa-circle text-danger"></i>
                    <span className="font-weight-bold text-muted mx-2">Drafts:</span>
                    <span>{this.state.drafts}</span>
                </div>
                <div>
                    <i className="fa fa-circle text-warning"></i>
                    <span className="font-weight-bold text-muted mx-2">Outbox:</span>
                    <span>{this.state.outbox}</span>
                </div>
                <div>
                    <i className="fa fa-circle text-success"></i>
                    <span className="font-weight-bold text-muted mx-2">Sent:</span>
                    <span>{this.state.sent}</span>
                </div>
            </div>
        )
    }
}

export default withRouter(toolbar)
