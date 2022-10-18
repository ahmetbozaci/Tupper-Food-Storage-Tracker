import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/features/store';
import MainStack from './src/navigation';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 300);
  }, []);

  return (
    <Provider store={store}>
      <MainStack />
    </Provider>
  );
};

export default App;
