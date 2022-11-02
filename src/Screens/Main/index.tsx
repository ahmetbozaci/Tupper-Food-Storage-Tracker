import {Text, SafeAreaView, View} from 'react-native';
import React from 'react';
import styles from './styles';
import CustomButton from '../../shared/Button';
import COLORS from '../../color';
import TupperLogo from '../../../assets/svg/Tupper-Logo.svg';
interface Props {
  navigation: any;
}

const Main: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={styles.screen}>
      <View>
        <View style={styles.logo}>
          <TupperLogo />
          <Text style={styles.logoText}>Tupper</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <CustomButton
            buttonText="Sign Up"
            buttonTextStyle={[styles.buttonText, {color: COLORS.green3}]}
            buttonStyle={[styles.button, styles.signupButton]}
            onPress={() => navigation.navigate('Signup')}
          />
          <CustomButton
            buttonText="Log In"
            buttonStyle={styles.button}
            buttonTextStyle={styles.buttonText}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <View>
          <Text
            style={[styles.text, styles.forgotPassword]}
            onPress={() => navigation.navigate('EnterEmail')}>
            Forgot password?
          </Text>
        </View>
        <View>
          <Text style={styles.text}>
            Don't have an account?
            <Text
              onPress={() => navigation.navigate('Signup')}
              style={styles.signup}>
              {' '}
              Signup
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Main;
