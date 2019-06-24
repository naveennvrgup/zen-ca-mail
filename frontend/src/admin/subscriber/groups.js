import React, { Component } from 'react'
import Group from './group'
import faxios from '../../axios';

export default class subscriber extends Component {
    axios = faxios()
    state = {
        groups: [],
        new_group_name: '',
        selected_group_id: null,
        selected_group_name: 'Subscribers'
    }

    componentDidMount = () => {

        this.get_groups()
    }

    get_groups = () => {
        this.axios.get('api/group/')
            .then(d => {
                d = d.data
                let selected_group = d.filter(ele =>
                    ele.name === this.state.selected_group_name)[0]

                console.log(d, this.state, selected_group)
                this.setState({
                    groups: d,
                    selected_group_id: selected_group.id,
                    selected_group_name: selected_group.name
                })
            })
            .catch(e => console.error(e))
    }

    delete = (e, id) => {
        e.preventDefault()
        this.axios.delete(`api/group/${id}`)
            .then(d => {
                d = d.data
                this.setState({ groups: this.state.groups.filter(ele => ele.id !== id) })
            })
            .catch(e => console.error(e))
    }

    new_group = (e) => {
        e.preventDefault()
        if (!this.state.new_group_name) { return }
        this.axios.post(`api/group/`, {
            name: this.state.new_group_name
        })
            .then(d => {
                console.log(d.data)
                this.setState({
                    groups: [
                        ...this.state.groups,
                        d.data
                    ],
                    new_group_name: ''
                })
            })
            .catch(e => console.error(e))
    }

    show_group = (e, group) => {
        this.setState({
            selected_group_id: group.id,
            selected_group_name: group.name
        })
    }

    set_groups_state = load => {
        this.setState({
            ...load
        })// end of setstate
    }

    render() {
        let groups = this.state.groups.map((group, i) =>
            <div className={`d-flex tab align-items-center 
                ${group.id === this.state.selected_group_id ?
                    'active-tab' : ''}
            `
            } key={i + 2}>
                {/* <div className='sno px-2 font-weight-bold'>{i + 2}</div> */}
                <div className='group-name px-2 flex-grow-1'
                    onClick={(e) => this.show_group(e, group)}
                >{group.name}</div>
                <div className="ml-2 badge badge-pill badge-secondary ">{group.subs}</div>
            </div>
        )

        let new_group =
            <form className={'d-flex tab align-items-center new-group'} key={1}>
                {/* <div className='sno px-2 font-weight-bold'>{1}</div> */}
                <div className='flex-grow-1 pl-2'>
                    <input
                        onChange={e => this.setState({
                            new_group_name: e.target.value
                        })}
                        value={this.state.new_group_name}
                        type="text"
                        className="new_group_name tab_input"
                        placeholder="create group" />
                </div>
                <div className='create-group create px-1'>
                    <button
                        onClick={this.new_group}
                        className="btn nbtn green">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </form>

        return (
            <div className='subscribers '>
                <div className="subs row">
                    <div className="col-md-9 order-md-1 order-2">
                        {
                            this.state.selected_group_id ?
                                <Group
                                    set_groups_state={this.set_groups_state}
                                    update_groups={this.get_groups}
                                    selected_group_name={this.state.selected_group_name}
                                    selected_group_id={this.state.selected_group_id} /> :
                                ''
                        }
                    </div>
                    <div className="col-md-3 order-md-2 order-1 groups-container">
                        <div className='groups-list'>
                            <div className='text-muted p-3 font-weight-bold'>
                                Total groups: {this.state.groups.length}
                            </div>
                            {new_group}
                            {groups}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}