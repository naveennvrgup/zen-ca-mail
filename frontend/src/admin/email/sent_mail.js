import React, { Component } from 'react'
import faxios from '../../axios'

export default class send_mail extends Component {
    axios = faxios()
    state = {
        groups: [],
        draft: {
            subject: '',
            body: '',
            files: []
        }
    }

    componentDidMount = () => {
        this.draftId = this.props.match.params.id
        this.send_mail = document.querySelector('.send-mail');
        this.body = this.send_mail.querySelector('.body');
        this.group = this.send_mail.querySelector('#group');


        this.axios.get('api/group/')
            .then(d => {
                d = d.data
                console.log(d)
                this.setState({
                    ...this.state,
                    groups: d
                })
            })

        this.axios.get(`api/draft/${this.draftId}/`)
            .then(d => {
                d = d.data
                console.log(d)
                this.body.innerHTML = d.body
                this.setState({
                    ...this.state,
                    draft: d
                })
            })
    }

    render() {
        const groups = [<option
            className='form-control'
            key={0}
            value={0}>--choose--</option>]

        this.state.groups.forEach(ele =>
            groups.push(<option
                className='form-control'
                key={ele.id}
                value={ele.id}>{ele.name} ({ele.subs})</option>)
        )

        const attachments = this.state.draft.files.map(ele => <li key={ele.id}>
            <a href={ele.file}>{ele.file.split('/').pop()}</a>
        </li>)

        return (
            <div className='send-mail p-5'>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="">Send Mail</h1>
                    <div>
                        <button
                            onClick={this.props.history.goBack}
                            className="btn mx-2">
                            <i className="fa fa-arrow-left"></i > back
                        </button>
                    </div>
                </div>
                <div className="info mt-4">
                    <div className="form-group">
                        <label className='font-weight-bold'>Sent to: </label>
                        <span>{this.state.draft.sentTo}</span>
                    </div>
                    <div className="form-group">
                        <label className='font-weight-bold'>Sent to group: </label>
                        <span>{this.state.draft.group}</span>
                    </div>
                    <div className="form-group">
                        <label className='font-weight-bold'>Subject:</label>
                        <span className="subject mx-3">{this.state.draft.subject}</span>
                    </div>
                    <div className="form-group">
                        <label className='font-weight-bold'>Body:</label>
                        <div className="body"></div>
                    </div>
                    <div className="form-group">
                        <label className='font-weight-bold'>Attachments:</label>
                        <ol className="attachments">{attachments.length ? attachments: 'no attachments'}</ol>
                    </div>
                </div>
            </div>
        )
    }
}
