import React, { Component } from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import fuser, { burl } from '../axios'


export default class CenterMode extends Component {
    axios = fuser()
    state = {
        newss: []
    }

    componentDidMount() {
        this.axios.get('/api/get_news/').then(d => {
            d = d.data
            d = d.map(ele => this.html_news(ele))
            console.log(d)
            this.setState({
                ...this.state,
                newss: d
            })// end of setstate
        })
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
                <p className="mt-3">
                    {ele.brief}
                </p>
            </div>
        </div>
    }

    render() {
        const settings = {
            className: "center",
            centerMode: true,
            infinite: true,
            centerPadding: "60px",
            slidesToShow: 2,
            speed: 500
        };


        return (
            <div className='container'>
                <h2>Center Mode</h2>
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        );
    }
}