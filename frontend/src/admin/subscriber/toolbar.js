import React, { Component } from 'react'
import UploadCSV from './file_upload'
import faxios, { burl } from '../../axios';

export default class toolbar extends Component {
    axios = faxios()
    state = {
        upload_subs: 0,
    }

    componentDidMount = () => {

        this.new_sub = document.querySelector('.new_sub');
        this.new_sub_name = this.new_sub.querySelector('.new_sub_name');
        this.new_sub_email = this.new_sub.querySelector('.new_sub_email');
        this.new_sub_mobile = this.new_sub.querySelector('.new_sub_mobile');
    }

    render() {
        let new_sub_input =
            <form autoComplete='false' className={'d-flex new_sub align-items-center px-1 py-2'} key={1}>
                {/* <div className='sno px-2 font-weight-bold'>{1}</div> */}
                <div className='flex-grow-1 d-flex align-items-center flex-wrap justify-content-between'>
                    {/* email */}
                    <input
                        type="email"
                        className="new_sub_email tab_input tab_input_sm mt-2"
                        placeholder="Email" />
                    {/* username */}
                    <input
                        type="text"
                        className="new_sub_name tab_input tab_input_sm mt-2"
                        placeholder="Name" />
                    {/* mobile */}
                    <input
                        type="mobile"
                        className="new_sub_mobile tab_input tab_input_sm mt-2"
                        placeholder="Mobile number" />
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
                            disabled={this.props.selected_group_name === 'Subscribers' ? true : false}
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