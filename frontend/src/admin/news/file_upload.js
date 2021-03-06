import React, { Component } from 'react'
import faxios, { burl } from '../../axios';

export default class FileUpload extends Component {
    axios = faxios()
    state = {
        progress: 0, // progress percentage of the loading bar
        onprogress: false, // uploading yes/no
    }

    componentDidMount = () => {
        var progress = this.props.img ? '100%' : ''

        this.setState({
            ...this.state,
            ...this.props,
            progress,
        })// end of setstate
        console.log(this.state);
    }


    selectFilesHandler = e => {
        e.preventDefault()

        let fi = document.createElement('input')
        fi.type = 'file'
        fi.accept = "image/x-png,image/gif,image/jpeg"
        fi.click()

        fi.addEventListener('change', e => {
            let file = e.target.files[0]
            this.uploadFileHandler(file)
        })
    }

    uploadFileHandler = (file) => {

        var data = new FormData();
        var request = new XMLHttpRequest();
        console.log(this.props)
        data.append('nid', this.props.id)
        data.append('img', file);

        // load event
        request.addEventListener('load', (e) => {
            let res = e.target.response
            console.log(res);

            this.setState({
                ...this.state,
                ...res,
                onprogress: false
            })
        });

        // monitor progress of upload
        request.upload.addEventListener('progress', (e) => {
            var progress = (e.loaded / e.total) * 100 + "%"
            console.log(progress)
            this.setState({
                ...this.state,
                progress
            })
        })

        request.upload.addEventListener('abort', e => {
            this.setState({
                ...this.state,
                onprogress: false,
                progress: 0
            })// end of setstate
        })


        request.responseType = 'json';
        request.open('post', burl + `api/put_news_img/`);
        request.setRequestHeader('Authorization', sessionStorage['token'])
        request.send(data);

        this.setState({
            ...this.state,
            progress: 0,
            onprogress: true,
            request
        })// end of setstate
    }

    abortUploadHandler = (e) => {
        e.preventDefault()
        this.state.request.abort()
    }

    delete_handler = e => {
        e.preventDefault()
        this.axios.patch(`api/news/${this.state.id}/`, {
            img: null
        }).then(d => {
            console.log(d.data)
            this.setState({
                ...this.state,
                ...d.data,
                progress: 0
            })// end of setstate
            console.log(this.state)
        })
    }

    render() {
        let btn_text = this.state.onprogress ?
            <i className="fa fa-times"></i> :
            <i className="fa fa-upload"></i>

        let btn_img_true =
            <button
                onClick={this.delete_handler}
                className="btn btn-primary">
                <i className="fa fa-times"></i>
            </button>

        let btn_img_false =
            <button
                onClick={this.state.onprogress ? this.abortUploadHandler : this.selectFilesHandler}
                className="btn btn-primary">
                {btn_text}
            </button>

        let button_to_show = this.state.img ? btn_img_true : btn_img_false

        let progress_bar =
            <div className={`progress mx-2  ${this.state.onprogress ? '' : 'hide-progress-news'}`}>
                <div className="progress-bar progress-bar-striped" style={{ width: this.state.progress }}></div>
            </div>

        let filename = this.state.img ? this.state.img.split('/').pop() : ''

        return (
            <div className='flex-grow-1 px-0'>
                <div className="new_sub_csv d-flex flex-wrap  justify-content-between align-items-center">
                    <div className=''>
                        <span className='d-none d-md-inline-block'>
                            {filename ? filename : 'No images attached to the news'}
                        </span>
                        {this.state.img && <span className="badge text-white mx-2 badge-dark badge-pill">
                            <a href={this.state.img} rel="noopener noreferrer" target='_blank'>
                                link
                            </a>
                        </span>}

                    </div>
                    <div className='d-flex justify-content-between align-items-center'>
                        {progress_bar}
                        {button_to_show}
                    </div>
                </div>
            </div>
        )
    }
}
