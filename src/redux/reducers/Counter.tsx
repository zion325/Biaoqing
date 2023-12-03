import actionType from "../action/actionType";

const initState = {
    num: 1
}

export default (state = initState, action:any) => {
    switch (action.type) {
        case actionType.counter_UP:
            return {
                ...state,
                num: state.num + action.payload
            }
        case actionType.counter_DOWN:
            return {
                ...state,
                num: state.num - action.payload
            }
        default:
            return state
    }
}

