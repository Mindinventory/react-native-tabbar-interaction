import React from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { StaticTabbar } from './StaticTabbar';

let { width } = Dimensions.get('window');
const height = 65;

export interface TabsType {
  name: string;
  id: number;
}

export interface TabBarProps<T> {
  tabs: Array<T>;
  // containerTopRightRadius?: number;
  // tabBarBackground: string;
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
  ...props
}: TabBarProps<T>) => {
  let CustomWidth = containerWidth ? containerWidth : width;
  const value = new Animated.Value(0);
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
              {/* <AnimatedSvg
                width={CustomWidth * 2}
                {...{ height }}
                style={{
                  transform: [{ translateX }],
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Path fill={tabBarBackgroundColor} {...{ d }} />
              </AnimatedSvg> */}
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
