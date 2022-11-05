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
      title: `<p style="color: #212121; font-size: 15px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">${notification.title}</p>`,
      body: `<p style="color: #212121; font-size: 13px; font-weight: 400; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
          Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">${notification.body}</p>`,
      android: {
        largeIcon:
          'https://res.cloudinary.com/omodauda/image/upload/v1667560065/icon_gdhwdi.jpg',
      },
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
