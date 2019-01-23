import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from '../../axios'

export default class Outbox extends Component {
    state = {
        drafts: []
    }

    componentDidMount = () => {
        axios.get('api/draft/')
            .then(d => {
                d = d.data
                this.setState({ drafts: d.filter(ele=>ele.status===1) })
            })
            .catch(e => console.error(e))
    }



    createDraftView = (p, i) => (
        <div className='d-flex align-items-center justify-content-between draft' key={p.id}>
            <div className='d-flex align-items-center'>
                <div className='srno font-weight-bold'>{i + 1}</div>
                <div className='subject'>{p.subject}</div>
                <div className='date'>({p.edited_on})</div>
            </div>

            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2EditHandler(e, p.id)}
                    className="btn blue">
                    <i className="fas fa-glasses"></i>
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
            <div className='email p-5'>
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className=''>Outbox</h1>
                    <div>
                        {/* <button className="btn btn-success" onClick={this.newMailHandler}>New Mail</button> */}
                    </div>
                </div>

                <div className="d-flex text-muted">
                    <div className='p-3'>
                        <span className="font-weight-bold">Total mail on outbox: </span>
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
