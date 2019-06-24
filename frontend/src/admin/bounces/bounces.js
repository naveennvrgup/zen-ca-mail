import React, { Component } from 'react'
import faxios from '../../axios'; 

export default class news extends Component {
    axios = faxios()
    state = {
        results: [], // keeps the list of new objects
        page: 1, // keeps track of pages
        selected_category: -1 // -1 refers to category all
    }

    componentDidMount = () => {
        this.get_records()
    }

    get_records = () => {
        let url = `api/bounced_mails/?page=${this.state.page}`

        this.axios.get(url)
            .then(d => {
                d = d.data
                console.log(d)

                this.setState({
                    ...this.state,
                    ...d,
                })
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

    _unblock_subscriber  = (e,sub) => {
        e.preventDefault()
        this.axios.put(`api/all_subs/${sub.id}/`, {
            status: 'available',
            flag: false,
            email: sub.email,
            group: sub.group
        }).then(d => {
            this.get_records() 
        })
    }     

    _edit_subscriber = (e,sub_id) => {
        e.preventDefault()

        let subs = this.state.results
        const selected_sub_index = subs.findIndex(sub => sub.id===sub_id)
        subs[selected_sub_index].onedit = true
        this.setState({
            results: subs
        })

        console.log(subs)
    }

    _edit_sub_change = (e, inputname, sub_id) => {
        e.preventDefault()

        let subs = this.state.results
        const selected_sub_index = subs.findIndex(sub => sub.id===sub_id)
        subs[selected_sub_index][inputname] = e.target.value
        this.setState({
            results: subs
        })
    }

    _delete_subscriber = (e, sub) => {
        e.preventDefault()

        this.axios.delete(`api/all_subs/${sub.id}/`)
            .then(d => {
                console.log('flagged')
                if (this.state.results.length === 1 && this.state.page > 1) {
                    this.setState({
                        ...this.state,
                        page: this.state.page - 1
                    })// end of setstate
                }
                this.get_records()
            })
    }

    render() {

        let show_subscriber_html =  (sub,i) =>       
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

        let edit_subscriber_html = (sub,i) =>    
        <div className={'d-flex  tab align-items-center '} key={i + 1}>
            <div className='sub_sno px-2 font-weight-bold'>{i + 1}</div>
            <div className='sub_phone px-2'>
                <i className={`fa fa-circle ${sub.status === 'available' ? 'text-success' : 'text-danger'}`}></i>
            </div>
            <div className='sub_email px-2'><input type="email" placeholder='Email' onChange={e=>this._edit_sub_change(e,'email', sub.id)} value={sub.email}/></div>
            <div className='sub_name px-2'><input type="text" placeholder='Name' onChange={e=>this._edit_sub_change(e,'name', sub.id)} value={sub.name}/></div>
            <div className='sub_phone px-2 flex-grow-1'><input type="text" placeholder='Phone no.' onChange={e=>this._edit_sub_change(e,'mobile', sub.id)} value={sub.mobile}/></div>
            <button
                onClick={e => this._unblock_subscriber(e, sub)}
                className={`btn mx-1 nbtn green`}>
                <i className='fa fa-check'></i>
            </button>
        </div>


        let subs = this.state.results
        let subs_list = subs.map((sub, i) => {
            if(sub.onedit === true){
                return edit_subscriber_html(sub,i)
            }else {
                return show_subscriber_html(sub,i)
            }
        })

        let category_names = ['Total', 'Displayed', 'Archieved']
        let selected_category_name = category_names[this.state.selected_category + 1]

        let pagination =
            <div className="d-flex justify-content-between align-items-center">
                <div className="font-weight-bold p-3">{selected_category_name}: {this.state.count}</div>
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
            <div className='newss'>
                <div className="row">
                    <div className='col-md-9 order-2 order-md-1'>
                        {pagination}
                        {subs_list}
                        {this.state.results.length > 10 ?
                            pagination : ''}
                    </div>
                </div>
            </div>
        )
    }
}
