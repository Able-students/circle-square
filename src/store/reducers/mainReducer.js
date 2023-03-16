import types from '../actions/types'

const iniatialState = {
    list: []
}

function reducer(state = iniatialState, action){
    switch(action.type){
        case types.SET_LIST:
            return { 
                ...state,
                list: action.payload
            }   
        default:
            return state
    }
}


export default reducer