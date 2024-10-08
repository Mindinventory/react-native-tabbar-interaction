import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { TabBar, type TabsType } from 'react-native-bottom-tab-bar';

const { width: screenWidth } = Dimensions.get('window');

const tabData: Array<TabsType> = [
  {
    name: 'Home',
    activeTintColor: '#FFC0C7',
  },
  {
    name: 'Cart',
    activeTintColor: '#FF7128',
  },
  {
    name: 'Search',
    activeTintColor: '#0088cc',
  },
  {
    name: 'Profile',
    activeTintColor: '#ff6666',
  },
  // {
  //   name: 'Setting',
  //   activeTintColor: '#66ff99',
  // },
];

export default function App() {
  const tabs = useMemo(() => tabData, []);
  const flatListRef = useRef<FlatList>(null);

  const onTabChange = useCallback((_item: TabsType, index: number) => {
    flatListRef.current?.scrollToIndex({
      animated: true,
      index: index,
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={tabs}
        keyExtractor={(item) => item.name}
        renderItem={({ item }: { item: TabsType }) => {
          return (
            <View
              style={[
                styles.slide,
                {
                  backgroundColor: item.activeTintColor,
                },
              ]}
            >
              <Text>{item.name}</Text>
            </View>
          );
        }}
        scrollEnabled={false}
        horizontal
        bounces={false}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
      />
      <TabBar
        tabs={tabs as Array<TabsType>}
        onTabChange={onTabChange}
        // defaultActiveTabIndex={1}
        containerWidth={screenWidth}
        tabBarBackground={'#fff'}
        defaultActiveTabIndex={0}
        // transitionSpeed={100}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  slide: {
    width: screenWidth,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
