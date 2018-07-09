import { signIn, signUp, handleAuthFailure } from '../app/actions/userActions';
import { userActions } from '../app/actions/types';

describe('User Actions', () => {
    test('Should create an action to SignIn', () => {
        const username = 'rand';
        const password = 'pass';
        const expectedAction = {
            type: userActions.USER_SIGN_IN,
            payload: { user_name: username, password }
        };
        expect(signIn(username, password)).toEqual(expectedAction);
    });

    test('Should create an action to SignUp', () => {
        const username = 'rand';
        const email = 'gayashanbc@gmail.com';
        const password = 'pass';
        const confirmPassword = 'pass';
        const expectedAction = {
            type: userActions.USER_SIGN_UP,
            payload: { user_name: username, password, email, confirm_password: confirmPassword }
        };
        expect(signUp(username, email, password, confirmPassword)).toEqual(expectedAction);
    });

    test('Should create an action to handle authentication failures', () => {
        const problem = 'Invalid username or password';
        const expectedAction = {
            type: userActions.AUTHENTICATE_USER_FAIL,
            payload: problem
        };
        expect(handleAuthFailure(problem)).toEqual(expectedAction);
    });
});
