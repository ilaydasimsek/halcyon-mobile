import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

import { TextStyleProp } from '../../types/text';
import { fontColor, typography } from '@style';
import { useAnimatedDots } from './hooks/use-animated-dots';

type TEllipsisListLoaded = TextStyleProp & {
  numberOfDots?: number;
  minOpacity?: number;
};

const EllipsisListLoader: React.FC<TEllipsisListLoaded> = ({
  numberOfDots = 3,
  textStyle = [typography.h1, fontColor.textGrayH2],
}) => {
  const animatedDots = useAnimatedDots(numberOfDots);

  return (
    <View style={styles.container}>
      {animatedDots.current.map((o, i) => (
        <Animated.Text key={i} style={[textStyle, { opacity: o }]}>
          {i !== 0 ? ' ' : ''}.
        </Animated.Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    paddingBottom: 12,
  },
});

export default EllipsisListLoader;
