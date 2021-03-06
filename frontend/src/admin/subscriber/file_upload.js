import React, { Component } from 'react'
import { burl } from '../../axios'; 

// redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions'


class FileUpload extends Component {
    state = {
        progress: 0,
        onprogress: false,
    }

    static propTypes = {
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
        console.log(this.props)
        data.append('group_id', this.props.selected_group_id)
        data.append('file', file);

        // load event
        request.addEventListener('load', (e) => {
            let res = e.target.response
            console.log(res);

            this.props.set_loading(true)
            this.props.get_subs()
            this.setState({
                ...this.state,
                onprogress: false
            })
        });

        // monitor progress of upload
        request.upload.addEventListener('progress', (e) => {
            var progress = (e.loaded / e.total) * 100
            console.log(progress)
            this.setState({
                ...this.state,
                progress
            })
        })

        request.responseType = 'json';
        request.open('post', burl + 'api/sub_as_csv/');
        request.setRequestHeader('Authorization',sessionStorage['token'])
        request.send(data);

        this.setState({
            ...this.state,
            onprogress: true,
        })// end of setstate
        console.log('upload started', this.state)
    }

    render() {
        // let error = <

        let btn_text = this.state.onprogress ?
            String(this.state.progress.toFixed(0)) :
            <i className="fa fa-upload"></i>


        return (
            <div className=''>
                <div className="new_sub_csv d-flex justify-content-between align-items-center">
                    <div className='text-left'>
                        Upload a .csv with fields email, name, mobile
                    </div>
                    <button
                        disabled={this.state.onprogress ? true : false}
                        onClick={this.selectFilesHandler}
                        className="btn nbtn green">
                        {btn_text}
                    </button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => state.subscribers

export default connect(mapStateToProps, actions)(FileUpload)