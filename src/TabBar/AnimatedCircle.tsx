import { type FC } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type CircleProps = {
  circleX: typeof useSharedValue;
  circleFillColor?: string;
};
const circleContainerSize = 56;

const AnimatedCircle: FC<CircleProps> = ({ circleX, circleFillColor }) => {
  const circleContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: circleX.value - circleContainerSize / 2 }],
    };
  }, []);

  const circleBg = {
    backgroundColor: circleFillColor ? circleFillColor : '#fff',
  };
  return (
    <Animated.View style={[circleContainerStyle, styles.container, circleBg]} />
  );
};

export default AnimatedCircle;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -circleContainerSize / 3,
    width: circleContainerSize,
    borderRadius: circleContainerSize,
    height: circleContainerSize,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 'auto',
    //
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
