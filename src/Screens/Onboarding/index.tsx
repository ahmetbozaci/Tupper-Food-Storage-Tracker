import React, {useState, useRef} from 'react';
import {SafeAreaView, FlatList, Dimensions} from 'react-native';
import DATA from './DATA';
import Footer from './footer';
import Slide from './slide';

interface Props {
  navigation: any;
}
const OnboardingScreen: React.FC<Props> = ({navigation}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const ref = useRef<any>();
  const {width, height} = Dimensions.get('window');

  const updateCurrentSlideIndex = (event: {
    nativeEvent: {contentOffset: {x: any}};
  }) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
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

  const goToBackSlide = () => {
    const backSlideIndex = currentSlideIndex - 1;
    if (backSlideIndex !== DATA.length) {
      const offset = backSlideIndex * width;
      ref?.current.scrollToOffset({offset});
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  return (
    <SafeAreaView>
      <FlatList
        ref={ref}
        onMomentumScrollEnd={updateCurrentSlideIndex}
        contentContainerStyle={{height: height * 0.8}}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={DATA}
        pagingEnabled
        renderItem={({item}) => (
          <Slide item={item} goToBackSlide={goToBackSlide} />
        )}
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
