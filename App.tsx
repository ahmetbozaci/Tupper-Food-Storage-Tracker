import React, {useEffect, useState} from 'react';
import {Provider} from 'react-redux';
import store, {persistor} from './src/features/store';
import MainStack from './src/navigation';
import SplashScreen from 'react-native-splash-screen';
import FlashMessage from 'react-native-flash-message';
import {PersistGate} from 'redux-persist/integration/react';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AddButtonContext} from './src/contexts/AddButtonContext';

export const queryClient = new QueryClient();

const App = () => {
  // add food modal
  const handleToggleModal = () => {
    setState(prevState => {
      return {
        ...prevState,
        modalVisible: true,
      };
    });
  };
  // add food modal
  const handlecloseModal = () => {
    setState(prevState => {
      return {
        ...prevState,
        modalVisible: false,
      };
    });
  };
  // add food modal
  const [state, setState] = useState({
    modalVisible: false,
    closeModal: handlecloseModal,
    onPress: handleToggleModal,
  });

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AddButtonContext.Provider value={state}>
          <PersistGate loading={null} persistor={persistor}>
            <MainStack />
            <FlashMessage position="top" floating={true} />
          </PersistGate>
        </AddButtonContext.Provider>
      </Provider>
    </QueryClientProvider>
  );
};

export default App;
