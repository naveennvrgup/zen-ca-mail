import React, { Component } from 'react'
import faxios from '../../axios'

export default class send_mail extends Component {
    axios = faxios()
    state = {
        groups: [],
        selected_groups: [],
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
                    groups: d
                })
            })

        this.axios.get(`api/draft/${this.draftId}/`)
            .then(d => {
                d = d.data
                console.log(d)
                this.body.innerHTML = d.body
                this.setState({
                    draft: d
                })
            })
    }

    send_mail_handler = e => {
        e.preventDefault()

        if(this.state.selected_groups.length===0){
            return
        }
        
        this.axios.post('api/send_bulk_mail/', {
            groups: this.state.selected_groups.map(group=>group.id),
            draft: this.draftId
        }).then(d => {
            console.log(d.data)
            this.props.history.push('/admin/email/')
        })
    }

    _on_group_select = e => {
        e.preventDefault()
        const value= Number(e.target.value)

        if(value==='0'){
            return
        }
        
        var groups = this.state.groups.filter(ele => ele.id !== Number(value))
        var selected_group = this.state.groups.filter(ele => ele.id === Number(value))[0]

        this.setState({
            groups,
            selected_groups: [...this.state.selected_groups, selected_group]
        })
    }

    _on_selectall_group = e => {
        e.preventDefault()
        this.setState({
            groups: [],
            selected_groups: this.state.groups
        })
    }

    _on_group_deselect = (e,group_id) => {
        e.preventDefault()
        
        var deselected_group = this.state.selected_groups.filter(ele => ele.id === group_id)[0]
        var selected_groups = this.state.selected_groups.filter(ele => ele.id !== group_id)

        this.setState({
            groups: [...this.state.groups,deselected_group],
            selected_groups
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

        const selected_groups = this.state.selected_groups.map(ele=> (
            <div className="mx-1 my-1 selected-group" key={ele.id}>
                <span className='group-name'>{ele.name} ({ele.subs})</span>
                <button className="d-inline-block" onClick={(e)=>this._on_group_deselect(e,ele.id)}>
                    <i className="fa fa-times"></i>
                </button>
            </div>
        ))

        const total_selected_groups = this.state.selected_groups.length
        const total_selected_emails = this.state.selected_groups.reduce((sum,ele)=>sum+=ele.subs,0)

        const attachments = this.state.draft.files.map(ele => <li key={ele.id}>
            <a href={ele.file}>{ele.file.split('/').pop()}</a>
        </li>)

        return (
            <div className='send-mail'>
                <div className="d-md-flex justify-content-between align-items-center">
                    <h1 className="text-center">Send Mail</h1>
                    <div className='text-center'>
                        <button
                            onClick={this.props.history.goBack}
                            className="btn mx-2">
                            <i className="fa fa-arrow-left"></i > back
                        </button>
                        <button
                            disabled={this.state.draft.id ? false : true}
                            onClick={this.send_mail_handler}
                            className="btn btn-success mx-2 ">
                            Send <i className="fa fa-plane"></i >
                        </button>
                    </div>
                </div>
                <div className="info mt-4">
                    <div className="form-group">
                        <label className='font-weight-bold'>Select groups:</label>
                        <select
                            name="group"
                            className='form-control d-inline-block w-auto mx-3'
                            defaultValue={0}
                            onChange={this._on_group_select}
                            id="group">
                            {groups}
                        </select>
                        <button onClick={this._on_selectall_group} className="btn">Select all</button>
                    </div>
                    <div className="form-group">
                        <label>Selected groups: </label>
                        {selected_groups}
                    </div>

                    <div className="form-group">
                        <label>Total Selected groups: </label> {total_selected_groups}
                    </div>

                    <div className="form-group">
                        <label>Total Selected emails: </label> {total_selected_emails}
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
                        <ol className="attachments">{attachments}</ol>
                    </div>
                </div>
            </div>
        )
    }
}
