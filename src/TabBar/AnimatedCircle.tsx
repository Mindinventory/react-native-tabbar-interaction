import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
type CircleProps = {
  circleX: Animated.SharedValue<number>;
};
const circleContainerSize = 60;

const AnimatedCircle: FC<CircleProps> = ({ circleX }) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
    };
  }, []);

  return <Animated.View style={[circleContainerStyle, styles.container]} />;
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -circleContainerSize / 3,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
  },
});
