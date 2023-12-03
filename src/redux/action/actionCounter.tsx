import actionType from "./actionType"

export const UP = (val:any) => {
    return {
        type:actionType.counter_UP,
        payload:val,
    }
}

export const DOWN = (val:any) => {
    return {
        type:actionType.counter_DOWN,
        payload:val,
    }
}