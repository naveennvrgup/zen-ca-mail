import React, { Component } from 'react'
import faxios from '../../axios'
import { loader } from '../../spinner'

export default class pdf extends Component {
    state = {
        loading: true,
        results: []
    }

    componentDidMount() {
        this.get_data()
    }

    get_data = (page) => {
        let url

        switch (page) {
            case 'next':
                url = this.state.next
                break
            case 'previous':
                url = this.state.previous
                break
            default: 
                url = '/api/pdf/'
                if(this.state.current_page){
                    url = `/api/pdf/?page=${this.state.current_page}`
                }
        }

        this.setState({loading: true})
        faxios().get(url).then(d => {
            this.setState({
                ...d.data,
                loading: false
            })
        })
    }

    _download = id => {
        pdf = this.state.results.find(ele => ele.id === id)
        
        let link = document.createElement("a");
        link.href = pdf.document;
        link.target = '_blank'
        link.click();
        
    }

    _delete = id => {
        faxios().delete(`/api/delete/${id}/`).then(d=>{
            if(this.state.results.length==1 && this.state.previous){
                this.get_data('previous')
            }else{
                this.get_data()
            }
        })
    }


    render() {
        if (this.state.loading) {
            return loader
        }

        const pdfs = this.state.results.map((ele,i) =>
            <div className='d-flex flex-wrap tab align-items-center justify-content-between news' key={ele.id}>
                <div className='d-flex ml-auto flex-wrap align-items-center mx-2 flex-grow-1'>
                    <div className='srno mx-2 font-weight-bold'>{i + 1}</div>
                    <div className='subject mx-2 flex-grow-1'>{ele.title}</div>
                    <div className='date mx-2 text-muted'>({ele.created_on.slice(0, 10)})</div>
                    <button onClick={(e) => this._download(ele.id)}
                        className="btn nbtn mx-1 blue">
                        <i className="fas fa-arrow-down"></i>
                    </button>
                    <button onClick={(e) => this._delete(ele.id)}
                        className="btn nbtn mx-1 red">
                        <i className="fas fa-trash"></i>
                    </button>
                </div>
            </div >
        )


        let pagination =
            <div className="d-flex justify-content-between align-items-center">
                <div className="font-weight-bold p-3">Total: {this.state.count}</div>
                <div className="sub-pagination pagination">
                    <span className='mx-1'>
                        Page {this.state.current_page}
                    </span>
                    <button
                        disabled={this.state.previous ? false : true}
                        onClick={e => this.get_data('previous')}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-left"></i>
                    </button>
                    <button
                        disabled={this.state.next ? false : true}
                        onClick={e => this.get_data('next')}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-right"></i>
                    </button>
                </div>
            </div>


        return (
            <div>
                {pagination}
                {pdfs}
                {pagination}
            </div>
        )
    }
}
