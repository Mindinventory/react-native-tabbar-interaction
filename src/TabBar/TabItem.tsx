import { useEffect } from 'react';
import { StyleSheet, Dimensions, Pressable, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { getPathXCenterByIndex } from './TabBar';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export type TabItemsProps = {
  label: string;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
  index: number;
  activeIndex: number;
  onTabPress: () => void;
  containerWidth: number;
  curvedPaths: any;
  currentIndex: number;
};

const ICON_SIZE = 30;
const LABEL_WIDTH = SCREEN_WIDTH / 4;

export const TabItem = (props: TabItemsProps) => {
  const {
    curvedPaths,
    index,
    activeIndex = 1,
    label,
    onTabPress,
    activeIcon,
    currentIndex,
    inactiveIcon,
  } = props;
  const animatedActiveIndex = useSharedValue(activeIndex);
  const iconPosition = getPathXCenterByIndex(curvedPaths, index);

  const tabStyle = useAnimatedStyle(() => {
    const translateY = animatedActiveIndex.value - 1 === index ? 20 : 20;
    const iconPositionX = iconPosition - index * ICON_SIZE;
    return {
      width: ICON_SIZE,
      height: ICON_SIZE,
      transform: [
        { translateY: withTiming(translateY) },
        { translateX: iconPositionX - ICON_SIZE / 2 },
      ],
    };
  });

  const iconColor = useSharedValue(
    activeIndex === index + 1 ? 'white' : 'rgba(128,128,128,0.8)'
  );

  //Adjust Icon color for this first render
  useEffect(() => {
    animatedActiveIndex.value = activeIndex;
    if (activeIndex === index + 1) {
      iconColor.value = withTiming('white');
    } else {
      iconColor.value = withTiming('rgba(128,128,128,0.8)');
    }
  }, [activeIndex, animatedActiveIndex, iconColor, index]);

  return (
    <>
      {currentIndex === index ? (
        <Animated.View style={[tabStyle, styles.tabItem, { bottom: 25 }]}>
          <Pressable
            testID={`tab${label}`}
            //Increasing touchable Area
            hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
            onPress={onTabPress}
          >
            <Animated.View entering={FadeIn.delay(300)}>
              {activeIcon}
            </Animated.View>
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View style={[tabStyle, styles.tabItem]}>
          <Pressable
            testID={`tab${label}`}
            //Increasing touchable Area
            hitSlop={{ top: 30, bottom: 30, left: 50, right: 50 }}
            onPress={onTabPress}
          >
            <View>{inactiveIcon}</View>
          </Pressable>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    width: LABEL_WIDTH,
  },
  label: {
    color: 'rgba(128,128,128,0.8)',
    fontSize: 17,
  },
  tabItem: {},
});
