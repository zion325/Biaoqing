import actionType from "../action/actionType";

const initState = {
    isLogin: false,
    username: "",
    password: "",
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionType.Login_T:
            return {
                ...state,
                ...action.payload,
                isLogin: true,
            }
        case actionType.Login_F:
            return {
                isLogin: false,
                username: "",
                password: "",
            }
        default:
            return state
    }
}