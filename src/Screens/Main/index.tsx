import {Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButton from '../../components/Button';

interface Props {
  navigation: any;
}

const Main: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <View style={styles.logo}>
          <Text style={styles.logoText}>Logo</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            buttonText="Sign up"
            buttonStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            onPress={() => navigation.navigate('Signup')}
          />
          <CustomButton
            buttonText="Log in"
            buttonStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
