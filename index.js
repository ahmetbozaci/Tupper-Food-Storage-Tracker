/**
 * @format
 */

import {AppRegistry} from 'react-native';
import React from 'react';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import App from './App';
import {name as appName} from './app.json';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  const {notification, data} = remoteMessage;
  notifee.onBackgroundEvent(async ({type, details}) => {
    return notifee.displayNotification({
      title: notification.title,
      body: notification.body,
      data,
    });
  });
});

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
