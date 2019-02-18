import React, { Component } from 'react'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import FileUpload from './file_upload'

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import faxios from '../../axios'; 

export default class NewMail extends Component {
    axios = faxios()
    constructor(props) {
        super(props);
        
        let emailBody = '<p>loading please wait...</p>';

        const contentBlock = htmlToDraft(emailBody);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.state = {
                editorState,
                files: false
            };
        }
    }

    componentDidMount = () => {
        this.subject = document.querySelector('#subject');
        this.files = document.querySelector('.files');
        this.draftId = this.props.match.params.id
        localStorage.setItem('currDraft', this.draftId)

        this.axios.get('api/draft/' + this.draftId + '/')
            .then(d => {
                d = d.data

                this.html2Draft(d.body)
                this.subject.value = d.subject
                console.log(d)
                this.setState({
                    ...this.state,
                    ...d
                })
            })
    }

    onEditorStateChange = (editorState) => {
        this.setState({ editorState });
    };

    draft2Html = () => {
        const { editorState } = this.state;
        const html = draftToHtml(convertToRaw(editorState.getCurrentContent()))
        return html
    }

    html2Draft = (html) => {
        const contentBlock = htmlToDraft(html);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            this.setState({ editorState });
        }
    }

    saveDraftHandler = (e, sendMail) => {
        e.preventDefault()

        this.axios.put('api/draft/' + this.draftId + '/', {
            subject: this.subject.value,
            body: this.draft2Html()
        })
            .then(d => {
                // console.log(d.data)
                if (!sendMail) {
                    this.props.history.push('/admin/email/')
                }
            })
    }

    sendMailHandler = async (e) => {
        e.preventDefault()
        await this.saveDraftHandler(e, true)
        this.props.history.push(`/admin/email/send_email/${this.draftId}/`)
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
        let head = <h1>Edit Mail</h1>

        return (
            <div className='newMail'>
                <form className='ml-3'>
                    <div className="d-flex align-items-center justify-content-between">
                        {head}
                        <div className={`buttons py-3 ${this.state.status ? 'd-none' : 'd-flex'}`}>
                            <button className="btn btn-outline-danger mr-3"
                                onClick={this.deleteDraftHandler}>delete</button>
                            <button className="btn mr-3"
                                onClick={this.saveDraftHandler}>save</button>
                            <button className="btn btn-success"
                                onClick={this.sendMailHandler}>send</button>
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
                        <Editor
                            className='bg-white'
                            status={this.state.status}
                            editorState={this.state.editorState}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>

                    {this.state.files ?
                        <FileUpload draftId={this.draftId} initialFiles={this.state.files} />
                        : ''}

                </form>
            </div>
        )
    }
}
