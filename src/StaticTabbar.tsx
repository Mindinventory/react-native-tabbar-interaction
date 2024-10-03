import React, { useCallback, useEffect, useMemo } from 'react';
import {
  Animated,
  Dimensions,
  I18nManager,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  type TextStyle,
} from 'react-native';

let { width } = Dimensions.get('window');

export interface StaticTabbarProps<T> {
  value: Animated.AnimatedValue;
  tabs: Array<T>;
  onTabChange?: (tab: T) => void;
  labelStyle?: TextStyle;
  activeTabBackground?: string;
  Hvalue?: number;
  containerWidth?: number;
  defaultActiveTabIndex?: number;
  transitionSpeed?: number;
}
let prevIndex = -1;

export const StaticTabbar = <T,>({
  defaultActiveTabIndex,
  tabs,
  containerWidth,
  value,
  onTabChange,
  transitionSpeed = 100,
}: StaticTabbarProps<T>) => {
  let customWidth = useMemo(() => {
    return containerWidth ? containerWidth : width;
  }, [containerWidth]);
  let transitionDuration = useMemo(() => {
    return transitionSpeed ? transitionSpeed : 100;
  }, [transitionSpeed]);
  const tabWidth = useMemo(() => {
    return customWidth / tabs.length;
  }, [customWidth, tabs.length]);
  let activeTabIndex = useMemo(() => {
    return defaultActiveTabIndex
      ? defaultActiveTabIndex > tabs.length
        ? 0
        : defaultActiveTabIndex
      : 0;
  }, [defaultActiveTabIndex, tabs.length]);

  const values: Array<Animated.AnimatedValue> =
    useMemo((): Array<Animated.AnimatedValue> => {
      return tabs.map(
        (_tab, index) => new Animated.Value(index === activeTabIndex ? 1 : 0)
      );
    }, [tabs, activeTabIndex]);

  const range = (start: number, end: number) => {
    var len = end - start;
    var a = new Array(len);
    for (let i = 0; i < len; i++) a[i] = start + i;
    return a;
  };

  const onPress = useCallback(
    (index: number, noAnimation: boolean = false) => {
      if (prevIndex !== index) {
        let rangeNumber = range(0, tabs.length).reverse();

        Animated.sequence([
          Animated.parallel(
            values.map((v: Animated.AnimatedValue | Animated.AnimatedValueXY) =>
              Animated.timing(v, {
                toValue: 0,
                useNativeDriver: true,
                duration: noAnimation ? 0 : 50,
              })
            )
          ),
          Animated.timing(value, {
            toValue: I18nManager.isRTL
              ? customWidth + tabWidth * rangeNumber[index]
              : tabWidth * index,
            useNativeDriver: true,
            duration: noAnimation ? 0 : transitionDuration,
          }),
          Animated.timing(values[index]!, {
            toValue: 1,
            useNativeDriver: true,
            duration: 750,
          }),
        ]).start();
        prevIndex = index;
      }
    },
    [customWidth, tabWidth, tabs.length, transitionDuration, value, values]
  );

  // useEffect(() => {
  //   onPress(activeTabIndex, true);
  // }, [activeTabIndex, onPress]);

  return (
    <View style={styles.container}>
      {tabs.map((tab, key) => {
        // const tabWidth = customWidth / tabs.length;
        let rangeNumber = range(0, tabs.length).reverse();
        const cursor = I18nManager.isRTL
          ? customWidth + tabWidth * rangeNumber[key]
          : tabWidth * key;

        const opacity = value.interpolate({
          inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });

        const opacity1 = values[key]!.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });

        return (
          <React.Fragment {...{ key }}>
            <TouchableWithoutFeedback
              onPress={() => {
                onPress(key);
                onTabChange && onTabChange(tab);
              }}
            >
              <Animated.View
                style={[styles.tab, { opacity: opacity, zIndex: 100 }]}
              >
                <Text style={styles.labelStyle}>{tab.name}A </Text>
              </Animated.View>
            </TouchableWithoutFeedback>
            <Animated.View
              style={{
                position: 'absolute',
                top: -8,
                left: tabWidth * key,
                width: tabWidth,
                height: 64,
                justifyContent: 'center',
                alignItems: 'center',
                opacity: opacity1,
                zIndex: 50,
              }}
            >
              <View style={styles.activeIcon}>
                <Text style={styles.labelStyle}>{tab.name}B </Text>
              </View>
            </Animated.View>
          </React.Fragment>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
  },
  activeIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  labelStyle: {
    fontSize: 11,
    fontWeight: '600',
    // marginTop: 3,
    color: '#000',
  },
});
