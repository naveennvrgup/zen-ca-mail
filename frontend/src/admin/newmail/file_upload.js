import React, { Component } from 'react'
import axios from '../../axios'

export default class FileUpload extends Component {
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

        request.responseType = 'json';
        request.open('post', 'http://localhost:8000/api/attachment/');
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

        axios.delete(`api/attachment/${ele.id}/`)
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
                console.log(ele)
                let action =
                    <button className="btn green" onClick={(e) => this.uploadFileHandler(e, ele)}>
                        <i className="fa fa-upload"></i>
                    </button>
                let fileId = 'inprogess'

                if (!ele.progess) {
                    fileId = 'waiting'
                }

                if (ele.saved) {
                    fileId =
                        <a href={ele.url} target='_blank' rel="noopener noreferrer" >
                            FId: {ele.id}
                        </a>
                }

                if (ele.progress || ele.id) {
                    action =
                        <button className="btn red" onClick={(e) => this.deleteFileHandler(e, ele)}>
                            <i className="fa fa-times"></i>
                        </button>
                }

                files.push(
                    <div className='d-flex file p-2' key={ele.name}>
                        <div className='name'>
                            {ele.name}
                        </div>
                        <div className='fid'>
                            {fileId}
                        </div>
                        <div>
                            <div className={`progress  ${ele.saved ? 'hide-progress' : ''}`}>
                                <div
                                    className={`progress-bar progress-bar-striped m-0`}
                                    style={{
                                        width: ele.progress
                                    }}></div>
                            </div>
                        </div>
                        <div className='action'>
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
                        <button className="btn blue" onClick={this.selectFilesHandler}>
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
