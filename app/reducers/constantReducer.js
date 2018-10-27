import InitialAPIConstants from '../constants/API';
import {constantsActions} from '../actions/types'

function ConstantsDispatcher(state = InitialAPIConstants, action) {
    switch(action.type) {
        case constantsActions.GET_IP:
            return state.HOST_URL
        case constantsActions.GET_PORT:
            return state.HOST_PORT
        case constantsActions.GET_KEY:
            return state.KEY
        case constantsActions.SET_IP:
            return Object.assign({}, state, {
                HOST_URL: action.ip
            })
        case constantsActions.SET_PORT:
            return Object.assign({}, state, {
                HOST_PORT: action.port
        })
    }
}

export default ConstantsDispatcher; 