import React, { useMemo } from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as shape from 'd3-shape';
import Svg, { Path } from 'react-native-svg';
import { StaticTabbar } from './StaticTabbar';

let { width } = Dimensions.get('window');
const height = 65;

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const getPath = (tabWidth: number, width: number, _totalTab: number) => {
  const tab = shape
    .line<string>()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: width + tabWidth / 2 - 100, y: 0 },
    { x: width + tabWidth / 2 - 65 + -35, y: 0 },
    { x: width + tabWidth / 2 - 50 + 10, y: -6 },
    { x: width + tabWidth / 2 - 50 + 15, y: height - 14 },
    { x: width + tabWidth / 2 + 50 - 15, y: height - 14 },
    { x: width + tabWidth / 2 + 50 - 10, y: -6 },
    { x: width + tabWidth / 2 + 65 - -35, y: 0 },
    { x: width + tabWidth / 2 + 100, y: 0 },
  ]);

  return ` ${tab} `;
};

export interface TabsType {
  name: string;
  id: number;
}

export interface TabBarProps<T> {
  tabs: Array<T>;
  // containerTopRightRadius?: number;
  tabBarBackground: string;
  // tabBarContainerBackground: string;
  // containerBottomSpace?: number;
  containerWidth?: number;
  // containerTopLeftRadius?: number;
  // containerBottomLeftRadius?: number;
  // containerBottomRightRadius?: number;
  activeTabBackground?: string;
  // labelStyle?: TextStyle;
  onTabChange?: (tab: T) => void;
  defaultActiveTabIndex?: number;
  // transitionSpeed?: number;
}

export const TabBar = <T,>({
  tabs,
  // activeTabBackground,
  // defaultActiveTabIndex,
  // onTabChange,
  containerWidth,
  tabBarBackground,
  ...props
}: TabBarProps<T>) => {
  let tabBarBackgroundColor = tabBarBackground
    ? tabBarBackground
    : 'transparent';
  let CustomWidth = containerWidth ? containerWidth : width;
  const value = useMemo(() => {
    return new Animated.Value(0);
  }, []);
  const tabWidth: number = tabs.length > 0 ? CustomWidth / tabs.length : 100;
  const d = getPath(tabWidth, CustomWidth, tabs.length);
  const translateX = useMemo(() => {
    return value.interpolate({
      inputRange: [0, CustomWidth],
      outputRange: [-CustomWidth, 0],
    });
  }, [CustomWidth, value]);

  return (
    <>
      {tabs.length > 0 ? (
        <>
          <View
            style={{
              backgroundColor: '#fff',
              position: 'absolute',
              bottom: 0,
              alignSelf: 'center',
            }}
          >
            <View
              {...{
                height,
                width: CustomWidth,
                backgroundColor: '#fff',
                alignSelf: 'center',
              }}
            >
              <AnimatedSvg
                width={CustomWidth * 2}
                {...{ height }}
                style={{
                  transform: [{ translateX }],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Path fill={tabBarBackgroundColor} {...{ d }} />
              </AnimatedSvg>
              <View style={StyleSheet.absoluteFill}>
                <StaticTabbar {...props} {...{ tabs, value }} />
                {/* <Text>My Tab</Text> */}
              </View>
            </View>
            <SafeAreaView
              style={{
                alignSelf: 'center',
                // borderBottomLeftRadius,
                // borderBottomRightRadius,
              }}
            />
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Please add tab data</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
