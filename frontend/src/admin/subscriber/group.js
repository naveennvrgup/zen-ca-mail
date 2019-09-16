import React, { Component } from 'react'
import Toolbar from './toolbar'
import faxios from '../../axios';


// redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import * as actions from './actions'

class Group extends Component {
    axios = faxios()
    
    state = {

    }

    static propTypes = {
        subscribers: PropTypes.array.isRequired,
    }

    componentDidMount = () => {
        // this.get_subs()
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
                    onClick={e => this._edit_subscriber(e, sub.id)}
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
            if (sub.onedit === true) {
                return edit_subscriber_html(sub, i)
            } else {
                return show_subscriber_html(sub, i)
            }
        })

        let pagination =
            <div className="d-flex justify-content-between align-items-center">
                <div className="font-weight-bold p-3">Subscribers: {this.state.count}</div>
                <div className="sub-pagination pagination">
                    <span className='mx-1'>
                        Page {this.state.page}
                    </span>
                    <button
                        disabled={this.state.previous ? false : true}
                        onClick={e => this.change_page(e, 0)}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-left"></i>
                    </button>
                    <button
                        disabled={this.state.next ? false : true}
                        onClick={e => this.change_page(e, 1)}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-right"></i>
                    </button>
                </div>
            </div>

        return (
            <div>
                <div className=''>
                    <Toolbar />
                    {pagination}
                    {subs_list}
                    {/* {this.state.results.length > 10 ? pagination : null} */}
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => state.subscribers

export default connect(mapStateToProps, actions)(Group)