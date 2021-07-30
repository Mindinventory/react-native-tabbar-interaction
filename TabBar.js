import * as React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Text,
} from "react-native";
import * as shape from "d3-shape";
import Svg, { Circle, Path } from "react-native-svg";
import StaticTabbar from "./StaticTabbar";

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
let { width } = Dimensions.get("window");
const height = 60;

const getPath = (tabWidth) => {
  const left = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: 0, y: 0 },
    { x: width + tabWidth / 2, y: 0 },
  ]);
  const tab = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)
    .curve(shape.curveBasis)([
    { x: width + tabWidth / 2 - 100, y: 0 },
    { x: width + tabWidth / 2 - 65 + -35, y: 0 },
    { x: width + tabWidth / 2 - 50 + 10, y: -6 },
    { x: width + tabWidth / 2 - 50 + 15, y: height - 9 },
    { x: width + tabWidth / 2 + 50 - 15, y: height - 9 },
    { x: width + tabWidth / 2 + 50 - 10, y: -6 },
    { x: width + tabWidth / 2 + 65 - -35, y: 0 },
    { x: width + tabWidth / 2 + 100, y: 0 },
  ]);
  const right = shape
    .line()
    .x((d) => d.x)
    .y((d) => d.y)([
    { x: width, y: 0 },
    { x: width * 2, y: 0 },
    { x: width * 2, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  return `${left} ${tab} ${right}`;
};

export default class Tabbar extends React.PureComponent {
  value = new Animated.Value(0);

  render() {
    const { tabs, tabBarBackground, tabBarContainerBackground } = this.props;
    const { value } = this;
    const translateX = value.interpolate({
      inputRange: [0, width],
      outputRange: [-width, 0],
    });
    let tabBarBackgroundColor = tabBarBackground ? tabBarBackground : "#ccc";
    const tabWidth =
      tabs.length > 0
        ? width / tabs.length
        : console.error("please add tab data");
    const d = getPath(tabWidth);

    if (tabs.length > 0) {
      return (
        <>
          <View
            style={{
              backgroundColor: tabBarContainerBackground
                ? tabBarContainerBackground
                : "#fff",
              position: "absolute",
              bottom: 0,
            }}
          >
            <View
              {...{
                height,
                width,
              }}
            >
              <AnimatedSvg
                width={width * 2}
                {...{ height }}
                style={{
                  transform: [{ translateX }],
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Path fill={tabBarBackgroundColor} {...{ d }} />
              </AnimatedSvg>
              <View style={StyleSheet.absoluteFill}>
                <StaticTabbar
                  {...this.props}
                  Hvalue={translateX}
                  {...{ tabs, value }}
                />
              </View>
            </View>
            <SafeAreaView
              style={[
                styles.container,
                { backgroundColor: tabBarBackgroundColor },
              ]}
            />
          </View>
        </>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Please add tab data</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
  },
});
