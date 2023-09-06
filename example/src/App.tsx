import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  I18nManager,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LottieView from 'lottie-react-native';
import Tabbar from 'react-native-tabbar-interaction';
import type { TabsType } from 'src/Tabbar/TabBar';

const activeHome = (isPlay: boolean) => {
  return (
    <LottieView
      style={{ height: 40, width: 40 }}
      source={
        isPlay
          ? require('./assets/building_active.json')
          : require('./assets/building_inactive.json')
      }
      autoPlay={isPlay}
      loop={false}
      speed={0.5}
    />
  );
};

const activeAdd = (isPlay: boolean) => {
  return (
    <LottieView
      style={{ height: 30, width: 30 }}
      source={
        isPlay
          ? require('./assets/add_active.json')
          : require('./assets/add_inactive.json')
      }
      autoPlay={isPlay}
      loop={false}
    />
  );
};

const activeList = (isPlay: boolean) => {
  return (
    <LottieView
      style={{ height: 30, width: 30 }}
      source={
        isPlay
          ? require('./assets/list_active.json')
          : require('./assets/list_inactive.json')
      }
      autoPlay={isPlay}
      loop={false}
      speed={0.6}
    />
  );
};

const tabData = [
  {
    name: 'Home',
    activeIcon: activeHome(true),
    inactiveIcon: activeHome(false),
    backgroundColor: '#546b7f',
  },
  {
    name: 'Add',
    activeIcon: activeAdd(true),
    inactiveIcon: activeAdd(false),
    backgroundColor: '#bcc9d7',
  },
  {
    name: 'List',
    activeIcon: activeList(true),
    inactiveIcon: activeList(false),
    backgroundColor: '#61b769',
  },
];

let { width } = Dimensions.get('window');

const App = () => {
  const [tabs, setTabs] = useState<Array<TabsType>>(tabData);
  const [bgColor, setBgColor] = useState('#546b7f');

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);

  const onTabChange = (item: TabsType, index: number) => {
    let tempTabs = [...tabs];
    setTimeout(() => {
      tempTabs.map((val) => {
        if (item.name === 'Home' && val.name === 'Home') {
          val.activeIcon = Object.assign({}, activeHome(true));
          setBgColor('#546b7f');
        } else if (item.name === 'Add' && val.name === 'Add') {
          val.activeIcon = Object.assign({}, activeAdd(true));
          setBgColor('#bcc9d7');
        } else if (item.name === 'List' && val.name === 'List') {
          val.activeIcon = Object.assign({}, activeList(true));
          setBgColor('#61b769');
        } else {
          val.activeIcon = null;
        }
        setTabs(tempTabs);
      }, 500);

      if (flatListRef.current) {
        flatListRef.current.scrollToIndex({
          animated: true,
          index:
            I18nManager.isRTL && Platform.OS === 'ios'
              ? tabs.length - 1 - index
              : index,
        });
      }
    });
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        data={tabs}
        horizontal
        ref={flatListRef}
        renderItem={({ item }) => (
          <View
            style={[
              styles.mainContainer,
              { backgroundColor: item.backgroundColor, width },
            ]}
          >
            <Text>App component {item.name}</Text>
          </View>
        )}
      />

      <Tabbar
        tabs={tabs}
        tabBarBackground={bgColor}
        labelStyle={styles.labelStyle}
        onTabChange={(item, index) => onTabChange(item, index)}
        defaultActiveTabIndex={0}
        transitionSpeed={200}
        containerWidth={width * 0.9}
        containerBottomLeftRadius={20}
        containerTopLeftRadius={10}
        containerBottomRightRadius={20}
        containerTopRightRadius={10}
        containerBottomSpace={20}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: { color: '#4d4d4d', fontWeight: '600', fontSize: 11 },
});
