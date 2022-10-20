import NetInfo from '@react-native-community/netinfo';
import {Platform} from 'react-native';

export const requestTimeout = async (promise, ms = 200000) => {
  const state = await NetInfo.fetch();
  return new Promise(function (resolve, reject) {
    if (!state.isConnected) {
      reject('You are offline, Please check your internet connection');
    }
    if (Platform.OS === 'android' && !state.isInternetReachable) {
      console.log('no internet');
      reject('You are offline, Please check your internet connection');
    }
    setTimeout(function () {
      reject('server timeout');
    }, ms);
    promise.then(resolve, reject);
  });
};
