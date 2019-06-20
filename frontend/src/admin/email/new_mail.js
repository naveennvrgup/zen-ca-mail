import React, { Component } from 'react'

import FileUpload from './file_upload'
import faxios from '../../axios';
import Summernote from './summernote'

export default class NewMail extends Component {
    axios = faxios()
    state = {
        editorState: '<p>loading please wait...</p>'
    }

    componentDidMount = () => {
        this.subject = document.querySelector('#subject');
        this.files = document.querySelector('.files');
        this.draftId = this.props.match.params.id
        localStorage.setItem('currDraft', this.draftId)

        this.axios.get('api/draft/' + this.draftId + '/')
            .then(d => {
                d = d.data

                this.subject.value = d.subject
                console.log(d)
                this.setState({
                    ...this.state,
                    ...d,
                    editorState: d.body
                })
            })
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
    };


    saveDraftHandler = (e, sendMail) => {
        e.preventDefault()

        this.axios.put('api/draft/' + this.draftId + '/', {
            subject: this.subject.value,
            body: this.state.editorState
        })
            .then(d => {
                // console.log(d.data)
                if (sendMail) {
                    this.props.history.push(`/admin/email/send_email/${this.draftId}/`)
                }else{
                    this.props.history.push('/admin/email/')
                }
            })

    }

    deleteDraftHandler = (e) => {
        e.preventDefault()
        this.axios.delete('api/draft/' + this.draftId + '/')
            .then(d => {
                console.log(d.data)
                this.props.history.push('/admin/email/')
            })
    }

    render() {
        return (
            <div className='newMail'>
                <form className=''>
                    <div className="d-md-flex d-block align-items-center justify-content-between">
                        <h1 className='text-center'>Edit Mail</h1>
                        <div className={`buttons py-md-3 py-1 ${this.state.status ? 'd-none' : 'd-flex justify-content-center'}`}>
                            <button className="btn btn-outline-danger mr-3"
                                onClick={this.deleteDraftHandler}>delete</button>
                            <button className="btn mr-3"
                                onClick={e=> this.saveDraftHandler(e,false)}>save</button>
                            <button className="btn btn-success"
                                onClick={e=> this.saveDraftHandler(e,true)}>send</button>
                        </div>
                    </div>

                    {/* subject */}
                    <div className="form-group mt-3">
                        <label htmlFor="subject" className='font-weight-bold'>Subject:</label>
                        <input
                            status={this.state.status}
                            type='text'
                            id='subject'
                            className='form-control w-100' />
                    </div>

                    {/* body */}
                    <label className='font-weight-bold mt-2'>Body:</label>
                    <div className='body'>
                        <Summernote onEditorStateChange={this.onEditorStateChange} editorState={this.state.editorState}/>
                    </div>

                    {this.state.files ?
                        <FileUpload draftId={this.draftId} initialFiles={this.state.files} />
                        : ''}

                </form>
            </div>
        )
    }
}
