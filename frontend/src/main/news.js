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
            console.log(d)
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
            <div className="slider mt-4">
                <div className='img'>
                    <img src={ele.img} alt="" />
                </div>
                <div className='info'>
                    <h4 className='hf'>
                        <span>{ele.title}</span>
                        <span>
                            <a href={ele.link} id='slider-link'>link</a>
                        </span>
                    </h4>
                    <p className="mt-4">
                        {ele.brief}
                    </p>
                </div>
            </div>
        )
    }

    render() {

        return (
            this.state.news.length ? <div className='news_main'>
                <h2 className="text-center hf">Newsfeed</h2>
                {this.curr_news(this.state.snid)}
            </div> : ''
        );
    }
}