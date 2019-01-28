import React, { Component } from 'react'
import axios from '../../axios'

// import FileUpload from './file_upload'

export default class NewMail extends Component {
    state = {

    }

    componentDidMount = () => {
        this.files = document.querySelector('.edit_news');
        this.title = this.files.querySelector('.title')
        this.link = this.files.querySelector('.link')
        this.brief = this.files.querySelector('.brief')

        this.newsId = this.props.match.params.id

        axios.get('api/news/' + this.newsId + '/')
            .then(d => {
                d = d.data
                console.log(d)
                this.title.value = d.title
                this.link.value = d.link
                this.brief.value = d.brief
                this.setState({
                    ...this.state,
                    ...d
                })
            })
    }

    saveNewsHandler = (e, sendMail) => {
        e.preventDefault()

        axios.put('api/News/' + this.NewsId + '/', {
            title: this.title.value,
            link: this.link.value,
            brief: this.brief.value
        })
            .then(d => {
                console.log(d.data)
                this.props.history.push('/admin/news/')
            })
    }

    showNewsHandler = async (e) => {
        e.preventDefault()
        await this.saveNewsHandler(e, true)
        this.props.history.push(`/admin/email/send_email/${this.NewsId}/`)
    }

    deleteNewsHandler = (e) => {
        e.preventDefault()
        axios.delete('api/News/' + this.NewsId + '/')
            .then(d => {
                console.log(d.data)
                this.props.history.push('/admin/email/')
            })
    }

    render() {
        let head = <h1>Edit News</h1>

        return (
            <div className='edit_news p-5'>
                <form className='ml-3'>
                    <div className="d-flex align-items-center justify-content-between">
                        {head}
                        <div className={`buttons py-3 d-flex`}>
                            <button className="btn btn-outline-danger mr-3"
                                onClick={this.deleteNewsHandler}>delete</button>
                            <button className="btn mr-3"
                                onClick={this.saveNewsHandler}>save</button>
                            <button className="btn btn-success"
                                onClick={this.sendMailHandler}>send</button>
                        </div>
                    </div>

                    {/* title */}
                    <div className="form-group mt-3">
                        <label className='font-weight-bold'>Title:</label>
                        <input
                            type='text'
                            className='title form-control w-100' />
                    </div>

                    {/* img */}
                    <div className="form-group mt-3">
                        <label className='font-weight-bold'>Img:</label>
                        <input
                            type='text'
                            className='img form-control w-100' />
                    </div>

                    {/* link */}
                    <div className="form-group mt-3">
                        <label className='font-weight-bold'>Link:</label>
                        <input
                            type='text'
                            className='link form-control w-100' />
                    </div>

                    {/* brief */}
                    <div className="form-group mt-3">
                        <label className='font-weight-bold'>Brief:</label>
                        <textarea
                            rows='4'
                            className='brief form-control w-100' />
                    </div>

                    {/* {this.state.files ?
                        <FileUpload NewsId={this.NewsId} initialFiles={this.state.files} />
                        : ''} */}

                </form>
            </div>
        )
    }
}
