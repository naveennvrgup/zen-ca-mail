import React, { Component } from 'react'
import axios from '../../axios'

export default class toolbar extends Component {
    state = {}

    componentDidMount = () => {
        this.new_sub = document.querySelector('.new_sub');
        this.new_sub_name = this.new_sub.querySelector('.new_sub_name');
        this.new_sub_email = this.new_sub.querySelector('.new_sub_email');
        this.new_sub_mobile = this.new_sub.querySelector('.new_sub_mobile');
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

        let new_sub_csv =
            <div className='px-1 py-2'>
                <div className="new_sub_csv d-flex justify-content-between align-items-center">
                    <div className='d-flex justify-content-between align-items-center'>
                        <button
                            onClick={this.upload_csv_handler}
                            className="btn mx-1 btn-sm">Upload CSV</button>
                        <span className='mx-1 badge badge-pill badge-dark py-1'>Total: {this.state.upload_subs}</span>
                        <span className={`mx-1 badge badge-pill badge-danger ${this.state.upload_email ? '' : 'd-none'}`}>email</span>
                        <span className={`mx-1 badge badge-pill badge-danger ${this.state.upload_name ? '' : 'd-none'}`}>name</span>
                        <span className={`mx-1 badge badge-pill badge-danger ${this.state.upload_mobile ? '' : 'd-none'}`}>mobile</span>
                    </div>
                    <div>
                        <button className="btn nbtn green">
                            <i className="fa fa-check"></i>
                        </button>
                    </div>
                </div>
                <div className='text-right'>
                    Upload a .csv with fields email(required), name, mobile
                </div>
            </div>

        return (
            <div>
                {new_sub_input}
                {new_sub_csv}
            </div>
        )
    }
}