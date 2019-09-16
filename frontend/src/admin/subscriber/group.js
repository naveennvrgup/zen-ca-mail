import React, { Component, Fragment } from 'react'
import Toolbar from './toolbar'
import faxios from '../../axios';
import { loader } from '../../spinner'

// redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions'

class Group extends Component {
    axios = faxios()

    state = {
        edit: {}
    }

    static propTypes = {
        subscribers: PropTypes.array.isRequired,
    }

    _unblock_subscriber = (e, sub) => {
        e.preventDefault()
        
        this.props.set_loading(true)
        faxios().put(`api/all_subs/${sub.id}/`, {
            status: 'available',
            flag: false,
            email: sub.email,
            name: sub.name,
            mobile: sub.mobile,
            group: sub.group
        }).then(d => {
            this.setState({
                edit: {
                    ...this.state.edit,
                    [sub.id]: null
                }
            })
            this.props.get_subs()
        })
    }
    
    _delete_subscriber = (e, sub) => {
        e.preventDefault()
        
        this.props.set_loading(true)
        faxios().delete(`api/all_subs/${sub.id}/`)
            .then(d => {
                console.log('flagged')
                if (this.props.subscribers.length === 1 && this.props.page > 1) {
                    this.props.get_subs(null,this.props.page_no-1)
                }else{
                    this.props.get_subs(null,this.props.page_no)
                }
            })
    }
    
    
    _edit_subscriber = (e, sub) => {
        e.preventDefault()
    
        this.setState({
            edit: {
                ...this.state.edit,
                [sub.id]: sub
            }
        })

        // console.log(subs)
    }
    
    _edit_sub_change = (e, inputname, sub_id) => {
        e.preventDefault()
    
        let edit = this.state.edit
        edit[sub_id][inputname] = e.target.value
        this.setState({edit})
    }


    render() {
        let show_subscriber_html = (sub, i) =>
            <div className={'d-flex  tab align-items-center '} key={i + 1}>
                <div className='sub_sno px-2 font-weight-bold'>{i + 1}</div>
                <div className='sub_phone px-2'>
                    <i className={`fa fa-circle ${sub.status === 'available' ? 'text-success' : 'text-danger'}`}></i>
                </div>
                <div className='sub_email px-2'>{sub.email}</div>
                <div className='sub_name px-2'>{sub.name}</div>
                <div className='sub_phone px-2 flex-grow-1'>{sub.mobile}</div>
                {sub.status !== 'available' ? <button
                    onClick={e => this._unblock_subscriber(e, sub)}
                    className={`btn mx-1 nbtn green`}>
                    <i className='fa fa-check'></i>
                </button> : null}
                <button
                    onClick={e => this._edit_subscriber(e, sub)}
                    className={`btn mx-1 nbtn blue`}>
                    <i className='fa fa-pen'></i>
                </button>
                <button
                    onClick={e => this._delete_subscriber(e, sub)}
                    className={`btn mx-1 nbtn red`}>
                    <i className='fa fa-trash'></i>
                </button>
            </div>

        let edit_subscriber_html = (sub, i) =>
            <div className={'d-flex  tab align-items-center '} key={i + 1}>
                <div className='sub_sno px-2 font-weight-bold'>{i + 1}</div>
                <div className='sub_phone px-2'>
                    <i className={`fa fa-circle ${sub.status === 'available' ? 'text-success' : 'text-danger'}`}></i>
                </div>
                <div className='sub_email px-2'><input type="email" placeholder='Email' onChange={e => this._edit_sub_change(e, 'email', sub.id)} value={sub.email} /></div>
                <div className='sub_name px-2'><input type="text" placeholder='Name' onChange={e => this._edit_sub_change(e, 'name', sub.id)} value={sub.name} /></div>
                <div className='sub_phone px-2 flex-grow-1'><input type="text" placeholder='Phone no.' onChange={e => this._edit_sub_change(e, 'mobile', sub.id)} value={sub.mobile} /></div>
                <button
                    onClick={e => this._unblock_subscriber(e, sub)}
                    className={`btn mx-1 nbtn green`}>
                    <i className='fa fa-check'></i>
                </button>
            </div>


        let subs_list = this.props.subscribers.map((sub, i) => {
            if (this.state.edit[sub.id]) {
                return edit_subscriber_html(this.state.edit[sub.id], i)
            } else {
                return show_subscriber_html(sub, i)
            }
        })

        let pagination =
            <div className="d-flex justify-content-between align-items-center">
                <div className="font-weight-bold p-3">Subscribers: {this.props.subscribers.length}</div>
                <div className="sub-pagination pagination">
                    <span className='mx-1'>
                        Page {this.props.page_no}
                    </span>
                    <button
                        disabled={this.props.previous ? false : true}
                        onClick={e => {
                            this.props.set_loading(true)
                            this.props.get_subs(null, this.props.page_no - 1)
                        }}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-left"></i>
                    </button>
                    <button
                        disabled={this.props.next ? false : true}
                        onClick={e => {
                            this.props.set_loading(true)
                            this.props.get_subs(null, this.props.page_no + 1)
                        }}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-right"></i>
                    </button>
                </div>
            </div>

        return (
            <div>
                <div className=''>
                    <Toolbar />
                    {this.props.loading ? loader : <Fragment>
                        {pagination}
                        {subs_list}
                        {this.props.subscribers.length > 10 ? pagination : null}
                    </Fragment>}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => state.subscribers

export default connect(mapStateToProps, actions)(Group)