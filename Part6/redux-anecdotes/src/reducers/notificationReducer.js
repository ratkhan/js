import anecdoteService from "../services/anecdotes";

const notificationReducer = ( state = '', action ) => {
    switch (action.type) {
        case 'SET_MESSAGE': {
            state = action.notification;
            return state
        }
        default:
            return state;
    }
}

export const notificationChange = (notification) => {
    return {
        type: 'SET_MESSAGE',
        notification
    }
}

export const setNotification = (notification, time) => {
    return async dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            notification
        })
        setTimeout(() => {
            dispatch(notificationChange(''))
        }, time * 1000)
    }
}

export default notificationReducer;