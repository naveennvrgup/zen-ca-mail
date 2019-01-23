import React, { Component } from 'react'
import axios from '../../axios'

export default class email extends Component {
    state = {
        drafts: []
    }

    componentDidMount = () => {
        axios.get('api/draft/')
            .then(d => {
                d = d.data
                this.setState({ drafts: d.filter(ele=>ele.status===0) })
            })
            .catch(e => console.error(e))
    }

    newMailHandler = (event) => {
        event.preventDefault()
        axios.post('api/draft/', {
            subject: 'new draft',
            body: '<p>email body goes here</p>'
        })
            .then(d => {
                this.props.history.push('/admin/newMail/' + d.data.id)
            })
    }

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

    createDraftView = (p, i) => (
        <div className='d-flex align-items-center justify-content-between email' key={p.id}>
            <div className='d-flex align-items-center'>
                <div className='srno font-weight-bold'>{i + 1}</div>
                <div className='subject'>{p.subject}</div>
                <div className='date'>({p.edited_on})</div>
            </div>

            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2EditHandler(e, p.id)}
                    className="btn edit">
                    <i className="fas fa-pen-alt"></i>
                </button>
                <button onClick={(e) => this.deleteDraftHandler(e, p.id)}
                    className="btn delete">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div>
    )

    send2EditHandler = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/admin/newMail/${id}/`)
    }

    render() {
        let drafts = this.state.drafts
        drafts = drafts.map((draft, i) => this.createDraftView(draft, i))

        return (
            <div id='drafts' className='p-5'>
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className=''>E-mail</h1>
                    <div>
                        <button className="btn btn-success" onClick={this.newMailHandler}>New Mail</button>
                    </div>
                </div>

                <div className="d-flex text-muted">
                    <div className='p-3'>
                        <span className="font-weight-bold">Total drafts: </span>
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
