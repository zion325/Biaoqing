import actionType from "./actionType";

export const loginTure = (val) => {
    return {
        type:actionType.Login_T,
        payload:val
    }
}


export const loginFalse = () => {
    return {
        type:actionType.Login_F,
    }
}

// 退出
export const logout = () => dispatch => {
    dispatch(loginFalse())
}