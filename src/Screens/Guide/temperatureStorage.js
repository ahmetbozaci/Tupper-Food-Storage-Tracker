import {Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import ArrowRight from '../../../assets/svg/arrow-right.svg';
import ArrowDown from '../../../assets/svg/arrow-down2.svg';
import guideData from './Data';
const TemperatureStorage = () => {
  const [state, setState] = useState(false);
  const changeState = event => {
    setState(!state);
  };
  const applyBackgroundColor = item => {
    if (item.id === 1) {
      return styles.backgroundColor1;
    }
    if (item.id === 2) {
      return styles.backgroundColor2;
    }
    if (item.id === 3) {
      return styles.backgroundColor3;
    }
    if (item.id === 4) {
      return styles.backgroundColor4;
    }
    if (item.id === 5) {
      return styles.backgroundColor5;
    }
  };
  return (
    <View>
      {guideData.map(item => {
        return (
          <View style={[applyBackgroundColor(item)]}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity
                style={styles.arrow}
                onPress={changeState}
                id={1}>
                {state ? <ArrowDown /> : <ArrowRight />}
              </TouchableOpacity>
            </View>
            {state ? (
              <View style={styles.textContainer}>
                <Text style={styles.subtitle}>{item.subtitle}</Text>
                <Text style={styles.text}>{item.text}</Text>
              </View>
            ) : (
              ''
            )}
          </View>
        );
      })}
    </View>
  );
};

export default TemperatureStorage;
