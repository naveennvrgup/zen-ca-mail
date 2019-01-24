import React, { Component } from 'react'
import axios from '../../axios'

export default class subscriber extends Component {
    state = {
        group: {
            name: 'loading',
            subs: []
        },

    }

    componentDidMount = () => {
        let id = this.props.match.params.id
        axios.get(`api/group/${id}/`)
            .then(d => {
                d = d.data
                console.log(d)
                this.setState({ subs: d })
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

    render() {
        let subs = this.state.group.subs.map((sub, i) =>
            <div className={'d-flex sub align-items-center'} key={i}>
                {/* <div className='face'><i className="fa fa-circle"></i></div>
                <div className='name'>{p.name}</div>
                <div className='mobile'>{p.mobile}</div>
                <div className='email'>{p.email}</div>
                <div className='cross align-self-stretch'>
                    <button onClick={this.flagSubHandler} data-id={p.id}>
                        {p.flag ?
                            <i className="fas fa-check" data-id={p.id}></i> :
                            <i className="fas fa-times" data-id={p.id}></i>}
                    </button>
                </div> */}
            </div>
        )

        let new_sub =
            <div className={'d-flex sub align-items-center'} key={this.state.group.subs.length + 1}>
                <div className='cross align-self-stretch'>
                    <button
                        className='nbtn green'
                        onClick={this.create_sub_handler}>
                        <i className="fa fa-plus"></i>
                    </button>
                </div>
            </div>

        return (
            <div className='subscribers p-5'>
                <div className="d-flex">
                    <h1 className=''>Group: {this.state.group.name}</h1>
                </div>
                <div className="d-flex text-muted">
                    <div className='p-3'><span className="font-weight-bold">Total:</span> {this.state.group.subs.length}</div>
                </div>
                <div className="subs mt-5">
                    {new_sub}
                    {/* {subs} */}
                </div>
            </div >
        )
    }
}

