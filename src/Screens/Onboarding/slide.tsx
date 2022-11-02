/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import styles from './styles';
import Back from './backArrow';
const {width} = Dimensions.get('window');
// import globalStyles from '../../globalStyles';
interface Props {
  item: any;
  goToBackSlide: () => void;
}

const Slide: React.FC<Props> = ({item, goToBackSlide}) => {
  return (
    <View>
      {item.id !== '1' && <Back goToBackSlide={goToBackSlide} />}
      <View style={{flex: 1, width}}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>{item?.subtitle}</Text>
        <Image
          source={item?.image}
          style={{height: '45%', width, resizeMode: 'contain'}}
        />
      </View>
    </View>
  );
};

export default Slide;
