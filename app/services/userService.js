import APIBuilder from '../helpers/APIBuilder';

const signIn = (username, password) => {
  const credentials = {
    user_name: username,
    password,
  };
  let formBody = [];

  Object.keys(credentials).forEach(key => formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(credentials[key])}`));
  formBody = formBody.join('&');

  return APIBuilder.API.post('/api/login', formBody);
};

export default {
  signIn,
};
