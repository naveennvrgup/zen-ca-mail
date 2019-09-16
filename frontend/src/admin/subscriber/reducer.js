import * as atypes from './action_types'


const initialState = {
    groups: {},
    selected_group_id: null,
    selected_group_name: 'Subscribers',
    search_keyword: '',
    loading: false,

    show_duplicates: false,
    subscribers: [],
      
    next: null,
    previous: null,
    count: 0,
    page_no: 1,
}

export default (state = initialState, action) => {
    switch(action.type){
        case atypes.UPDATE_STATE:
            return {
                ...state,
                ...action.payload,
            }
        default: 
            return state
    }
}