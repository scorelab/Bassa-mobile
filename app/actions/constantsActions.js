import {constantsActions} from './types'

export const getIP = () => {
    return {
        type: constantsActions.GET_IP
    }
}

export const getPort = () => {
    return {
        type: constantsActions.GET_PORT
    }
}

export const getKey = () => {
    return {
        type: constantsActions.GET_KEY
    }
}

export const setIP = (ip) => {
    return {
        type: constantsActions.SET_IP,
        ip
    }
}

export const setPort = (port) => {
    return {
        type: constantsActions.SET_PORT,
        port
    }
}
