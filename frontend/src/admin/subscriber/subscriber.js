import React, { Component } from 'react'
import axios from '../../axios'

export default class subscriber extends Component {
    state = {
        groups: [],

    }

    componentDidMount = () => {
        axios.get('api/group/')
            .then(d => {
                d = d.data
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

    render() {
        let groups = this.state.groups.map((group, i) =>
            <div className={'d-flex tab align-items-center '} key={i}>
                <div className='sno px-2 font-weight-bold'>{i + 1}</div>
                <div className='name px-2 flex-grow-1'>{group.name}</div>
                <div className='view px-2'>
                    <button
                        onClick={() => this.props.history.push(`/admin/group/${group.id}/`)}
                        className="btn nbtn blue">
                        <i className="fa fa-glasses"></i>
                    </button>
                </div>
                <div className='delete px-2'>
                    <button
                        onClick={(e) => this.delete(e, group.id)}
                        className="btn nbtn red">
                        <i className="fa fa-trash"></i>
                    </button>
                </div>
            </div>
        )

        return (
            <div className='subscribers p-5'>
                <div className="d-flex">
                    <h1 className=''>Subscribers</h1>
                </div>
                <div className="d-flex text-muted">
                    <div className='p-3'><span className="font-weight-bold">Total:</span> {this.state.groups.length}</div>
                </div>
                <div className="subs mt-5">
                    {groups}
                </div>
            </div >
        )
    }
}

{/* <div className={'d-flex sub align-items-center ' + (p.flag ? 'inactive-sub' : 'active-sub')} key={i}>
    <div className='face'><i className="fa fa-circle"></i></div>
    <div className='name'>{p.name}</div>
    <div className='mobile'>{p.mobile}</div>
    <div className='email'>{p.email}</div>
    <div className='cross align-self-stretch'>
        <button onClick={this.flagSubHandler} data-id={p.id}>
            {p.flag ?
                <i className="fas fa-check" data-id={p.id}></i> :
                <i className="fas fa-times" data-id={p.id}></i>}
        </button>
    </div>
</div> */}