import actionType from "../action/actionType";

const initState = {
    videoPath:"",
    voicePath:"",
    chatText:[]
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionType.result_UPDATE:
            return {
                ...state,
                ...action.payload,
            }
        default:
            return state
    }
}