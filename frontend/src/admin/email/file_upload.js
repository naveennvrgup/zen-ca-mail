import React, { Component } from 'react'
import faxios, { burl } from '../../axios'; 

export default class FileUpload extends Component {
    axios = faxios()
    state = {
        files: []
    }

    componentDidMount = () => {
        
        let fi = this.props.initialFiles
        console.log(fi)

        fi = fi.map(ele => ({
            id: ele.id,
            url: ele.file,
            progess: '100%',
            name: ele.file.split('/').pop(),
            saved: true
        }))

        this.setState({
            ...this.state,
            files: fi
        })

    }

    selectFilesHandler = e => {
        e.preventDefault()

        let fi = document.createElement('input')
        fi.type = 'file'
        fi.multiple = true
        fi.click()

        fi.addEventListener('change', e => {
            let currFiles = [...this.state.files]

            for (let i = 0; i < fi.files.length; i++) {
                let file = fi.files[i]
                let flag = true

                currFiles.forEach(ele => {
                    if (ele.name === file.name) {
                        flag = false
                    }
                })

                if (flag) {
                    currFiles.push({
                        file: file,
                        name: file.name,
                        progress: 0,
                    })
                }
            }

            this.setState({
                ...this.state,
                files: currFiles
            })
        })
    }

    uploadFileHandler = (e, ele) => {
        e.preventDefault()

        var data = new FormData();
        var request = new XMLHttpRequest();

        data.append('file', ele.file);
        data.append('draft', this.props.draftId)

        // load event
        request.addEventListener('load', (e) => {
            let res = e.target.response
            console.log(res);

            this.setState({
                files: this.state.files.map(item => {
                    if (item.name === ele.name) {
                        return {
                            ...item,
                            saved: true,
                            progress: '100%',
                            url: res.file,
                            id: res.id,
                        }
                    }
                    return item
                })
            })
        });

        console.log(this.state.files)

        // monitor progress of upload
        request.upload.addEventListener('progress', (e) => {
            var progress = (e.loaded / e.total) * 100 + '%';

            this.setState({
                files: this.state.files.map(item => {
                    if (item.name === ele.name) {
                        return {
                            ...item,
                            progress
                        }
                    }
                    return item
                })
            })
        });

        request.upload.addEventListener('abort', (e) => {
            let files = this.state.files
                .filter(item => item.name !== ele.file.name)

            this.setState({
                ...this.state,
                files
            })// end of setstate

        })

        request.setRequestHeader('Authorization',sessionStorage['token'])
        request.responseType = 'json';
        request.open('post', burl + 'api/attachment/');
        request.send(data);

        // attach request obj to state  
        this.setState({
            files: this.state.files.map(item => {
                if (item.name === ele.name) {
                    return {
                        ...item,
                        request
                    }
                }
                return item
            })
        })
    }

    deleteFileHandler = (e, ele) => {
        e.preventDefault()

        if (!ele.saved) {
            ele.request.abort()
            return
        }

        this.axios.delete(`api/attachment/${ele.id}/`)
            .then(d => {
                d = d.data
                let files = this.state.files.filter(item => item.id !== ele.id)
                this.setState({ files })
            })
    }

    render() {
        let files = (
            <div className="alert alert-warning">
                No attachments yet
            </div>
        )

        if (this.state.files.length > 0) {
            // console.log('rendering')
            files = []
            this.state.files.forEach((ele, i) => {
                // console.log(ele)
                let action =
                    <button className="btn green nbtn mx-2" onClick={(e) => this.uploadFileHandler(e, ele)}>
                        <i className="fa fa-upload"></i>
                    </button>
                let file_link = 'inprogess'

                if (!ele.progess) {
                    file_link = 'waiting'
                }

                if (ele.saved) {
                    file_link =
                        <a href={ele.url} target='_blank' rel="noopener noreferrer" >
                            link
                        </a>
                }

                if (ele.progress || ele.id) {
                    action =
                        <button className="btn red nbtn mx-2" onClick={(e) => this.deleteFileHandler(e, ele)}>
                            <i className="fa fa-times"></i>
                        </button>
                }

                files.push(
                    <div className='d-flex tab file align-items-center justify-content-between' key={ele.name}>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='name mx-2'>
                                {ele.name}
                            </div>
                            <div className='link mx-2 badge badge-pill badge-dark'>
                                {file_link}
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className={`progress mx-2 ${ele.saved ? 'hide-progress' : ''}`}>
                                <div className={`progress-bar progress-bar-striped m-0`}
                                    style={{ width: ele.progress }}></div>
                            </div>
                            {action}
                        </div>
                    </div>
                )
            })
        }

        return (
            <div className='fileUpload'>
                <div className="d-flex align-items-center mt-3">
                    <div>
                        <label className='font-weight-bold mx-3 my-4'>Attachments:</label>
                    </div>
                    <div>
                        <button className="btn blue nbtn" onClick={this.selectFilesHandler}>
                            <i className="fa fa-plus" ></i>
                        </button>
                    </div>
                </div>
                <div className="files">
                    {files}
                </div>
            </div>
        )
    }
}
