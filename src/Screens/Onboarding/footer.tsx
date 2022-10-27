import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../shared/Button';
import DATA from './DATA';
import styles from './styles';
import COLORS from '../../color';
import {useAppDispatch} from '../../features/store';
import {onboard} from '../../features/loginSlice';

interface Props {
  goToNextSlide: () => void;
  currentSlideIndex: number;
  navigation: any;
}
const Footer: React.FC<Props> = ({goToNextSlide, currentSlideIndex}) => {
  const dispatch = useAppDispatch();
  const handleOnboard = () => {
    dispatch(onboard());
  };
  return (
    <View>
      <View style={styles.indicatorContainer}>
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

      <View>
        {currentSlideIndex === DATA.length - 1 ? (
          <CustomButton
            onPress={handleOnboard}
            buttonText="Done!"
            buttonStyle={styles.button}
            buttonTextStyle={styles.btnText}
          />
        ) : (
          <CustomButton
            onPress={goToNextSlide}
            buttonText="Next"
            buttonStyle={styles.button}
            buttonTextStyle={styles.btnText}
          />
        )}
      </View>
    </View>
  );
};

export default Footer;
