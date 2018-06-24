import PushNotification from 'react-native-push-notification';

import { theme } from '../styles';

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

export const showPushNotification = (title, message, description) => {
  PushNotification.localNotification({
    bigText: description,
    color: theme.PRIMARY_STATUS_BAR_COLOR,
    vibration: 300,
    ongoing: false,
    title,
    message,
    soundName: 'default',
    number: '10',
  });
};
