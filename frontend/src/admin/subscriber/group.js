import React, { Component } from 'react'
import axios from '../../axios'

export default class group extends Component {
    state = {
        group: {
            subs: []
        },
        new_sub_name: '',
        new_sub_email: '',
        new_sub_phone: '',
    }

    componentDidMount = () => {
        console.log(this.props.selected_group_id)
        this.get_subs()
    }

    get_subs = () => {
        axios.get(`api/group/${this.props.selected_group_id}/`)
            .then(d => {
                console.log(d.data)
                this.setState({
                    ...this.state,
                    group: d.data
                })
            })
    }

    new_sub = (e) => {
        e.preventDefault()
        axios.post('api/add_sub_to_group/', {
            groupId: this.props.selected_group_id,
            name: this.state.new_sub_name,
            email: this.state.new_sub_email,
            mobile: this.state.new_sub_phone
        }).then(d => {
            this.setState({
                ...this.state,
                group: {
                    subs: [
                        ...this.state.group.subs,
                        d.data
                    ]
                }
            })
            // update the groups badges
            this.props.update_groups()
        })
    }


    render() {
        // when user selects a different group this method will fire to show the subs
        if (this.state.group.id !== this.props.selected_group_id) {
            this.get_subs()
        }

        let subs = this.state.group.subs
        let subs_list = subs.map((sub, i) =>
            <div className={'d-flex tab align-items-center '} key={i + 1}>
                <div className='sub_sno px-2 font-weight-bold'>{i + 1}</div>
                <div className='sub_phone px-2'>
                    <i className={`fa fa-circle ${sub.verified ? 'text-success' : 'text-danger'}`}></i>
                </div>
                <div className='sub_email px-2'>{sub.email}</div>
                <div className='sub_name px-2'>{sub.name}</div>
                <div className='sub_phone px-2'>{sub.mobile}</div>
                <div className='sub_phone px-2 flex-grow-1'>{sub.mobile}</div>
                <button

                    className={`btn nbtn ${sub.verified ? 'red' : 'green'}`}>
                    <i className={`fa fa-${sub.verified ? 'times' : 'check'}`}></i>
                </button>
            </div>
        )

        let new_sub =
            <form className={'d-flex tab align-items-center '} key={1}>
                {/* <div className='sno px-2 font-weight-bold'>{1}</div> */}
                <div className='flex-grow-1 d-flex align-items-center justify-content-between px-2'>
                    {/* email */}
                    <input
                        onChange={e => this.setState({
                            ...this.state,
                            new_sub_email: e.target.value
                        })}
                        value={this.state.new_sub_email}
                        type="email"
                        className="new_sub_name tab_input tab_input_sm"
                        placeholder="email"
                        autoFocus />
                    {/* username */}
                    <input
                        onChange={e => this.setState({
                            ...this.state,
                            new_sub_name: e.target.value
                        })}
                        value={this.state.new_sub_name}
                        type="text"
                        className="new_sub_name tab_input tab_input_sm"
                        placeholder="username" />
                    {/* phone */}
                    <input
                        onChange={e => this.setState({
                            ...this.state,
                            new_sub_phone: e.target.value
                        })}
                        value={this.state.new_sub_phone}
                        type="mobile"
                        className="new_sub_name tab_input tab_input_sm"
                        placeholder="phone no." />
                </div>
                <div className='create-sub create px-1'>
                    <button
                        onClick={this.new_sub}
                        className="btn nbtn green">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </form>

        return (
            <div>
                <div className='text-muted'>
                    <div className="font-weight-bold p-3">Subscribers: {subs.length}</div>
                    <div className="subs">
                        {new_sub}
                        {subs_list}
                    </div>
                </div>
            </div>
        )
    }
}
