import { useMemo, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { curveBasis, line } from 'd3-shape';
import { parse, interpolatePath } from 'react-native-redash';
import Animated, {
  runOnJS,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Path } from 'react-native-svg';
import { TabItem } from './TabItem';
import AnimatedCircle from './AnimatedCircle';

const AnimatedPath = Animated.createAnimatedComponent(Path);

type GenerateSvgPath = (
  position: number,
  adjustedHeight: number,
  tabContainerWidth: number,
  numOfTabs: number
) => string;

export interface TabsType {
  name: string;
  activeIcon: JSX.Element;
  inactiveIcon: JSX.Element;
  activeTintColor?: string;
  inactiveTintColor?: string;
}

export interface TabBarProps {
  tabs: Array<TabsType>;
  // containerTopRightRadius?: number;
  tabBarBackground: string;
  // tabBarContainerBackground: string;
  // containerBottomSpace?: number;
  containerWidth: number;
  // containerTopLeftRadius?: number;
  // containerBottomLeftRadius?: number;
  // containerBottomRightRadius?: number;
  activeTabBackground?: string;
  // labelStyle?: TextStyle;
  onTabChange: (tab: TabsType, index: number) => void;
  defaultActiveTabIndex?: number;
  // transitionSpeed?: number;
}

const SCALE = 1;
const TAB_BAR_HEIGHT = 64;

const generateTabShapePath: GenerateSvgPath = (
  position,
  adjustedHeight,
  tabContainerWidth,
  numOfTabs
) => {
  const adjustedWidth = tabContainerWidth / numOfTabs;
  const tabX = adjustedWidth * position;

  const lineGenerator = line().curve(curveBasis);
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (65 + 35) * SCALE, 0],
    [tabX - (50 - 10) * SCALE, -6 * SCALE],
    [tabX - (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 10) * SCALE, -6 * SCALE],
    [tabX + (65 + 35) * SCALE, 0],
    [tabX + 100 * SCALE, 0],
  ]);

  return `${tab}`;
};

export const getPathXCenter = (currentPath: string) => {
  const curves = parse(currentPath).curves;
  const startPoint = curves[0]!.to;
  const endPoint = curves[curves.length - 1]!.to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};
export const getPathXCenterByIndex = (tabPaths: any[], index: number) => {
  const curves = tabPaths[index].curves;
  const startPoint = curves[0].to;
  const endPoint = curves[curves.length - 1].to;
  const centerX = (startPoint.x + endPoint.x) / 2;
  return centerX;
};

export const TabBar = (props: TabBarProps) => {
  const {
    tabs,
    // activeTabBackground,
    // defaultActiveTabIndex,
    onTabChange,
    containerWidth,
    tabBarBackground,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const numOfTabs = useMemo(
    () => (tabs.length > 2 ? tabs.length : 3),
    [tabs.length]
  );
  const containerPath = useMemo(() => {
    return `M0,0L${containerWidth},0L${containerWidth},0L${containerWidth},${TAB_BAR_HEIGHT}L0,${TAB_BAR_HEIGHT}L0,0`;
  }, [containerWidth]);

  const curvedPaths = useMemo(() => {
    return Array.from({ length: numOfTabs }, (_, index) => {
      const tabShapePath = generateTabShapePath(
        index + 0.5,
        TAB_BAR_HEIGHT,
        containerWidth,
        numOfTabs
      );
      return parse(`${tabShapePath}`);
    });
  }, [containerWidth, numOfTabs]);

  const circleXCoordinate = useSharedValue(0);
  const progress = useSharedValue(1);
  const handleMoveCircle = (currentPath: string) => {
    circleXCoordinate.value = getPathXCenter(currentPath);
  };

  const animatedProps = useAnimatedProps(() => {
    const currentPath = interpolatePath(
      progress.value,
      Array.from({ length: curvedPaths.length }, (_, index) => index + 1),
      curvedPaths
    );
    runOnJS(handleMoveCircle)(currentPath);
    return {
      d: `${containerPath} ${currentPath}`,
    };
  });

  const handleTabPress = (index: number) => {
    progress.value = withTiming(index + 1);
    setCurrentIndex(index);
  };

  if (tabs.length > 5) {
    return (
      <View style={styles.emptyContainer}>
        <Text>You can add maximum five tabs</Text>
      </View>
    );
  } else if (tabs.length < 2) {
    return (
      <View style={styles.emptyContainer}>
        <Text>Please add tab data</Text>
      </View>
    );
  }

  return (
    <View style={[styles.tabBarContainer]}>
      <Svg
        width={containerWidth}
        height={TAB_BAR_HEIGHT}
        style={styles.shadowMd}
      >
        {/* transparent */}
        <AnimatedPath
          fill={tabBarBackground ? tabBarBackground : '#fff'}
          animatedProps={animatedProps}
        />
      </Svg>
      <AnimatedCircle circleX={circleXCoordinate} />
      <View
        style={[
          styles.tabItemsContainer,
          {
            height: TAB_BAR_HEIGHT,
          },
        ]}
      >
        {tabs.map((val, index) => {
          return (
            <TabItem
              key={index.toString()}
              label={val.name as string}
              activeIcon={val.activeIcon}
              inactiveIcon={val.inactiveIcon}
              activeIndex={1}
              index={index}
              onTabPress={() => {
                handleTabPress(index);
                if (val !== undefined) {
                  onTabChange(val, index);
                }
              }}
              containerWidth={containerWidth}
              curvedPaths={curvedPaths}
              currentIndex={currentIndex}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: 0,
    zIndex: 2,
    marginHorizontal: 'auto',
  },
  tabItemsContainer: {
    position: 'absolute',
    flexDirection: 'row',
    width: '100%',
  },
  shadowMd: {
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 3 },
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: TAB_BAR_HEIGHT,
  },
});
