import APIBuilder from '../helpers/APIBuilder';
import { prepareRequestBody } from '../helpers/utils';

const signIn = credentials => APIBuilder.API.post('/api/login', prepareRequestBody(credentials));

const signUp = userData => APIBuilder.API.post('/api/regularuser', JSON.stringify(userData));

const approveUser = username => APIBuilder.API.post(`/api/user/approve/${username}`);

const getPendingRequests = () => APIBuilder.API.get('/api/user/requests');

export default {
  signIn,
  signUp,
  approveUser,
  getPendingRequests,
};
