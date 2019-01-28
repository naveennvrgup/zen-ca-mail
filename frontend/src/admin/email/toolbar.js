import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import faxios from '../../axios'; const axios = faxios()

class toolbar extends Component {
    state = {
    }

    update_toolbar = () => {
        axios('api/get_draft_categories_count/')
            .then(d => {
                console.log(d.data)
                this.setState({
                    ...this.state,
                    ...d.data
                })// end of setstate
            })
    }
    componentDidMount = async () => {
        this.update_toolbar()
    }

    componentWillReceiveProps = () => this.update_toolbar()


    newMailHandler = (e) => {
        e.preventDefault()
        axios.post('api/draft/', {
            subject: 'new draft'
        })
            .then(d => {
                console.log(d.data)
                this.props.history.push(`/admin/email/edit_email/${d.data.id}/`)
            })
    }

    change_email_category_handler = async (e, category) => {
        e.preventDefault()
        await this.props.change_email_state({
            selected_category: category,
            page: 1
        })
        this.props.get_drafts()
    }

    render() {
        let tabs = 'tab d-flex justify-content-between align-items-center btn '
        const is_selected_tab = tab_id => this.props.selected_category === tab_id ? 'active-tab' : ''

        return (
            <div className='email-toolbar'>
                <div className="text-right my-3">
                    <button
                        className="btn btn-success"
                        onClick={this.newMailHandler}>New Mail</button>
                </div>
                <div
                    onClick={e => this.change_email_category_handler(e, -1)}
                    className={tabs + is_selected_tab(-1)}>
                    <span className="font-weight-bold mx-2">All</span>
                    <span className='badge badge-pill badge-primary'>{this.state.total}</span>
                </div>
                <div
                    onClick={e => this.change_email_category_handler(e, 0)}
                    className={tabs + is_selected_tab(0)}>
                    <span className="font-weight-bold mx-2">Drafts</span>
                    <span className='badge badge-pill badge-danger'>{this.state.drafts}</span>
                </div>
                <div
                    onClick={e => this.change_email_category_handler(e, 1)}
                    className={tabs + is_selected_tab(1)}>
                    <span className="font-weight-bold mx-2">Outbox</span>
                    <span className='badge badge-pill badge-warning'>{this.state.outbox}</span>
                </div>
                <div
                    onClick={e => this.change_email_category_handler(e, 2)}
                    className={tabs + is_selected_tab(2)}>
                    <span className="font-weight-bold mx-2">Sent</span>
                    <span className='badge badge-pill badge-success'>{this.state.sent}</span>
                </div>
            </div>
        )
    }
}

export default withRouter(toolbar)
