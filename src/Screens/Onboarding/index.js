/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SafeAreaView, FlatList, View, Text, Dimensions} from 'react-native';
import styles from './styles';
const {width, height} = Dimensions.get('window');
const COLORS = {primary: '#282534', white: '#fff'};
import DATA from './DATA';
import Footer from './footer';

const Slide = ({item}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <Text style={styles.title}>{item?.title}</Text>
      <Text style={styles.subtitle}>{item?.subtitle}</Text>
    </View>
  );
};

const OnboardingScreen = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
  const ref = React.useRef();
  const updateCurrentSlideIndex = e => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex !== DATA.length) {
      const offset = nextSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.75}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={DATA}
        pagingEnabled
        renderItem={({item}) => <Slide item={item} />}
      />
      <Footer
        goToNextSlide={goToNextSlide}
        currentSlideIndex={currentSlideIndex}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default OnboardingScreen;
