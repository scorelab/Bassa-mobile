import { tokenActions } from './types';

export const setTokenToHeader = (token) => {
    console.log('token: ', token)
    return {
        type: tokenActions.SET_TOKEN_TO_HEADER,
        payload: token,
    };
};