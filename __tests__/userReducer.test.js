import userReducer from '../app/reducers/userReducer';
import { userActions } from '../app/actions/types';

describe('User Reducer', () => {
    it('should return the initial state', () => {
        expect(userReducer(undefined, {})).toEqual(
            {
                currentUser: {
                    username: '',
                    isAdmin: false,
                    timestamp: null,
                },
            }
        )
    });

    it('should handle USER_SIGN_OUT', () => {
        expect(
            userReducer([], {
                type: userActions.USER_SIGN_OUT
            })
        ).toEqual(
            {
                currentUser: {
                    username: '',
                    isAdmin: false,
                    timestamp: null,
                },
            }
        );
    });

    it('should handle AUTHENTICATE_USER_SUCCESS', () => {
        const currentUser = {
            username: '',
            isAdmin: false,
            timestamp: Date.now(),
        };
        expect(
            userReducer(

                {
                    currentUser: { ...currentUser },
                },
                {
                    type: userActions.AUTHENTICATE_USER_SUCCESS,
                    payload: {
                        username: 'rand',
                        isAdmin: true
                    }
                }
            )
        ).toEqual(
            {
                currentUser: {
                    username: 'rand',
                    isAdmin: true,
                    timestamp: currentUser.timestamp,
                },
            }
        )
    });
})