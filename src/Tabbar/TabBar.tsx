import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Text,
  type TextStyle,
} from 'react-native';
import * as shape from 'd3-shape';
import Svg, { Path } from 'react-native-svg';
import StaticTabbar from './StaticTabBar';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
// let width = 390;
let { width } = Dimensions.get('window');
const height = 65;

const getPath = (tabWidth: number, width: number) => {
  const tab = shape
    .line<string>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: width + tabWidth / 2 - 50, y: 0 },
    { x: width + tabWidth / 2 - 42, y: 0 },
    { x: width + tabWidth / 2 - 38, y: 8 },
    { x: width + tabWidth / 2 - 30, y: 40 },
    { x: width + tabWidth / 2 - 40, y: 0 },
    { x: width + tabWidth / 2 - 40, y: 0 },
    { x: width + tabWidth / 2 - 32, y: height - 16 },
    { x: width + tabWidth / 2 + 32, y: height - 16 },
    { x: width + tabWidth / 2 + 40, y: 0 },
    { x: width + tabWidth / 2 + 40, y: 0 },
    { x: width + tabWidth / 2 + 30, y: 40 },
    { x: width + tabWidth / 2 + 38, y: 8 },
    { x: width + tabWidth / 2 + 42, y: 0 },
    { x: width + tabWidth / 2 + 50, y: 0 },
  ]);

  return ` ${tab} `;
};

export interface TabsType {
  name: string;
  activeIcon: JSX.Element | null;
  inactiveIcon: JSX.Element;
}

interface Props {
  tabs: Array<TabsType>;
  containerTopRightRadius?: number;
  tabBarBackground: string;
  tabBarContainerBackground?: string;
  containerBottomSpace?: number;
  containerWidth?: number;
  containerTopLeftRadius?: number;
  containerBottomLeftRadius?: number;
  containerBottomRightRadius?: number;
  activeTabBackground?: string;
  labelStyle?: TextStyle;
  onTabChange?: (tab: TabsType, index: number) => void;
  defaultActiveTabIndex?: number;
  transitionSpeed?: number;
}

export default class Tabbar extends React.PureComponent<Props> {
  value = new Animated.Value(0);

  render() {
    const {
      tabs,
      containerTopRightRadius,
      tabBarBackground,
      tabBarContainerBackground,
      containerBottomSpace,
      containerWidth,
      containerTopLeftRadius,
      containerBottomLeftRadius,
      containerBottomRightRadius,
    } = this.props;
    let CustomWidth = containerWidth ? containerWidth : width;
    const { value } = this;
    const translateX = value.interpolate({
      inputRange: [0, CustomWidth],
      outputRange: [-CustomWidth, 0],
    });
    let tabBarBackgroundColor = tabBarBackground
      ? tabBarBackground
      : 'transparent';
    const tabWidth: number | void | string =
      tabs.length > 0
        ? CustomWidth / tabs.length
        : console.error('please add tab data');
    let d;
    if (typeof tabWidth === 'number') {
      d = getPath(tabWidth, CustomWidth);
    }

    let borderTopRightRadius = containerTopRightRadius
      ? containerTopRightRadius
      : 0;
    let borderTopLeftRadius = containerTopLeftRadius
      ? containerTopLeftRadius
      : 0;
    let borderBottomLeftRadius = containerBottomLeftRadius
      ? containerBottomLeftRadius
      : 0;
    let borderBottomRightRadius = containerBottomRightRadius
      ? containerBottomRightRadius
      : 0;
    if (tabs.length > 0) {
      return (
        <>
          <View
            style={[
              styles.mainContainer,
              {
                backgroundColor: tabBarContainerBackground || '#fff',
                bottom: containerBottomSpace || 0,
                borderTopRightRadius,
                borderTopLeftRadius,
                borderBottomLeftRadius,
                borderBottomRightRadius,
              },
            ]}
          >
            <View
              {...{
                height,
                width: CustomWidth,
                backgroundColor: tabBarContainerBackground
                  ? tabBarContainerBackground
                  : '#fff',
                alignSelf: 'center',
                borderTopRightRadius,
                borderTopLeftRadius,
                borderBottomLeftRadius,
                borderBottomRightRadius,
              }}
            >
              <AnimatedSvg
                width={CustomWidth * 2}
                {...{ height }}
                style={[styles.pathContainer, { transform: [{ translateX }] }]}
              >
                <Path fill={tabBarBackgroundColor} {...{ d }} />
              </AnimatedSvg>
              <View style={StyleSheet.absoluteFill}>
                <StaticTabbar {...this.props} {...{ tabs, value }} />
              </View>
            </View>
            <SafeAreaView
              style={[
                styles.safeAreaView,
                { borderBottomLeftRadius, borderBottomRightRadius },
              ]}
            />
          </View>
        </>
      );
    } else {
      return (
        <View style={styles.emptyContainer}>
          <Text>Please add tab data</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  mainContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  pathContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaView: {
    alignSelf: 'center',
  },
});
