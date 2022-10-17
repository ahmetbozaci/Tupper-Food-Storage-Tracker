import React, {useState} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CustomButton from '../../../shared/Button';
import styles from './styles';

const CELL_COUNT = 4;

interface Props {
  navigation: any;
}

const VerifyCode: React.FC<Props> = ({navigation}) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  console.log(value);
  const handleSubmit = () => {
    if (value === '1234') {
      navigation.navigate('Login'); // Navigate to reset password screen
    }
  };
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      <View style={[styles.buttonContainer, styles.buttonContainerSignup]}>
        <CustomButton onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

export default VerifyCode;
