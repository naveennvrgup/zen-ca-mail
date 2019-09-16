import React, { Component } from 'react'
import UploadCSV from './file_upload'
import faxios, { burl } from '../../axios'

// redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions'


class Toolbar extends Component {
    static propTypes = {
        groups: PropTypes.object.isRequired,
        get_subs: PropTypes.func.isRequired,
    }


    state = {
        upload_subs: 0,
    }


    componentDidMount = () => {
        this.new_sub = document.querySelector('.new_sub');
        this.new_sub_name = this.new_sub.querySelector('.new_sub_name');
        this.new_sub_email = this.new_sub.querySelector('.new_sub_email');
        this.new_sub_mobile = this.new_sub.querySelector('.new_sub_mobile');
    }

    add_sub_to_group_handler = (e) => {
        e.preventDefault()

        this.props.set_loading(true)
        faxios().post('api/add_sub_to_group/', {
            groupId: this.props.selected_group_id,
            name: this.new_sub_name.value,
            email: this.new_sub_email.value,
            mobile: this.new_sub_mobile.value
        }).then(d => {
            this.new_sub_name.value = ''
            this.new_sub_email.value = ''
            this.new_sub_mobile.value = ''
            // update sub list
            this.props.get_subs()
        })
    }

    delete_group_handler = (e) => {
        e.preventDefault()
        if (this.props.selected_group_name === 'Subscribers') {
            return
        }

        let group_2_delete = this.props.selected_group_id

        this.props.update_state({
            selected_group_id: null,
            selected_group_name: 'Subscribers'
        })

        faxios().delete(`api/group/${group_2_delete}/`)
            .then(d => {
                console.log(d.data)
                this.props.get_subs()
            })
    }

    download_group_csv_handler = () => {
        let anchor = document.createElement('a')
        anchor.href = burl + `api/download_group_as_csv/${this.props.selected_group_id}/`
        anchor.click()
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
                    <UploadCSV />
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

const mapStateToProps = (state) => state.subscribers

export default connect(mapStateToProps, actions)(Toolbar)