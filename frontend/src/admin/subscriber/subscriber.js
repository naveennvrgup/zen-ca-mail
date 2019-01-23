import React, { Component } from 'react'
import axios from '../../axios'

export default class subscriber extends Component {
    state = {
        subs: [],

    }

    componentDidMount = () => {
        axios.get('api/subscriber/')
            .then(d => {
                d = d.data
                this.setState({ subs: d })
            })
            .catch(e => console.error(e))
    }

    flagSubHandler = (e) => {
        e.preventDefault()
        // debugger
        let id = e.target.dataset.id
        
        axios.post('api/flagSub/',{id})
            .then(d=>{
                let subs = this.state.subs.map(ele=>{
                    if(ele.id===d.data.id){
                        ele.flag=d.data.flag
                    }
                    return ele
                })
                
                this.setState({
                    ...this.state,
                    subs
                })
            })
    }

    createSub = (p, i) => (
        <div className={'d-flex sub align-items-center ' + (p.flag ? 'inactive-sub' : 'active-sub')} key={i}>
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
        </div>
    )

    render() {
        let subs = this.state.subs.map((sub, i) => this.createSub(sub, i))

        return (
            <div className='subscribers p-5'>
                <div className="d-flex">
                <h1 className=''>Subscribers</h1>
                </div>
                <div className="d-flex text-muted">
                    <div className='p-3'><span className="font-weight-bold">Active:</span> {this.state.subs.filter(ele=>!ele.flag).length}</div>
                    <div className='p-3'><span className="font-weight-bold">Unactive:</span> {this.state.subs.filter(ele=>ele.flag).length}</div>
                    <div className='p-3'><span className="font-weight-bold">Total:</span> {this.state.subs.length}</div>
                </div>
                <div className="subs mt-5">
                    {subs}
                </div>
            </div >
        )
    }
}
