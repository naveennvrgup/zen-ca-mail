import * as atypes from './action_types'


const initialState = {
    groups: [],
    selected_group_id: null,
    selected_group_name: 'Subscribers',

    show_duplicates: false,
    subscribers: [],
      
    next: null,
    previous: null,
    count: 0,
    page: 1,
}

export default (state = initialState, action) => {
    switch(action.type){
        default: 
            return state
    }
}