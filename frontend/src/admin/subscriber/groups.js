import React, { Component } from 'react'
import axios from '../../axios'
import Group from './group'

export default class subscriber extends Component {
    state = {
        groups: [],
        new_group_name: '',
    }

    componentDidMount = () => {
        axios.get('api/group/')
            .then(d => {
                d = d.data
                let group_all = d.filter(ele => ele.name === 'all')[0]

                console.log(d)
                this.setState({
                    groups: d,
                    selected_group_id: group_all.id,
                    selected_group_name: group_all.name
                })
            })
            .catch(e => console.error(e))
    }

    delete = (e, id) => {
        e.preventDefault()
        axios.delete(`api/group/${id}`)
            .then(d => {
                d = d.data
                this.setState({ groups: this.state.groups.filter(ele => ele.id !== id) })
            })
            .catch(e => console.error(e))
    }

    new_group = (e) => {
        e.preventDefault()
        if (!this.state.new_group_name) { return }
        axios.post(`api/group/`, {
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
            ...this.state,
            selected_group_id: group.id,
            selected_group_name: group.name
        })
    }

    render() {
        let groups = this.state.groups.map((group, i) =>
            <div className={'d-flex tab align-items-center '} key={i + 2}>
                {/* <div className='sno px-2 font-weight-bold'>{i + 2}</div> */}
                <div className='group-name px-2 flex-grow-1'
                    onClick={(e) => this.show_group(e, group)}
                >{group.name}</div>
                <div className="ml-2 badge badge-pill badge-secondary ">{group.subs}</div>
            </div>
        )

        let new_group =
            <form className={'d-flex tab align-items-center '} key={1}>
                {/* <div className='sno px-2 font-weight-bold'>{1}</div> */}
                <div className='flex-grow-1 pl-2'>
                    <input
                        onChange={e => this.setState({
                            ...this.state,
                            new_group_name: e.target.value
                        })}
                        value={this.state.new_group_name}
                        type="text"
                        className="new_group_name tab_input"
                        placeholder="create group"
                        autoFocus />
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
            <div className='subscribers p-5'>
                <div className="d-flex mb-3">
                    <h1 className=''>Showing group '{this.state.selected_group_name}'</h1>
                </div>
                <div className="subs row">
                    <div className="col-md-9">
                        {
                            this.state.selected_group_id ?
                                <Group selected_group_id={this.state.selected_group_id} /> :
                                ''
                        }
                    </div>
                    <div className="col-md-3">
                        <div className='text-muted p-3'>
                            <span className="font-weight-bold">Total groups:</span>
                            <span>{this.state.groups.length}</span>
                        </div>
                        {new_group}
                        {groups}
                    </div>
                </div>
            </div >
        )
    }
}