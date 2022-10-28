import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import ArrowRight from '../../../assets/svg/arrow-right.svg';
import ArrowDown from '../../../assets/svg/arrow-down2.svg';
import guideData from './Data';
import {applyBackgroundColor} from './logic';
const TemperatureStorage = () => {
  const [state, setState] = useState({
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
  });
  const changeState = id => {
    setState({[id]: !state[id]});
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {guideData.map(item => {
        return (
          <View
            key={item.id}
            style={[applyBackgroundColor(item, styles), styles.guideContainer]}>
            <View style={styles.headerContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <TouchableOpacity
                style={styles.arrow}
                onPress={() => changeState(item.id)}>
                {state[item.id] ? <ArrowDown /> : <ArrowRight />}
              </TouchableOpacity>
            </View>
            {state[item.id] ? (
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
    </ScrollView>
  );
};

export default TemperatureStorage;
