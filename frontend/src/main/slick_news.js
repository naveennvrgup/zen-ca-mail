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
            if(d.length==1){
                d.push({
                    img: null,
                    title: 'Subscribe to our NewsLetter!',
                    brief: 'Stay tuned for important updates on Tax and Accounting via Email.'
                })
            }
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
            <div className="news_obj">

                <div className='img d-none d-lg-block'>
                    <img src={ele.img} alt="" />
                </div>
                <div className='info'>
                    <h4 className='hf'>
                        <span>
                            {ele.link ? <a
                                rel="noopener noreferrer"
                                target='_blank'
                                className="text-primary mx-2"
                                href={ele.link} >
                                <i className="fa fa-link"></i>
                            </a> : ''}
                        </span>
                        <span>{ele.title}</span>
                    </h4>
                    <p className="mt-3 w-100">
                        {ele.brief}
                    </p>
                </div>
            </div>
        </div>
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 2000,
            autoplaySpeed: 3000,
            slidesToShow: 2,
            autoplay: true,
            slidesToScroll: 1,
            cssEase: "linear",
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 780,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                    }
                },
            ]
        };


        const news_list = this.state.newss.map((ele, i) =>
            <div key={i}>
                {ele}
            </div>
        )

        return (
            <div className='container mt-4' id='news'>
                <Slider {...settings}>
                    {news_list}
                </Slider>
            </div>
        );
    }
}