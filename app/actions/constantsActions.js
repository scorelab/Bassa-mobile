
export const getIP = () => {
    return {
        type: "GET_IP"
    }
}

export const getPort = () => {
    return {
        type: "GET_PORT"
    }
}

export const getKey = () => {
    return {
        type: "GET_KEY"
    }
}

export const setIP = (ip) => {
    return {
        type: "SET_IP",
        ip
    }
}

export const setPort = (port) => {
    return {
        type: "SET_PORT",
        port
    }
}
