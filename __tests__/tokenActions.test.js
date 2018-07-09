import { setTokenToHeader } from '../app/actions/tokenActions';
import { tokenActions } from '../app/actions/types';

describe('Token Actions', () => {
    test('Should create an action to set a token', () => {
        const token = '123456789';
        const expectedAction = {
            type: tokenActions.SET_TOKEN_TO_HEADER,
            payload: token
        };
        expect(setTokenToHeader(token)).toEqual(expectedAction);
    });
});
