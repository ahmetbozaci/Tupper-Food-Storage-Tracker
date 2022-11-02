import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/features/store';
import MainStack from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import notifee, {AuthorizationStatus} from '@notifee/react-native';
import messaging, {
  FirebaseMessagingTypes,
} from '@react-native-firebase/messaging';

export const queryClient = new QueryClient();

// required for android
const createChannel = async () => {
  const channelId = await notifee.createChannel({
    id: 'default',
    vibration: true,
    name: 'Default Channel',
  });
  return channelId;
};

// iOS
async function requestUserPermission() {
  const settings = await notifee.requestPermission();

  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    console.log('Permission settings:', settings);
    await createChannel();
  } else {
    console.log('User declined permissions');
  }
}

// foreground
const onMessageHandler = (
  remoteMessage: FirebaseMessagingTypes.RemoteMessage,
) => {
  const {notification, data} = remoteMessage;
  notifee.displayNotification({
    title: notification?.title,
    body: notification?.body,
    data: data,
  });
};

const App = () => {
  useEffect(() => {
    requestUserPermission();
    const unsubMessaging = messaging().onMessage(onMessageHandler);
    return () => {
      unsubMessaging();
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainStack />
          <FlashMessage position="top" floating={true} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
