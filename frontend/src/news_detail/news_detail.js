import React, { Component } from 'react'
import Footer from '../main/footer'
import Navbar from './navbar'

export default class news_detail extends Component {
    news_id = this.props.match.params.news_id

    componentDidMount() {
        console.log(this.news_id)
    }
    
    
    
    render() {
        return (
            <div>
                <Navbar/>
                <div className="container">
                    news details
                </div>
                <Footer/>
            </div>
        )
    }
}
