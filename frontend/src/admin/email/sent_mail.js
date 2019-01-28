import React, { Component } from 'react'
import axios from '../../axios'

export default class sent_mail extends Component {
    state = {
    }

    componentDidMount = () => {
        this.draftId = this.props.match.params.id
        axios.get(`api/draft/${this.draftId}/`)
            .then(d => {
                console.log(d.data)
                this.setState({
                    ...this.state,
                    ...d.data
                })// end of setstate
            })
    }


    render() {
        return (
            <div className='p-5'>
                <div>
                    <button
                        onClick={this.props.history.goBack}
                        className="btn">
                        <span><i className="fa fa-arrow-left"></i> </span>
                        <span>back</span>
                    </button>
                </div>
                <div></div>
            </div>
        )
    }
}