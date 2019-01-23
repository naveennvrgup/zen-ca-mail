import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from '../../axios'

export default class sent extends Component {
    state = {
        drafts: []
    }

    componentDidMount = () => {
        axios.get('api/draft/')
            .then(d => {
                d = d.data
                this.setState({ drafts: d.filter(ele=>ele.status===2) })
                console.log(d)
            })
            .catch(e => console.error(e))
    }

    createDraftView = (p, i) => (
        <div className='d-flex align-items-center justify-content-between draft' key={p.id}>
            <div className='d-flex align-items-center'>
                <div className='srno font-weight-bold'>{i + 1}</div>
                <div className='subject'>{p.subject}</div>

            </div>

            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2EditHandler(e, p.id)}
                    className="btn blue">
                    <i className="fas fa-glasses"></i>
                </button>
                <button onClick={(e) => this.deleteDraftHandler(e, p.id)}
                    className="btn red">
                    <i className="fas fa-trash"></i>
                </button>
            </div>
        </div>
    )

    
    deleteDraftHandler = (e, draftId) => {
        e.preventDefault()

        if (!draftId) {
            draftId = e.target.parentElement.parentElement.dataset.sid;
        }

        axios.delete('api/draft/' + draftId + '/')
            .then(d => {
                let temp = this.state.drafts.filter(i => {
                    return i.id !== Number(draftId)
                })

                this.setState({ drafts: temp })
            }).catch(e => console.error(e))
        console.log(draftId)
    }

    send2EditHandler = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/admin/newMail/${id}/`)
    }

    render() {
        let drafts = this.state.drafts
        drafts = drafts.map((draft, i) => this.createDraftView(draft, i))

        return (
            <div className='email p-5'>
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className=''>SentMail</h1>
                    <div>
                        {/* <button className="btn btn-success" onClick={this.newMailHandler}>New Mail</button> */}
                    </div>
                </div>

                <div className="d-flex text-muted">
                    <div className='p-3'>
                        <span className="font-weight-bold">Total mails sent: </span>
                        {this.state.drafts.length}
                    </div>
                </div>

                <div className="mt-5"></div>
                <div>
                    {drafts}
                </div>
            </div>
        )
    }
}
