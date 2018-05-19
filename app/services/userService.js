import APIBuilder from '../helpers/APIBuilder';
import { prepareRequestBody } from '../helpers/utils';

const signIn = (username, password) => {
  const credentials = {
    user_name: username,
    password,
  };

  return APIBuilder.API.post('/api/login', prepareRequestBody(credentials));
};

export default {
  signIn,
};
