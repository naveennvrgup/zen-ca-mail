import React, { Component } from 'react'

export default class group extends Component {
    flagSubHandler = (e) => {
        e.preventDefault()
        // debugger
        let id = e.target.dataset.id

        axios.post('api/flagSub/', { id })
            .then(d => {
                let subs = this.state.subs.map(ele => {
                    if (ele.id === d.data.id) {
                        ele.flag = d.data.flag
                    }
                    return ele
                })

                this.setState({
                    ...this.state,
                    subs
                })
            })
    }

    render() {
        return (
            <div>
                group
      </div>
        )
    }
}
