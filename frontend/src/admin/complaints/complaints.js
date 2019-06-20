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
        let url = `api/complaint_mails/?page=${this.state.page}`

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


    _reactivate_sub = (e, sub) => {
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

        let createDraftView = (p, i) => (
            <div className='d-flex flex-wrap tab align-items-center justify-content-between news' key={p.id}>
                <div className='d-flex ml-auto flex-wrap align-items-center mx-2 flex-grow-1'>
                    <div className={p.show ? 'text-success' : 'text-danger'}>
                        <i className="fa fa-circle"></i>
                    </div>
                    <div className='srno mx-2 font-weight-bold'>{i + 1}</div>
                    <div className='subject mx-2 flex-grow-1'>{p.email}</div>
                    <div className='date mx-2 text-muted'>({p.created_on.slice(0, 10)})</div>
                </div>
                <div>
                    <button onClick={e => this._reactivate_sub(e,p)}  className="btn nbtn green">
                        <i className="fa fa-check"></i>
                    </button>
                </div>
            </div >
        )

        let news = this.state.results
        news = news.map((draft, i) => createDraftView(draft, i))

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
                        {news}
                        {this.state.results.length > 10 ?
                            pagination : ''}
                    </div>
                </div>
            </div>
        )
    }
}
