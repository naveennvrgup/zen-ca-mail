import React, { Component } from "react";
import fuser, { burl } from '../axios'

export default class SimpleSlider extends Component {
    state = {
        news: [],
        snid: 0
    }

    axios = fuser()

    componentDidMount = () => {
        this.slider = document.querySelector('.slider')
        this.mouse_on_slider = false

        this.slider.addEventListener('mouseover', () => {
            this.mouse_on_slider = true
            // console.log('mouse over');
        })

        this.slider.addEventListener('mouseout', () => {
            this.mouse_on_slider = false
            // console.log('mouse out');
        })

        this.axios.get('/api/get_news/').then(d => {
            d = d.data
            d = d.map(ele => this.html_news(ele))
            console.log(d)
            this.setState({
                ...this.state,
                news: d
            })// end of setstate
        })

        setInterval(() => {
            if(this.mouse_on_slider){
                return
            }
            this.change_news_handler({}, 1)
        }, 3000);
    }

    html_news = ele => {
        let temp_img = require('../assets/news_placeholder.jpeg')

        if (ele.img) {
            temp_img = burl + ele.img.slice(1, ele.img.length)
        }

        ele.img = temp_img
        return <div className="wrapper">
            <div className='img'>
                <img src={ele.img} alt="" />
            </div>
            <div className='info'>
                <h4 className='hf'>
                    <span>{ele.title}</span>
                    <span>
                        {ele.link ? <a
                            rel="noopener noreferrer"
                            target='_blank'
                            href={ele.link} id='slider-link'>link</a> : ''}
                    </span>
                </h4>
                <p className="mt-4">
                    {ele.brief}
                </p>
            </div>
        </div>
    }

    change_news_handler = (e, inc) => {
        let len = this.state.news.length
        let new_snid = (this.state.snid + inc) % len
        if (new_snid < 0) {
            new_snid = len - 1
        }
        console.log(new_snid);
        this.setState({
            ...this.state,
            snid: new_snid
        })// end of setstate
    }

    render() {

        return (
            <div className='news_main'>
                <h2 className="text-center hf">Newsfeed</h2>
                <div className="slider mt-4">
                    {this.state.news[this.state.snid]}
                    <div className="controls mt-3">
                        <button
                            onClick={e => this.change_news_handler(e, -1)}
                            className='btn nbtn'>
                            <i className="fa fa-angle-left"></i>
                        </button>
                        <button
                            onClick={e => this.change_news_handler(e, 1)}
                            className='btn nbtn'>
                            <i className="fa fa-angle-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}