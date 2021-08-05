import * as React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Dimensions,
  View,
  Animated,
  Text,
} from 'react-native';
import * as shape from 'd3-shape';
import Svg, {Circle, Path} from 'react-native-svg';
import StaticTabbar from './StaticTabbar';

const AnimatedSvg = Animated.createAnimatedComponent(Svg);
let {width} = Dimensions.get('window');

const height = 65;

const getPath = (tabWidth, width) => {
  const left = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: 0, y: 0},
    {x: width + tabWidth / 2, y: 0},
  ]);
  const tab = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)
    .curve(shape.curveBasis)([
    {x: width + tabWidth / 2 - 100, y: 0},
    {x: width + tabWidth / 2 - 65 + -35, y: 0},
    {x: width + tabWidth / 2 - 50 + 10, y: -6},
    {x: width + tabWidth / 2 - 50 + 15, y: height - 14},
    {x: width + tabWidth / 2 + 50 - 15, y: height - 14},
    {x: width + tabWidth / 2 + 50 - 10, y: -6},
    {x: width + tabWidth / 2 + 65 - -35, y: 0},
    {x: width + tabWidth / 2 + 100, y: 0},
  ]);
  const right = shape
    .line()
    .x(d => d.x)
    .y(d => d.y)([
    {x: width, y: 0},
    {x: width * 2, y: 0},
    {x: width * 2, y: height},
    {x: 0, y: height},
    {x: 0, y: 0},
  ]);
  // console.log('LEFT >> ', left);
  // console.log('TAB >> ', tab);
  // console.log('RIGHT >> ', right);
  return ` ${tab} `;
};

export default class Tabbar extends React.PureComponent {
  value = new Animated.Value(0);

  render() {
    const {
      tabs,
      containerTopRightRadius,
      tabBarBackground,
      tabBarContainerBackground,
      containerBottomSpace,
      containerWidth,
      containerTopLeftRadius,
      containerBottomLeftRadius,
      containerBottomRightRadius
    } = this.props;
    let CustomWidth = containerWidth ? containerWidth : width;
    const {value} = this;
    const translateX = value.interpolate({
      inputRange: [0, CustomWidth],
      outputRange: [-CustomWidth, 0],
    });
    let tabBarBackgroundColor = tabBarBackground ? tabBarBackground : 'transparent';
    const tabWidth =
      tabs.length > 0
        ? CustomWidth / tabs.length
        : console.error('please add tab data');
    const d = getPath(tabWidth, CustomWidth);


    let borderTopRightRadius = containerTopRightRadius ? containerTopRightRadius : 0
    let borderTopLeftRadius = containerTopLeftRadius ? containerTopLeftRadius : 0
    let borderBottomLeftRadius = containerBottomLeftRadius ? containerBottomLeftRadius : 0
    let borderBottomRightRadius = containerBottomRightRadius ? containerBottomRightRadius : 0
    if (tabs.length > 0) {
      return (
        <>
          <View
            style={{
              backgroundColor: tabBarContainerBackground
                ? tabBarContainerBackground
                : '#fff',
              position: 'absolute',
              bottom: containerBottomSpace ? containerBottomSpace : 0,
              alignSelf: 'center',
              borderTopRightRadius,
              borderTopLeftRadius,
              borderBottomLeftRadius,
              borderBottomRightRadius,
              // height: height + 25
            }}>
            <View
              {...{
                height,
                width: CustomWidth,
                backgroundColor: tabBarContainerBackground
                  ? tabBarContainerBackground
                  : '#fff',
                alignSelf: 'center',
                borderTopRightRadius,
                borderTopLeftRadius,
                borderBottomLeftRadius,
                borderBottomRightRadius,
              }}>
              <AnimatedSvg
                width={CustomWidth * 2}
                {...{height}}
                style={{
                  transform: [{translateX}],
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Path fill={tabBarBackgroundColor} {...{d}} />
              </AnimatedSvg>
              <View style={StyleSheet.absoluteFill}>
                <StaticTabbar
                  {...this.props}
                  Hvalue={translateX}
                  {...{tabs, value}}
                />
              </View>
            </View>
            <SafeAreaView
              style={[
                {
                  alignSelf: 'center',

                  borderBottomLeftRadius,
                  borderBottomRightRadius,
                },
              ]}
            />
          </View>
        </>
      );
    } else {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>Please add tab data</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
  },
});
