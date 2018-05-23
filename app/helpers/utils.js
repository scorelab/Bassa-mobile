export const prepareRequestBody = (requestParams = {}) => {
  let formBody = [];

  Object.keys(requestParams).forEach(key => formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(requestParams[key])}`));
  formBody = formBody.join('&');

  return formBody;
};
