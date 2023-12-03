import actionType from "../action/actionType";

const initState = {
    isShow:true
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionType.tabbar_T:
            return {
                ...state,
                isShow:true
            }
        case actionType.tabbar_F:
            return {
                ...state,
                isShow:false
            }
        default:
            return state
    }
}

