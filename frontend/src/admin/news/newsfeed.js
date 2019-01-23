import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import axios from '../../axios'

export default class Newsfeed extends Component {
    state = {
        news: []
    }

    componentDidMount = () => {
        axios.get('api/news/')
            .then(d => {
                d = d.data
                console.log(d)
                this.setState({ news: d.filter(ele => ele.status === 0) })
            })
            .catch(e => console.error(e))
    }

    create = (event) => {
        event.preventDefault()
        axios.post('api/news/')
            .then(d => {
                this.props.history.push('/admin/news/' + d.data.id)
            })
    }

    delete = (e, newsId) => {
        e.preventDefault()

        if (!newsId) {
            newsId = e.target.parentElement.parentElement.dataset.sid;
        }

        axios.delete('api/news/' + newsId + '/')
            .then(d => {
                let temp = this.state.news.filter(i => {
                    return i.id !== Number(newsId)
                })

                this.setState({ news: temp })
            }).catch(e => console.error(e))
        console.log(newsId)
    }

    edit = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/admin/news/${id}/`)
    }

    render() {
        let news = this.state.news
        news = news.map((ele, i) => {
            return (
                <div className='d-flex align-items-center justify-content-between ele' key={ele.id}>
                    <div className='d-flex align-items-center'>
                        <div className='srno font-weight-bold'>{i + 1}</div>
                        <div className='subject'>{ele.subject}</div>
                        <div className='date'>({ele.edited_on})</div>
                    </div>

                    <div className='d-flex align-items-center'>
                        <button onClick={(e) => this.send2EditHandler(e, ele.id)}
                            className="btn edit">
                            <i className="fas fa-pen-alt"></i>
                        </button>
                        <button onClick={(e) => this.deleteeleHandler(e, ele.id)}
                            className="btn delete">
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                </div>
            )
        })

        return (
            <div id='news' className='p-5'>
                <div className="d-flex align-items-center justify-content-between">
                    <h1 className=''>Newsfeed</h1>
                    <div>
                        <button className="btn btn-success" onClick={this.create}>create</button>
                    </div>
                </div>

                <div className="d-flex text-muted">
                    <div className='p-3'>
                        <span className="font-weight-bold">Total news: </span>
                        {this.state.news.length}
                    </div>
                </div>

                <div className="mt-5"></div>
                <div>
                    {news}
                </div>
            </div>
        )
    }
}
