import APIBuilder from '../helpers/APIBuilder';
import APIConstants from '../constants/API';

const getAllDownloads = () => APIBuilder.API.get('/api/downloads/1');

const removeDownload = downloadId => APIBuilder.API.delete(`/api/download/${downloadId}`);

const getDownloadsForUser = () => APIBuilder.API.get('/api/user/downloads/1');

const getQuotaUsages = () => APIBuilder.API.get('/api/user/heavy');

const startAllDownloads = () => APIBuilder.API.get('/download/start', {
  headers: {
    key: APIConstants.KEY,
  },
});

const killAllDownloads = () => APIBuilder.API.get('/download/kill', {
  headers: {
    key: APIConstants.KEY,
  },
});

const addDownload = downloadLink => APIBuilder.API.post('/api/download', JSON.stringify(downloadLink));

export default {
  getDownloadsForUser,
  removeDownload,
  startAllDownloads,
  killAllDownloads,
  getQuotaUsages,
  getAllDownloads,
  addDownload,
};
