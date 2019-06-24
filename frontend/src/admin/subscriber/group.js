
import React, { Component } from 'react'
import Toolbar from './toolbar'
import faxios from '../../axios'; 

export default class group extends Component {
    axios = faxios()
    constructor(props) {
        super(props)
        this.state = {
            next: null,
            previous: null,
            results: [],
            page: 1,
            upload_subs: 0,
        }
    }

    componentDidMount = () => {
        this.get_subs()
    }

    get_subs = () => {
        this.axios.get(`api/group/${this.props.selected_group_id}/`)
            .then(d => {
                console.log(d.data)
                this.setState({
                    ...this.state,
                    ...d.data,
                    page: 1,
                    group_id: this.props.selected_group_id,
                })
            })
    }

    _unblock_subscriber  = (e,sub) => {
        e.preventDefault()
        this.axios.put(`api/all_subs/${sub.id}/`, {
            status: 'available',
            flag: false,
            email: sub.email,
            group: sub.group
        }).then(d => {
            this.get_subs() 
        })
    }

    flag_sub_handler = (e, sub) => {
        e.preventDefault()

        this.axios.delete(`api/subscribe/${sub.id}/`)
            .then(d => {
                console.log('flagged')
                if (this.state.results.length === 1 && this.state.page > 1) {
                    this.setState({
                        ...this.state,
                        page: this.state.page - 1
                    })// end of setstate
                }
                this.get_subs()
                this.props.update_groups()
            })
    }

    change_page = (e, id) => {
        e.preventDefault()
        let url
        let pgno = this.state.page


        if (id) {
            url = this.state.next
            pgno += 1
        } else if (!id) {
            url = this.state.previous
            pgno -= 1
        } else {
            return
        }

        this.axios.get(url)
            .then(d => {
                console.log(d)
                this.setState({
                    ...this.state,
                    ...d.data,
                    page: pgno
                })// end of setstate
            })
    }

    render() {
        // when user switch groups this will fire
        if (this.state.group_id !== this.props.selected_group_id) {
            this.get_subs()
        }

        let subs = this.state.results
        let subs_list = subs.map((sub, i) =>
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
                    onClick={e => this.flag_sub_handler(e, sub)}
                    className={`btn mx-1 nbtn red`}>
                    <i className='fa fa-trash'></i>
                </button>
            </div>
        )



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
                    <Toolbar
                        {...this.props}
                        get_subs={this.get_subs} />
                    {pagination}
                    {subs_list}
                    {this.state.results.length>10 ? pagination : null}
                </div>
            </div>
        )
    }
}
