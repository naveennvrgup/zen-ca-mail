import React, { Component } from "react";
import fuser, { burl } from '../axios'

export default class SimpleSlider extends Component {
    state = {
        news: [],
        snid: 0
    }

    axios = fuser()

    componentDidMount = () => {
        this.axios.get('/api/get_news/').then(d => {
            d = d.data
            this.setState({
                ...this.state,
                news: d
            })// end of setstate
        })
    }

    curr_news = (snid) => {
        const ele = this.state.news[snid]
        let temp_img = require('../assets/news_placeholder.jpeg')

        if (ele.img) {
            temp_img = burl + ele.img.slice(1, ele.img.length)
        }

        ele.img = temp_img

        return (
            <div className="slider-main ms_news">
                <div className='img'>
                    <img src={ele.img} alt="" />
                </div>
                <div className='info'>
                    <h4 className='hf'>{ele.title}</h4>
                </div>
            </div>
        )
    }

    render() {

        return (
            this.state.news.length ? <div className='news_main'>
                <div className="container">
                    <h2 className='hf text-center'>Newsfeed</h2>
                    <div className="slider mt-4">
                        {this.curr_news(this.state.snid)}
                    </div>
                </div>
            </div> : ''
        );
    }
}