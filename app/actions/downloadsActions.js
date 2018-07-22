import { downloadsActions } from './types';

export const updateLastDownloadTimestamp = () => {
    return {
        type: downloadsActions.UPDATE_LAST_DOWNLOAD_TIMESTAMP,
    };
};