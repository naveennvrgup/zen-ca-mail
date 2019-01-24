import React, { Component } from 'react'
import axios from '../../axios'

export default class subscriber extends Component {
    state = {
        groups: [],
        new_group_name: '',
    }

    componentDidMount = () => {
        axios.get('api/group/')
            .then(d => {
                d = d.data
                console.log(d)
                this.setState({ groups: d })
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

    render() {
        let groups = this.state.groups.map((group, i) =>
            <div className={'d-flex tab align-items-center '} key={i + 2}>
                <div className='sno px-2 font-weight-bold'>{i + 2}</div>
                <div className='name px-2 flex-grow-1'>
                    <span>{group.name}</span>
                    <span className="ml-2 badge badge-pill badge-secondary ">{group.subs}</span>
                </div>
                <div className='view px-2'>
                    <button
                        onClick={() => this.props.history.push(`/admin/group/${group.id}/`)}
                        className="btn nbtn blue">
                        <i className="fa fa-glasses"></i>
                    </button>
                </div>
                <div className='delete px-2'>
                    <button
                        disabled={group.name === 'all' ? true : false}
                        onClick={(e) => this.delete(e, group.id)}
                        className="btn nbtn red">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        )

        let new_group =
            <form className={'d-flex tab align-items-center '} key={1}>
                <div className='sno px-2 font-weight-bold'>{1}</div>
                <div className='flex-grow-1 pl-2'>
                    <input
                        onChange={e => this.setState({
                            ...this.state,
                            new_group_name: e.target.value
                        })}
                        value={this.state.new_group_name}
                        type="text"
                        className="new_group_name tab_input"
                        placeholder="Name"
                        autoFocus />
                </div>
                <div className='delete px-2'>
                    <button
                        onClick={this.new_group}
                        className="btn nbtn green">
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </form>

        return (
            <div className='subscribers p-5'>
                <div className="d-flex">
                    <h1 className=''>Subscriber Groups</h1>
                </div>
                <div className="d-flex text-muted">
                    <div className='p-3'><span className="font-weight-bold">Total:</span> {this.state.groups.length}</div>
                </div>
                <div className="subs ">
                    {new_group}
                    {groups}
                </div>
            </div >
        )
    }
}