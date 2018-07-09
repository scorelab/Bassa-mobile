import appReducer from '../app/reducers/appReducer';
import { REHYDRATE } from 'redux-persist';

describe('App Reducer', () => {
    it('should return the initial state', () => {
        expect(appReducer(undefined, {})).toEqual(
            {
                isSignedIn: false,
                selectedDrawer: 0,
            }
        )
    });

    it('should handle AUTHENTICATE_USER_SUCCESS', () => {
        const state = {
            isSignedIn: true,
            selectedDrawer: 5,
        }
        expect(
            appReducer(
                {
                    ...state
                },
                {
                    type: REHYDRATE
                }
            )
        ).toEqual(
            {
                isSignedIn: true,
                selectedDrawer: 0,
            }
        )
    });
})