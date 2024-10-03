import React from 'react';
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
  value?: Animated.AnimatedValue;
  tabs: Array<T>;
  onTabChange?: (tab: T) => void;
  labelStyle?: TextStyle;
  activeTabBackground?: string;
  Hvalue?: number;
  containerWidth?: number;
  defaultActiveTabIndex?: number;
  transitionSpeed?: number;
}

export const StaticTabbar = <T,>({
  defaultActiveTabIndex,
  tabs,
  containerWidth,
  value,
  onTabChange,
}: StaticTabbarProps<T>) => {
  let customWidth = containerWidth ? containerWidth : width;
  let values: Array<Animated.AnimatedValue> = tabs?.map(
    (tab, index) => new Animated.Value(index === activeTabIndex ? 1 : 0)
  );
  let activeTabIndex = defaultActiveTabIndex
    ? defaultActiveTabIndex > tabs.length
      ? 0
      : defaultActiveTabIndex
    : 0;

  const range = (start: number, end: number) => {
    var len = end - start;
    var a = new Array(len);
    for (let i = 0; i < len; i++) a[i] = start + i;
    return a;
  };

  return (
    <View style={styles.container}>
      {tabs.map((tab, key) => {
        const tabWidth = customWidth / tabs.length;
        let rangeNumber = range(0, tabs.length).reverse();
        const cursor = I18nManager.isRTL
          ? customWidth + tabWidth * rangeNumber[key]
          : tabWidth * key;

        const opacity = value.interpolate({
          inputRange: [cursor - tabWidth, cursor, cursor + tabWidth],
          outputRange: [1, 0, 1],
          extrapolate: 'clamp',
        });

        const opacity1 = values[key].interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        });
        return (
          <React.Fragment {...{ key }}>
            <TouchableWithoutFeedback
              onPress={() => {
                // onPress(key);
                onTabChange && onTabChange(tab);
              }}
            >
              <Animated.View style={[styles.tab, { zIndex: 100 }]}>
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
              {/* <View style={newActiveIcon}>{tab.activeIcon}</View> */}
              <Text style={styles.labelStyle}>{tab.name}B </Text>
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
  },
  labelStyle: {
    fontSize: 11,
    fontWeight: '600',
    // marginTop: 3,
    color: '#000',
  },
});
