import { useCallback, useMemo, useRef } from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import { TabBar } from 'react-native-bottom-tab-bar';

const { width: screenWidth } = Dimensions.get('window');
interface TabDataType {
  name: string;
  id: number;
  bgColor: string;
}

const tabData: Array<TabDataType> = [
  {
    name: 'Home',
    id: 1,
    bgColor: '#FFC0C7',
  },
  {
    name: 'Cart',
    id: 2,
    bgColor: '#FF7128',
  },
  {
    name: 'Search',
    id: 3,
    bgColor: '#0088cc',
  },
  {
    name: 'Profile',
    id: 4,
    bgColor: '#ff6666',
  },
  // {
  //   name: 'Setting',
  //   id: 5,
  // bgColor: '#66ff99'
  // },
];

export default function App() {
  const tabs = useMemo(() => tabData, []);
  const flatListRef = useRef<FlatList>(null);

  const onTabChange = useCallback((_item: TabDataType, index: number) => {
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
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }: { item: TabDataType }) => {
          return (
            <View
              style={[
                styles.slide,
                {
                  backgroundColor: item.bgColor,
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
        tabs={tabs as Array<TabDataType>}
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
