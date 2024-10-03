import { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { multiply, TabBar } from 'react-native-bottom-tab-bar';

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
  {
    name: 'Setting',
    id: 5,
  },
];

export default function App() {
  const [bgColor, setBgColor] = useState('#FFC0C7');

  const onTabChange = (tabItem: TabDataType) => {
    switch (tabItem.id) {
      case 1:
        setBgColor('#FFC0C7');
        break;

      case 2:
        setBgColor('#FF7128');
        break;

      case 3:
        setBgColor('#0088cc');
        break;

      case 4:
        setBgColor('#ff6666');
        break;
      default:
        setBgColor('#66ff99');
        break;
    }
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
        tabs={tabData as Array<TabDataType>}
        onTabChange={onTabChange}
        defaultActiveTabIndex={1}
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
