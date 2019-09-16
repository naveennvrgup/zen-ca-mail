import faxios, { burl } from '../../axios';
import * as atypes from './action_types'
import { store } from '../../index'

export const set_loading = (loading) => dispatch => {
    return dispatch({
        type: atypes.UPDATE_STATE,
        payload: { loading }
    })
}

export const update_state = payload => dispatch => {
    return dispatch({
        type: atypes.UPDATE_STATE,
        payload
    })
}

export const get_subs = (c_sgid, cpage_no) => dispatch => {
    let { page_no, selected_group_id, selected_group_name, search_keyword } = store.getState().subscribers

    if(c_sgid){
        selected_group_id = c_sgid
    }

    if (cpage_no) {
        page_no = cpage_no
    }


    faxios().get(`api/all_subs/?search=${search_keyword}&group_id=${selected_group_id}&page=${page_no}`)
        .then(d => {
            console.log(d.data)
            let groups = d.data.groups
            groups = Object.keys(groups)
                .map(x => ({ name: x, ...groups[x] }))

            if (c_sgid) {
                selected_group_name = groups.find(ele => ele.id === c_sgid).name
            }if(!selected_group_id){
                selected_group_id = groups.find(ele => ele.name === 'Subscribers').id
            }

            console.log({selected_group_name,selected_group_id})

            return dispatch({
                type: atypes.UPDATE_STATE,
                payload: {
                    ...d.data,
                    selected_group_id,
                    selected_group_name,
                    loading: false
                },
            })
        })
}




