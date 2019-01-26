import React, { Component } from 'react'
import { burl } from '../../axios'

export default class FileUpload extends Component {
    state = {
        progress: 0,
        onprogress: false,
    }

    selectFilesHandler = e => {
        e.preventDefault()

        let fi = document.createElement('input')
        fi.type = 'file'
        fi.accept = '.csv'
        fi.click()

        fi.addEventListener('change', e => {
            let file = e.target.files[0]
            this.uploadFileHandler(file)
        })
    }

    uploadFileHandler = (file) => {

        var data = new FormData();
        var request = new XMLHttpRequest();

        data.append('file', file);
        data.append('group_id', this.props.sgid)
        
        // load event
        request.addEventListener('load', (e) => {
            let res = e.target.response
            console.log(res);
            
            this.setState({
                ...this.state,
                onprogress: false
            })
        });
        
        // monitor progress of upload
        request.upload.addEventListener('progress', (e) => {
            var progress = (e.loaded / e.total) * 100
            
            this.setState({
                ...this.state,
                progress
            })
        })
        
        request.responseType = 'json';
        request.open('post', burl+ 'api/sub_as_csv/');
        request.send(data);

        this.setState({
            ...this.state,
            progress: true,
        })// end of setstate
    }
    
    render() {
        // let error = <

        let btn_text = this.state.onprogress ?
            String(this.state.progress) + ' %' :
            <i className="fa fa-upload"></i>


        return (
            <div className='px-1 py-2'>
                <div className="new_sub_csv d-flex justify-content-between align-items-center">
                    <div className='text-left'>
                        Upload a .csv with fields email(required), name, mobile
                    </div>
                    <button
                        onClick={this.selectFilesHandler}
                        className="btn nbtn green">
                        {btn_text}
                    </button>
                </div>
            </div>
        )
    }
}
