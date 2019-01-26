import React, { Component } from 'react'
import axios from '../../axios'
import UploadCSV from './file_upload'

export default class toolbar extends Component {
    state = {}

    componentDidMount = () => {
        this.new_sub = document.querySelector('.new_sub');
        this.new_sub_name = this.new_sub.querySelector('.new_sub_name');
        this.new_sub_email = this.new_sub.querySelector('.new_sub_email');
        this.new_sub_mobile = this.new_sub.querySelector('.new_sub_mobile');

        console.log(this.props)
    }

    add_sub_to_group_handler = (e) => {
        e.preventDefault()
        axios.post('api/add_sub_to_group/', {
            groupId: this.props.selected_group_id,
            name: this.new_sub_name.value,
            email: this.new_sub_email.value,
            mobile: this.new_sub_mobile.value
        }).then(d => {
            // update sub list
            this.props.get_subs()
            // update the groups badges
            this.props.update_groups()
        })
    }

    delete_group_handler = (e) => {
        e.preventDefault()
        if (this.props.selected_group_name === 'all') {
            return
        }

        let group_2_delete = this.props.selected_group_id

        this.props.set_groups_state({
            selected_group_id: null,
            selected_group_name: 'all'
        })

        axios.delete(`api/group/${group_2_delete}/`)
            .then(d => {
                console.log(d.data)
                this.props.update_groups()
                // this.props.get_subs()
            })
    }

    download_group_csv_handler = () => {
        axios.post('api/download_group_as_csv/',{
            group_id: this.props.selected_group_id
        }).then(d=>{
            console.log(d.data)
        })
    }
    

    render() {
        let new_sub_input =
            <form autoComplete='false' className={'d-flex new_sub align-items-center px-1 py-2'} key={1}>
                {/* <div className='sno px-2 font-weight-bold'>{1}</div> */}
                <div className='flex-grow-1 d-flex align-items-center justify-content-between'>
                    {/* email */}
                    <input
                        type="email"
                        className="new_sub_email tab_input tab_input_sm"
                        placeholder="email"
                        autoFocus />
                    {/* username */}
                    <input
                        type="text"
                        className="new_sub_name tab_input tab_input_sm"
                        placeholder="username" />
                    {/* mobile */}
                    <input
                        type="mobile"
                        className="new_sub_mobile tab_input tab_input_sm"
                        placeholder="mobile no." />
                </div>
                <div className='create-sub create'>
                    <button
                        onClick={this.add_sub_to_group_handler}
                        className="btn nbtn green">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </form>

        return (
            <div className='toolbar tab p-3'>
                {/* new sub via input */}
                <div>
                    <div className="font-weight-bold">New subscriber:</div>
                    {new_sub_input}
                </div>
                {/* upload csv */}
                <div>
                    <div className="font-weight-bold mt-2">Upload subscribers as CSV:</div>
                    <UploadCSV {...this.props} />
                </div>
                {/* download csv */}
                <div>
                    <div className="font-weight-bold mt-2">Download subscribers as CSV:</div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            Click here to download .csv of the subscribers of this group
                        </div>
                        <button
                            onClick={this.download_group_csv_handler}
                            className="btn nbtn blue">
                            <i className="fa fa-download"></i>
                        </button>
                    </div>
                </div>
                {/* delete current group */}
                <div>
                    <div className="font-weight-bold mt-2">Delete current group:</div>
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            This will only delete the group not the subscribers
                        </div>
                        <button
                            disabled={this.props.selected_group_name === 'all' ? true : false}
                            onClick={this.delete_group_handler}
                            className="btn nbtn red">
                            <i className="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}