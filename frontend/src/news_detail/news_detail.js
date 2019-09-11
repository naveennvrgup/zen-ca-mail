import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../main/footer'
import Navbar from './navbar'
import moduleName from '../spinner'
// import NewsCarousal from '../main/slick_news'
import faxios, { burl } from '../axios'

import './news_detail.scss'

export default class news_detail extends Component {
    news_id = this.props.match.params.news_id

    state = {}
    componentDidMount() {
        window.scrollTo(0, 0)

        faxios().get('/api/get_news/').then(d => {
            let news = d.data
            let selected_news = news.find(ele => ele.id == this.news_id)
            news = news.sort((a, b) => b.id - a.id).slice(0, 15)

            console.log(news, selected_news)
            this.setState({ news, selected_news })// end of setstate
        })
    }

    _change_news = news_id => {
        this.setState({
            selected_news: this.state.news.find(ele=>ele.id==news_id)
        })
    }


    render() {
        let news_detail = <div className="loader"><div className="lds-dual-ring"></div></div>
        let recent_news = null

        if (this.state.news) {
            news_detail = <Fragment>
                <h2 className="text-center font-weight-bold">{this.state.selected_news.title}</h2>
                <div className="text-center mt-4">
                    <img src={burl + this.state.selected_news.img} alt="news_detail_img" />
                </div>
                <p className='mt-4 text-justify'>
                    {this.state.selected_news.brief}
                </p>
                <div className="text-center">
                    <Link to={'/'} className="btn btn-primary">Return to homepage</Link>
                </div>
            </Fragment>

            recent_news = this.state.news.map(ele =>
                <div key={ele.id} className='mt-2 recent_news_item'>
                    <Link to={`/news_detail/${ele.id}/`} onClick={() => this._change_news(ele.id)} >
                        {ele.title}
                    </Link>
                    <div className="h_rule"></div>
                </div>
            )
        }

        return (
            <div id='news_details_page'>
                <Navbar />
                <div className="wrapper">
                    <div className="news_detail p-5 container">
                        <div className="row">
                            <div className="col-md-9">
                                {news_detail}
                            </div>
                            <div className="recent_news col-md-3">
                                <div className="font-weight-bold text-center">Recent News</div>
                                {recent_news}
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }
}
