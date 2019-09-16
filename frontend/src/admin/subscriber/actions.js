import faxios, { burl } from '../../axios';
import * as atypes from './action_types'
import { store } from '../../index'

const set_loading = (dispatch, loading) => {
    return dispatch({
        type: atypes.UPDATE_STATE,
        payload: { loading }
    })
}

export const get_subs = (c_sgid, cpage_no) => dispatch => {
    let { page_no, selected_group_id, search_keyword } = store.getState().subscribers

    if (c_sgid) {
        selected_group_id = c_sgid
    }
    if(cpage_no){
        page_no = cpage_no
    }

    set_loading(dispatch,true)

    faxios().get(`api/all_subs/?search=${search_keyword}&group_id=${selected_group_id}&page=${page_no}`)
        .then(d => {
            console.log(d.data)
            return dispatch({
                type: atypes.UPDATE_STATE,
                payload: {
                    ...d.data,
                    selected_group_id,
                    loading: false
                },
            })
        })
}


export const unblock_subscriber = (e, sub) => {
    e.preventDefault()
    this.axios.put(`api/all_subs/${sub.id}/`, {
        status: 'available',
        flag: false,
        email: sub.email,
        group: sub.group
    }).then(d => {
        // this.get_subs()
    })
}

export const delete_subscriber = (e, sub) => {
    e.preventDefault()

    this.axios.delete(`api/all_subs/${sub.id}/`)
        .then(d => {
            console.log('flagged')
            // if (this.state.results.length === 1 && this.state.page > 1) {
            //     this.setState({
            //         ...this.state,
            //         page: this.state.page - 1
            //     })// end of setstate
            // }
            // this.get_subs()
            // this.props.update_groups()
        })
}

export const change_page = (e, id) => {
    e.preventDefault()
    let url
    let pgno = this.state.page


    if (id) {
        url = this.state.next
        pgno += 1
    } else if (!id) {
        url = this.state.previous
        pgno -= 1
    } else {
        return
    }

    this.axios.get(url)
        .then(d => {
            console.log(d)
            this.setState({
                ...this.state,
                ...d.data,
                page: pgno
            })// end of setstate
        })
}

export const edit_subscriber = (e, sub_id) => {
    e.preventDefault()

    let subs = this.state.results
    const selected_sub_index = subs.findIndex(sub => sub.id === sub_id)
    subs[selected_sub_index].onedit = true
    this.setState({
        results: subs
    })

    console.log(subs)
}

export const edit_sub_change = (e, inputname, sub_id) => {
    e.preventDefault()

    let subs = this.state.results
    const selected_sub_index = subs.findIndex(sub => sub.id === sub_id)
    subs[selected_sub_index][inputname] = e.target.value
    this.setState({
        results: subs
    })
}

export const get_groups = () => {
    this.axios.get('api/group/')
        .then(d => {
            d = d.data
            let selected_group = d.filter(ele =>
                ele.name === this.state.selected_group_name)[0]

            console.log(d, this.state, selected_group)
            this.setState({
                groups: d,
                selected_group_id: selected_group.id,
                selected_group_name: selected_group.name
            })
        })
        .catch(e => console.error(e))
}

export const delete_group = (e, id) => {
    e.preventDefault()
    this.axios.delete(`api/group/${id}`)
        .then(d => {
            d = d.data
            this.setState({ groups: this.state.groups.filter(ele => ele.id !== id) })
        })
        .catch(e => console.error(e))
}

export const new_group = (e) => {
    e.preventDefault()
    if (!this.state.new_group_name) { return }
    this.axios.post(`api/group/`, {
        name: this.state.new_group_name
    })
        .then(d => {
            console.log(d.data)
            this.setState({
                groups: [
                    ...this.state.groups,
                    d.data
                ],
                new_group_name: ''
            })
        })
        .catch(e => console.error(e))
}

export const show_group = (e, group) => {
    this.setState({
        selected_group_id: group.id,
        selected_group_name: group.name
    })
}

export const add_sub_to_group_handler = (e) => {
    e.preventDefault()
    this.axios.post('api/add_sub_to_group/', {
        groupId: this.props.selected_group_id,
        name: this.new_sub_name.value,
        email: this.new_sub_email.value,
        mobile: this.new_sub_mobile.value
    }).then(d => {
        this.new_sub_name.value = ''
        this.new_sub_email.value = ''
        this.new_sub_mobile.value = ''
        // update sub list
        this.props.get_subs()
        // update the groups badges
        this.props.update_groups()
    })
}

export const delete_group_handler = (e) => {
    e.preventDefault()
    if (this.props.selected_group_name === 'Subscribers') {
        return
    }

    let group_2_delete = this.props.selected_group_id

    this.props.set_groups_state({
        selected_group_id: null,
        selected_group_name: 'Subscribers'
    })

    this.axios.delete(`api/group/${group_2_delete}/`)
        .then(d => {
            console.log(d.data)
            this.props.update_groups()
            // this.props.get_subs()
        })
}

export const download_group_csv_handler = () => {
    let anchor = document.createElement('a')
    anchor.href = burl + `api/download_group_as_csv/${this.props.selected_group_id}/`
    anchor.click()
}
