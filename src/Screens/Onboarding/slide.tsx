/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import styles from './styles';
import Back from './backArrow';
const {width} = Dimensions.get('window');

interface Props {
  item: any;
  goToBackSlide: () => void;
}

const Slide: React.FC<Props> = ({item, goToBackSlide}) => {
  return (
    <View>
      {item.id !== '1' && <Back goToBackSlide={goToBackSlide} />}
      <View style={{width, flex: 1, alignItems: 'center'}}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
        <Image
          source={item?.image}
          style={{height: '55%', width, resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};

export default Slide;
