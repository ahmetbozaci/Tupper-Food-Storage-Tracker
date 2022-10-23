/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../shared/Button';
import DATA from './DATA';
import styles from './styles';
import COLORS from '../../color';
const Footer = ({goToNextSlide, currentSlideIndex, navigation}) => {
  return (
    <View>
      {/* Indicator container */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 20,
        }}>
        {/* Render indicator */}
        {DATA.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex === index && {
                backgroundColor: COLORS.green3,
              },
            ]}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={{marginBottom: 20}}>
        {currentSlideIndex === DATA.length - 1 ? (
          <CustomButton
            onPress={() => navigation.replace('Main')}
            buttonText="Done!"
            buttonStyle={{alignSelf: 'flex-end'}}
          />
        ) : (
          <CustomButton
            onPress={goToNextSlide}
            buttonText="Next"
            buttonStyle={{alignSelf: 'flex-end'}}
          />
        )}
      </View>
    </View>
  );
};

export default Footer;
