import React, { Component } from 'react'
import FileUpload from './file_upload'
import faxios from '../../axios'; 


export default class NewMail extends Component {
    axios = faxios()
    state = {
        error: false
    }

    componentDidMount = () => {
        
        this.files = document.querySelector('.edit_news');
        this.title = this.files.querySelector('.title')
        this.link = this.files.querySelector('.link')
        this.brief = this.files.querySelector('.brief')

        this.newsId = this.props.match.params.id

        this.axios.get('api/news/' + this.newsId + '/')
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

    saveNewsHandler = (e, show_news) => {
        e.preventDefault()

        this.axios.put('api/news/' + this.state.id + '/', {
            title: this.title.value,
            link: this.link.value,
            brief: this.brief.value,
            show: show_news ? show_news : this.state.show
        })
            .then(d => {
                console.log(d.data)
                this.props.history.push('/admin/news/')
            })
            .catch(e=>{
                this.setState({
                    ...this.state,
                    error: true
                })// end of setstate
            })
    }

    // used to AIR  the news
    showNewsHandler = async (e) => {
        e.preventDefault()
        await this.saveNewsHandler(e, true)
        this.props.history.push(`/admin/news/`)
    }

    deleteNewsHandler = (e) => {
        e.preventDefault()
        this.axios.patch('api/news/' + this.newsId + '/',{
            flag: true
        })
            .then(d => {
                console.log(d.data)
                this.props.history.push('/admin/news/')
            })
    }

    render() {
        let head = <h1 className='text-center'>Edit News</h1>

        return (
            <div className='edit_news'>
                <form className=''>
                    <div className="d-md-flex align-items-center justify-content-between">
                        {head}
                        <div className={`buttons justify-content-center py-3 d-flex`}>
                            <button className="btn btn-outline-danger mr-3"
                                onClick={this.deleteNewsHandler}>delete</button>
                            <button className="btn mr-3"
                                onClick={this.saveNewsHandler}>save</button>
                            <button className="btn btn-success"
                                onClick={this.showNewsHandler}>show</button>
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
                        <div className="form-control d-flex pr-0 align-items-center">
                            {this.state.id && <FileUpload
                                {...this.state}
                                newsId={this.state.id} />}
                        </div>
                    </div>

                    {/* link */}
                    <div className="form-group mt-3">
                        <label className='font-weight-bold'>Link:</label>
                        {this.state.error?<div className="text-danger mb-3">Please provide a proper link ex: https://www.google.com/</div>: ''}
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

                </form>
            </div>
        )
    }
}
