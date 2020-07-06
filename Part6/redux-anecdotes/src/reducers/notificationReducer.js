const notificationReducer = ( state = 'hallo2', action ) => {
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

export default notificationReducer;