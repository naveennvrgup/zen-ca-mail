import React, { Component } from 'react'
import axios from '../../axios'
import Toolbar from './toolbar'

export default class email extends Component {
    state = {
        results: [],
        page: 1,
        selected_category: 0
    }
    status_color = [
        'text-danger',
        'text-warning',
        'text-success'
    ]

    componentDidMount = () => {
        this.get_drafts()
    }

    get_drafts = () => {
        let url = `api/draft/?page=${this.state.page}&status=`
        if (this.state.selected_category > -1) {
            url += String(this.state.selected_category)
        }

        axios.get(url)
            .then(d => {
                d = d.data
                console.log(d)

                this.setState({
                    ...this.state,
                    ...d,
                    toolbar_render: !this.state.toolbar_render
                })
            })
    }

    deleteDraftHandler = (e, draftId) => {
        e.preventDefault()

        axios.delete('api/draft/' + draftId + '/')
            .then(d => {
                console.log(d.data)
                
                if(this.state.results.length===1 && this.state.page!==1){
                    this.setState({
                        ...this.state,
                        page: this.state.page-1
                    })// end of setstate
                }
                this.get_drafts()
            })
    }
    
        flagDraftHandler = (e,id) => {
            e.preventDefault()
            axios.put(`api/draft/${id}/`,{
                flag: true
            }).then(d=>{
                console.log(d.data)
                this.get_drafts()
            }) 
        }    

    send2EditHandler = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/admin/email/edit_email/${id}/`)
    }

    send2sent_mail_handler = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/admin/email/sent_email/${id}/`)
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

        axios.get(url)
            .then(d => {
                console.log(d)
                this.setState({
                    ...this.state,
                    ...d.data,
                    page: pgno
                })// end of setstate
            })
    }

    change_email_state = load => {
        this.setState({
            ...this.state,
            ...load
        })// end of setstate
    }

    render() {
        const btns_for_edit_mail = (p, i) =>
            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2EditHandler(e, p.id)}
                    className="btn nbtn mx-1 green">
                    <i className="fas fa-pen-alt"></i>
                </button>
                <button onClick={(e) => this.deleteDraftHandler(e, p.id)}
                    className="btn nbtn mx-1 red">
                    <i className="fas fa-trash"></i>
                </button>
            </div>

        const btns_for_sent_mail = (p, i) =>
            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2sent_mail_handler(e, p.id)}
                    className="btn nbtn mx-1 blue">
                    <i className="fas fa-glasses"></i>
                </button>
                <button onClick={(e) => this.flagDraftHandler(e, p.id)}
                    className="btn nbtn mx-1 red">
                    <i className="fas fa-times"></i>
                </button>
            </div>

        const btns2show = (p, i) => p.status>0 ? btns_for_sent_mail(p,i): btns_for_edit_mail(p,i)

        let createDraftView = (p, i) => (
            <div className='d-flex tab align-items-center justify-content-between email' key={p.id}>
                <div className='d-flex align-items-center mx-2 flex-grow-1'>
                    <div className={this.status_color[p.status]}>
                        <i className="fa fa-circle"></i>
                    </div>
                    <div className='srno mx-2 font-weight-bold'>{i + 1}</div>
                    <div className='subject mx-2 flex-grow-1'>{p.subject}</div>
                    <div className='date mx-2 text-muted'>({p.edited_on})</div>
                </div>
                <div>
                    {btns2show(p,i)}
                </div>
            </div >
        )

        let drafts = this.state.results
        drafts = drafts.map((draft, i) => createDraftView(draft, i))

        let category_names = ['Total','Drafts','Outbox','Sent']
        let selected_category_name = category_names[this.state.selected_category+1]

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
            <div className='emails px-5 pb-5'>
                <div className="mt-3 row">
                    <div className='col-md-9'>
                        {pagination}
                        {drafts}
                        {this.state.results.length > 10 ?
                            pagination : ''}
                    </div>
                    <div className="col-md-3">
                        <Toolbar
                            toolbar_render={this.state.toolbar_render}
                            get_drafts={this.get_drafts}
                            change_email_state={this.change_email_state}
                            selected_category = {this.state.selected_category} />
                    </div>
                </div>
            </div>
        )
    }
}
