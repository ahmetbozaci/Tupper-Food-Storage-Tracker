import {Text, View, TouchableOpacity} from 'react-native';
import React, { useState } from 'react';
import styles from './styles';
import ChevronRight from '../../../assets/svg/chevron-right.svg';
import {heightPercentage, widthPercentage} from '../../config';

const TemperatureStorage = () => {
  const {} = useState(false);
  return (
    <View style={styles.temperatureContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>TemperatureStorage</Text>
        <TouchableOpacity>
          <ChevronRight
            width={widthPercentage(50)}
            height={heightPercentage(50)}
            style={{backgroundColor: 'red'}}
            onPress={() => console.log('something')}
          />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={styles.title}>Double-check your fridge’s temperature</Text>
        <Text style={styles.text}>
          Make sure your fridge thermometer is working correctly to prevent
          spoilage and reduce the risk of food-borne illness. The ideal
          temperature is 35 to 38 degrees Fahrenheit, cold enough to keep foods
          fresh without freezing.
        </Text>
      </View>
    </View>
  );
};

export default TemperatureStorage;
