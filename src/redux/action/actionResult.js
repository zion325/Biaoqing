import actionType from "./actionType";

export const updateResult = (val) => {
    return {
        type:actionType.result_UPDATE,
        payload:val
    }
}