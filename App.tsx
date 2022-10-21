import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/features/store';
import MainStack from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainStack />
        <FlashMessage position="top" floating={true} />
      </PersistGate>
    </Provider>
  );
};

export default App;
