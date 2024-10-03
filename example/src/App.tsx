import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { multiply, TabBar } from 'react-native-bottom-tab-bar';

let { width } = Dimensions.get('window');
interface TabDataType {
  name: string;
  id: number;
}

const tabData: Array<TabDataType> = [
  {
    name: 'Home',
    id: 1,
  },
  {
    name: 'Cart',
    id: 2,
  },
  {
    name: 'Search',
    id: 3,
  },
  {
    name: 'Profile',
    id: 4,
  },
  // {
  //   name: 'Setting',
  //   id: 5,
  // },
];

export default function App() {
  const [bgColor, setBgColor] = useState('#FFC0C7');
  const [tabs, setTabs] = useState<Array<TabDataType> | []>(tabData);

  const onTabChange = (item: TabDataType) => {
    let tempTabs = [...tabs];
    setTimeout(() => {
      tempTabs.map((val) => {
        if (item.name === 'Home' && val.name === 'Home') {
          // val.activeIcon = Object.assign({}, activeHome(true))
          setBgColor('#FFC0C7');
        } else if (item.name === 'Cart' && val.name === 'Cart') {
          // val.activeIcon = Object.assign({}, activeList(true))
          setBgColor('#FF7128');
        } else if (item.name === 'Search' && val.name === 'Search') {
          // val.activeIcon = Object.assign({}, activeCamera(true))
          setBgColor('#0088cc');
        } else if (item.name === 'Setting' && val.name === 'Setting') {
          // val.activeIcon = Object.assign({}, activeNotification(true))
          setBgColor('#ff6666');
        } else if (item.name === 'Profile' && val.name === 'Profile') {
          // val.activeIcon = Object.assign({}, activeUser(true))
          setBgColor('#66ff99');
        } else {
          // val.activeIcon = null
        }
      });

      setTabs(tempTabs);
    }, 500);
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: bgColor,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>App component</Text>
      </View>
      <TabBar
        tabs={tabs as Array<TabDataType>}
        onTabChange={onTabChange}
        // defaultActiveTabIndex={1}
        containerWidth={width - 20}
        tabBarBackground={bgColor}
        defaultActiveTabIndex={0}
        // transitionSpeed={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
