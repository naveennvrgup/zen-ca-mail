
import React, { Component } from 'react'
import axios from '../../axios'
import Toolbar from './toolbar'

export default class group extends Component {
    constructor(props) {
        super(props)
        this.state = {
            next: null,
            previous: null,
            results: [],
            page: 1,
            upload_subs: 0,
        }
    }

    componentDidMount = () => {
        this.get_subs()
    }

    get_subs = () => {
        axios.get(`api/group/${this.props.selected_group_id}/?page=${this.state.page}`)
            .then(d => {
                console.log(d.data)
                this.setState({
                    ...this.state,
                    ...d.data,
                    group_id: this.props.selected_group_id
                })
            })
    }



    flag_sub_handler = (e, sub) => {
        e.preventDefault()

        axios.delete(`api/subscribe/${sub.id}/`)
            .then(d => {
                console.log('flagged')
                if (this.state.results.length === 1 && this.state.page > 1) {
                    this.setState({
                        ...this.state,
                        page: this.state.page - 1
                    })// end of setstate
                }
                this.get_subs()
                this.props.update_groups()
            })
    }

    change_page = (e, id) => {
        e.preventDefault()
        let url, change_page_no


        if (id && this.state.next) {
            url = this.state.next
            change_page_no = 1
        } else if (!id && this.state.previous) {
            url = this.state.previous
            change_page_no = -1
        } else {
            return
        }

        axios.get(url)
            .then(d => {
                console.log(d)
                this.setState({
                    ...this.state,
                    ...d.data,
                    page: this.state.page + change_page_no
                })// end of setstate
            })
    }

    upload_csv_handler = (e) => {
        e.preventDefault()
        let input = document.createElement('input')
        input.type = 'file'
        input.accept = '.csv'
        input.click()

        input.addEventListener('change', e => {
            let file = input.files[0]
            let name = file.name.split('.')[0]
            let extension = file.name.split('.')[1]
            if (extension === 'csv') {
                this.read_file(file)
            }
        })
    }

    read_file = (file) => {
    }

    render() {
        // when user switch groups this will fire
        if (this.state.group_id !== this.props.selected_group_id) {
            this.get_subs()
        }

        let subs = this.state.results
        let subs_list = subs.map((sub, i) =>
            <div className={'d-flex tab align-items-center '} key={i + 1}>
                <div className='sub_sno px-2 font-weight-bold'>{i + 1}</div>
                <div className='sub_phone px-2'>
                    <i className={`fa fa-circle ${sub.verified ? 'text-success' : 'text-danger'}`}></i>
                </div>
                <div className='sub_email px-2'>{sub.email}</div>
                <div className='sub_name px-2'>{sub.name}</div>
                <div className='sub_phone px-2 flex-grow-1'>{sub.mobile}</div>
                <button
                    onClick={e => this.flag_sub_handler(e, sub)}
                    className={`btn nbtn red`}>
                    <i className='fa fa-times'></i>
                </button>
            </div>
        )



        let pagination =
            <div className="d-flex justify-content-between align-items-center">
                <div className="font-weight-bold p-3">Subscribers: {this.state.count}</div>
                <div className="sub-pagination pagination">
                    {/* <span className='mx-1'>
                        Page {this.state.page}
                    </span> */}
                    <button
                        disabled={this.state.previous ? false : true}
                        onClick={e => this.change_page(e, 0)}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-left"></i>
                    </button>
                    <button
                        disabled={this.state.next ? false : true}
                        onClick={e => this.change_page(e, 1)}
                        className="btn nbtn blue mx-1">
                        <i className="fa fa-angle-right"></i>
                    </button>
                </div>
            </div>

        return (
            <div>
                <div className='text-muted'>
                    <Toolbar {...this.props} get_subs={this.get_subs} />
                    {pagination}
                    {subs_list}
                    {this.state.results.length ? pagination : null}
                </div>
            </div>
        )
    }
}
