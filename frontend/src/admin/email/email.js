import React, { Component } from 'react'
import axios from '../../axios'
import Toolbar from './toolbar'

export default class email extends Component {
    state = {
        results: [],
        page: 1
    }
    status_color = [
        'text-danger',
        'text-warning',
        'text-success'
    ]

    componentDidMount = () => {
        axios.get('api/draft/')
            .then(d => {
                d = d.data
                console.log(d)

                d.results = d.results.filter(ele => ele.status == 0)
                this.setState({
                    ...this.state,
                    ...d
                })
            })
    }



    deleteDraftHandler = (e, draftId) => {
        e.preventDefault()

        if (!draftId) {
            draftId = e.target.parentElement.parentElement.dataset.sid;
        }

        axios.delete('api/draft/' + draftId + '/')
            .then(d => {
                let temp = this.state.drafts.filter(i => {
                    return i.id !== Number(draftId)
                })

                this.setState({ drafts: temp })
            }).catch(e => console.error(e))
        console.log(draftId)
    }


    send2EditHandler = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/admin/email/${id}/`)
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

    createDraftView = (p, i) => (
        <div className='d-flex tab align-items-center justify-content-between email' key={p.id}>
            <div className='d-flex align-items-center mx-2 flex-grow-1'>
                <div className={this.status_color[p.status]}>
                    <i className="fa fa-circle"></i>
                </div>
                <div className='srno mx-2 font-weight-bold'>{i + 1}</div>
                <div className='subject mx-2 flex-grow-1'>{p.subject}</div>
                <div className='date mx-2 text-muted'>({p.edited_on})</div>
            </div>

            <div className='d-flex align-items-center'>
                <button onClick={(e) => this.send2EditHandler(e, p.id)}
                    className="btn nbtn mx-1 green">
                    <i className="fas fa-pen-alt"></i>
                </button>
                <button onClick={(e) => this.deleteDraftHandler(e, p.id)}
                    className="btn nbtn mx-1 red">
                    <i className="fas fa-times"></i>
                </button>
            </div>
        </div >
    )

    render() {
        let drafts = this.state.results
        drafts = drafts.map((draft, i) => this.createDraftView(draft, i))

        let pagination =
            <div className="d-flex justify-content-between align-items-center">
                <div className="font-weight-bold p-3">Drafts: {this.state.count}</div>
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
                        <Toolbar {...this.state} />
                        {pagination}
                        {drafts}
                        {this.state.results.length > 10 ?
                            pagination : ''}
                    </div>
                    <div className="col-md-3">
                        <button
                            className="btn btn-success"
                            onClick={this.newMailHandler}>New Mail</button>
                    </div>
                </div>
            </div>
        )
    }
}
