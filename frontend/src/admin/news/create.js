import React, { Component } from 'react'
import axios from '../../axios'

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

export default class createMail extends Component {
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
        this.draftId = this.props.match.params.draftId
        localStorage.setItem('currDraft', this.draftId)

        axios.get('api/draft/' + this.draftId + '/')
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

        axios.put('api/draft/' + this.draftId + '/', {
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

        axios.post('api/outbox/', {
            draft: localStorage.getItem('currDraft')
        })
            .then(d => {
                console.log(d.data)
                this.props.history.push('/admin/email/')
            })
    }

    deleteDraftHandler = (e) => {
        e.preventDefault()
        axios.delete('api/draft/' + this.draftId + '/')
            .then(d => {
                console.log(d.data)
                this.props.history.push('/admin/email/')
            })
    }

    render() {
        let head = <h1>{this.draftId ? 'Edit news ' : 'Create news'}</h1>

        if (this.state.status) {
            head = <div className="mb-5">
                <h1 className=''>{this.state.status===1?'Mail in outbox':'Sent mail'} id: {this.state.id}</h1>
                <div className="text-muted">
                    <div>Sending to {this.state.sentTo} subscribers</div>
                    <div>Last edit on at {this.state.edited_on}</div>
                </div>
            </div>

            let body = document.querySelector('.body')
            body.innerHTML = this.state.body

            let files = this.state.files
            if (files.length) {
                body.innerHTML += '<p class="font-weight-bold">Attachments:</p>'
                for (let i = 0; i < files.length; i++) {
                    body.innerHTML += `<a href='${this.state.files[i].file}' class='d-block' target='_blank' download>
                        ${files[i].file.split('/').pop()}
                    </a>`
                }
            }
        }



        return (
            <div id='createMail' className='p-5'>
                <form className='ml-3'>
                    <div className="d-flex align-items-center justify-content-between">
                        {head}
                        <div className={`buttons py-3 ${this.state.status ? 'd-none' : 'd-flex'}`}>
                            <button className="btn btn-outline-danger mr-3"
                                onClick={this.deleteDraftHandler}>delete</button>
                            <button className="btn btn-success mr-3"
                                onClick={this.saveDraftHandler}>save</button>
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
                            status={this.state.status}
                            editorState={this.state.editorState}
                            onEditorStateChange={this.onEditorStateChange}
                        />
                    </div>

                </form>
            </div>
        )
    }
}
