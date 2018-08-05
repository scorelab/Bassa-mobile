import downloadsReducer from '../app/reducers/downloadsReducer';
import { updateLastDownloadTimestamp } from '../app/actions/downloadsActions';
import { downloadsActions } from '../app/actions/types';

describe('Downloads Reducer', () => {
    it('should return the initial state', () => {
        expect(downloadsReducer(undefined, {})).toEqual(
            {
                lastDownloadTimestamp: null,
            }
        )
    });

    it('should handle AUTHENTICATE_USER_SUCCESS', () => {
        const timestamp = Date.now();
        const state = {
            lastDownloadTimestamp: timestamp,
        }
        expect(
            downloadsReducer(
                {
                    ...state
                },
                {
                    type: downloadsActions.UPDATE_LAST_DOWNLOAD_TIMESTAMP
                }
            )
        ).toEqual(
            {
                lastDownloadTimestamp: timestamp,
            }
        )
    });
})