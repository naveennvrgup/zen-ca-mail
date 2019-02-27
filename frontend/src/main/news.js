import React, { Component } from "react";
import Slider from "react-slick";
import fuser, { burl } from '../axios'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default class SimpleSlider extends Component {
    state = {
        news: []
    }

    axios = fuser()

    componentDidMount = () => {
        this.axios.get('/api/get_news/').then(d => {
            d = d.data
            this.setState({
                ...this.state,
                news: d.map((ele, i) => this.news_html(ele, i))
            })// end of setstate
        })
    }

    news_html = (ele, i) => {
        ele.img = ele.img && ele.img.slice(1, ele.img.length)

        return (
            <div key={i} className="ms_news">
                <div className="row">
                    <div className="col-md-5">
                        <img src={burl + ele.img} alt="" />
                    </div>
                    <div className="col-md-7">
                        <h4 className='hf'>{ele.title}</h4>
                    </div>
                </div>
            </div>
        )
    }


    render() {
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        };
        return (
            <div className='news_main'>
                <div className="container">
                    <h2 className='hf text-center mb-5'>Newsfeed</h2>
                    <Slider {...settings}>
                        {this.state.news}
                    </Slider>
                </div>
            </div>
        );
    }
}