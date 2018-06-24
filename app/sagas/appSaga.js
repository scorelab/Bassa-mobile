// @flow
import { PushNotificationIOS } from 'react-native';
import PushNotification from 'react-native-push-notification';
import { takeEvery, all } from 'redux-saga/effects';

import { appActions } from '../actions/types';

function* configurePushNotifications() {
  PushNotification.configure({
    onNotification: (notification) => {
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: false,
    requestPermissions: true,
  });
}

export default function* appSaga() {
  yield all([
    takeEvery(appActions.CONFIGURE_PUSH_NOTIFICATIONS, configurePushNotifications),
  ]);
}
