import React, { Component, Fragment } from 'react'
import GSTlinks from './gstlinks'
import pdf from '../admin/pdf/pdf_list'
import faxios from '../axios'
import { loader } from '../spinner'

const date_format = (date) => date.slice(8, 10) + '-' + date.slice(5, 7) + '-' + date.slice(0, 4)


export default class Resources extends Component {
    state = {
        loading: true,
        results: [],
    }

    componentDidMount() {
        faxios().get('/api/pdf5/').then(d => {
            let temp = document.querySelector('.gstlink').scrollHeight * 4
            console.log(temp)

            this.setState({
                results: d.data.sort((a,b)=>b.id-a.id),
                loading: false
            })

            setTimeout(() => {
                this.pdfs.height = temp + 'px'
            }, 100);
        })
    }

    render() {
        let pdfs = this.state.results.map((ele, i) =>
            <div className='text-center' key={ele.id}>
                <hr className='my-2' />
                <a target='_blank' href={ele.document} className='subject font-weight-bold'>{ele.title}</a>
                <span className='date text-muted '>({date_format(ele.created_on)})</span>
            </div >
        )

        if (this.state.loading) {
            pdfs = loader
        }

        return (
            <div className="resources py-4">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-4" >
                            <GSTlinks />
                        </div>
                        <div className="col-md-6 tab">
                            <h4 className="text-center my-3 font-weight-bold">GST Updates</h4>
                            <marquee
                                scrollamount='8'
                                ref={e => this.pdfs = e}
                                onMouseOver={e => this.pdfs.stop()}
                                onMouseOut={e => this.pdfs.start()}
                                direction="up">
                                {pdfs}
                            </marquee>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
