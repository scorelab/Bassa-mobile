import InitialAPIConstants from '../constants/API';

function ConstantsDispatcher(state = InitialAPIConstants, action) {
    switch(action.type) {
        case GET_IP:
            return state.HOST_URL
        case GET_PORT:
            return state.HOST_PORT
        case GET_KEY:
            return state.KEY
        case SET_IP:
            return Object.assign({}, state, {
                HOST_URL: action.ip
            })
        case SET_PORT:
            return Object.assign({}, state, {
                HOST_PORT: action.port
        })
    }
}

export default ConstantsDispatcher; 