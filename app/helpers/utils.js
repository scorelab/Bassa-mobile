export const prepareRequestBody = (requestParams = {}) => {
  let formBody = [];

  Object.keys(requestParams).forEach(key => formBody.push(`${encodeURIComponent(key)}=${encodeURIComponent(requestParams[key])}`));
  formBody = formBody.join('&');

  return formBody;
};

export const formatBytes = (bytes) => {
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1000;
  const dm = 3;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
