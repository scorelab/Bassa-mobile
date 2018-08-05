import { updateLastDownloadTimestamp } from '../app/actions/downloadsActions';
import { downloadsActions } from '../app/actions/types';

describe('Downloads Actions', () => {
    test('Should create an action to update the last download timestamp', () => {
        const expectedAction = {
            type: downloadsActions.UPDATE_LAST_DOWNLOAD_TIMESTAMP
        };
        expect(updateLastDownloadTimestamp()).toEqual(expectedAction);
    });
});
