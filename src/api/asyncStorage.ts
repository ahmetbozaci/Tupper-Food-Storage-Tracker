import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchStorage = async (key: string) => {
  const value = await AsyncStorage.getItem(key);
  return value;
};
