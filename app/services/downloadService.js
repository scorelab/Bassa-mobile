import APIBuilder from '../helpers/APIBuilder';

const getAllDownloads = () => APIBuilder.API.get('/api/downloads/1');

const getDownloadsForUser = () => APIBuilder.API.get('/api/user/downloads/1');

export default {
  getDownloadsForUser,
  getAllDownloads,
};
