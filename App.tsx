import React from 'react';
import {Provider} from 'react-redux';
import store from './src/features/store';
import MainStack from './src/navigation';

const App = () => (
  <Provider store={store}>
    <MainStack />
  </Provider>
);

export default App;
