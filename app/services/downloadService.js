import APIBuilder from '../helpers/APIBuilder';

const getAllDownloads = () => APIBuilder.API.get('/api/downloads/1');

const removeDownload = downloadId => APIBuilder.API.delete(`/api/download/${downloadId}`);

const getDownloadsForUser = () => APIBuilder.API.get('/api/user/downloads/1');

const addDownload = downloadLink => APIBuilder.API.post('/api/download', JSON.stringify(downloadLink));

export default {
  getDownloadsForUser,
  removeDownload,
  getAllDownloads,
  addDownload,
};
