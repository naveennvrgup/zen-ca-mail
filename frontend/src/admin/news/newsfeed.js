import React, { Component } from 'react'
import Toolbar from './toolbar'
import faxios from '../../axios'; 

export default class news extends Component {
    axios = faxios()
    state = {
        results: [], // keeps the list of new objects
        page: 1, // keeps track of pages
        selected_category: -1 // -1 refers to category all
    }

    componentDidMount = () => {
        this.get_news()
    }

    get_news = () => {
        let url = `api/news/?page=${this.state.page}&show=`
        if (this.state.selected_category !== -1) {
            url += this.state.selected_category === 0 ? 1 : 0 // 1 for displayed news and 0 for archieved news
        }

        this.axios.get(url)
            .then(d => {
                d = d.data
                console.log(d)

                this.setState({
                    ...this.state,
                    ...d,
                    toolbar_render: !this.state.toolbar_render // this is to trigger toolbar rerender
                })
            })
    }

    flagNewsHandler = (e, id) => {
        e.preventDefault()

        if (!this.state.results.length && this.state.page > 1) {
            this.setState({
                ...this.state,
                page: this.state.page - 1
            })// end of setstate
        }

        this.axios.patch(`api/news/${id}/`, {
            flag: true,
            show: false
        }).then(d => {
            console.log(d.data)
            this.get_news()
        })
    }

    archieve_it_Handler = (e, id) => {
        e.preventDefault()
        this.axios.patch(`api/news/${id}/`, {
            show: false
        }).then(d => {
            this.get_news()
        })
    }

    display_it_Handler = (e, id) => {
        e.preventDefault()
        this.axios.patch(`api/news/${id}/`, {
            show: true
        }).then(d => {
            this.get_news()
        })
    }

    send2EditHandler = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/admin/news/edit_news/${id}/`)
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

    change_news_state = load => {
        this.setState({
            ...this.state,
            ...load
        })// end of setstate
    }

    render() {
        const show_true = (p, i) =>
            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2EditHandler(e, p.id)}
                    className="btn nbtn mx-1 blue">
                    <i className="fas fa-pen-alt"></i>
                </button>
                <button onClick={(e) => this.archieve_it_Handler(e, p.id)}
                    className="btn nbtn mx-1 red">
                    <i className="fas fa-times"></i>
                </button>
            </div>

        const show_false = (p, i) =>
            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2EditHandler(e, p.id)}
                    className="btn nbtn mx-1 blue">
                    <i className="fas fa-pen-alt"></i>
                </button>
                <button onClick={(e) => this.display_it_Handler(e, p.id)}
                    className="btn nbtn mx-1 blue">
                    <i className="fas fa-check"></i>
                </button>
            </div>

        const btns = (p, i) => p.show ? show_true(p, i) : show_false(p, i)

        let createDraftView = (p, i) => (
            <div className='d-flex flex-wrap tab align-items-center justify-content-between news' key={p.id}>
                <div className='d-flex ml-auto flex-wrap align-items-center mx-2 flex-grow-1'>
                    <div className={p.show ? 'text-success' : 'text-danger'}>
                        <i className="fa fa-circle"></i>
                    </div>
                    <div className='srno mx-2 font-weight-bold'>{i + 1}</div>
                    <div className='subject mx-2 flex-grow-1'>{p.title}</div>
                    <div className='date mx-2 text-muted'>({p.created_on.slice(0, 10)})</div>
                </div>
                <div>
                    {btns(p, i)}
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
                    <div className="col-md-3 order-1 order-md-2">
                        <Toolbar
                            toolbar_render={this.state.toolbar_render}
                            get_news={this.get_news}
                            change_news_state={this.change_news_state}
                            selected_category={this.state.selected_category} />
                    </div>
                </div>
            </div>
        )
    }
}
