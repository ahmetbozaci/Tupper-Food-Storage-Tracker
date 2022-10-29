import {View, Animated} from 'react-native';
import React, {useEffect, useRef} from 'react';
import Svg, {G, Circle} from 'react-native-svg';
import COLORS from '../../color';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface Props {
  percentage: number;
  radius?: number;
  strokeWidth?: number;
  duration?: number;
  color: string;
  delay?: number;
  max?: number;
}

const Donut: React.FC<Props> = ({
  percentage,
  radius = 16,
  strokeWidth = 8,
  duration = 600,
  color,
  delay = 100,
  max = 100,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const circleRef = useRef<any>();
  const halfcircle = radius + strokeWidth;
  const circleCircumference = 2 * Math.PI * radius;

  const animation = (toValue: number) => {
    return Animated.timing(animatedValue, {
      toValue,
      duration,
      delay,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    animation(percentage);
    animatedValue.addListener(v => {
      if (circleRef.current) {
        const maxPerc = (100 * v.value) / max;
        const strokeDashoffset =
          circleCircumference - (circleCircumference * maxPerc) / 100;
        circleRef.current.setNativeProps({
          strokeDashoffset,
        });
      }
    });
  });

  return (
    <View>
      <Svg
        width={radius * 2}
        height={radius * 2}
        viewBox={`0 0 ${halfcircle * 2} ${halfcircle * 2}`}>
        <G rotation="270" origin={`${halfcircle}, ${halfcircle}`}>
          <Circle
            cx="50%"
            cy="50%"
            stroke={COLORS.gray}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeOpacity={0.2}
          />
          <AnimatedCircle
            ref={circleRef}
            cx="50%"
            cy="50%"
            stroke={color}
            strokeWidth={strokeWidth}
            r={radius}
            fill="transparent"
            strokeDasharray={circleCircumference}
            strokeDashoffset={circleCircumference}
            strokeLinecap="round"
          />
        </G>
      </Svg>
    </View>
  );
};

export default Donut;
