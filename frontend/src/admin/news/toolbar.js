import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import faxios from '../../axios'; 

class toolbar extends Component {
    axios = faxios()
    state = {
    }

    update_toolbar = () => {
        this.axios.get('api/get_news_categories_count/')
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

    // on recieving the new props update the toolbar 
    componentWillReceiveProps = () => this.update_toolbar()

    // when user click the new news btn creata empty news and divert the user to it
    newNewsHandler = (e) => {
        e.preventDefault()
        this.axios.post('api/news/', {
            title: 'new news',
            brief: 'body goes here'
        })
            .then(d => {
                console.log(d.data)
                this.props.history.push(`/admin/news/edit_news/${d.data.id}/`)
            })
    }

    change_news_category_handler = async (e, category) => {
        e.preventDefault()
        await this.props.change_news_state({
            selected_category: category,
            page: 1
        })
        this.props.get_news()
    }

    render() {
        let tabs = 'tab d-flex justify-content-between align-items-center btn '
        const is_selected_tab = tab_id => this.props.selected_category === tab_id ? 'active-tab' : ''

        return (
            <div className='news-toolbar'>
                <div className="text-right my-3">
                    <button
                        className="btn btn-success"
                        onClick={this.newNewsHandler}>Create news</button>
                </div>
                <div
                    onClick={e => this.change_news_category_handler(e, -1)}
                    className={tabs + is_selected_tab(-1)}>
                    <span className="font-weight-bold mx-2">All</span>
                    <span className='badge badge-pill badge-primary'>{this.state.total}</span>
                </div>
                <div
                    onClick={e => this.change_news_category_handler(e, 0)}
                    className={tabs + is_selected_tab(0)}>
                    <span className="font-weight-bold mx-2">Displayed</span>
                    <span className='badge badge-pill badge-success'>{this.state.displayed}</span>
                </div>
                <div
                    onClick={e => this.change_news_category_handler(e, 1)}
                    className={tabs + is_selected_tab(1)}>
                    <span className="font-weight-bold mx-2">Archieved</span>
                    <span className='badge badge-pill badge-danger'>{this.state.archieved}</span>
                </div>
            </div>
        )
    }
}

export default withRouter(toolbar)
