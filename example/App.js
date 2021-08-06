import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
import LottieView from 'lottie-react-native';

const activeHome = (isPlay) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/bar.json`)} autoPlay={isPlay} loop={false} />
    </View>
  )
}

const activeList = (isPlay) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/cart.json`)} autoPlay={isPlay} loop={false} />
    </View>
  )
}

const activeCamera = (isPlay) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/search.json`)} autoPlay={isPlay} loop={false} />
    </View>
  )
}

const activeNotification = (isPlay) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/setting.json`)} autoPlay={isPlay} loop={false} />
    </View>
  )
}

const activeUser = (isPlay) => {
  return (
    <View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/user.json`)} autoPlay={isPlay} loop={false} />
    </View>
  )
}

const tabData = [
  {
    name: 'Home',
    activeIcon: activeHome(true),
    inactiveIcon: (<View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/bar.json`)} autoPlay={false} loop={false} />
    </View>)

  },
  {
    name: 'Cart',
    activeIcon: null,
    inactiveIcon: (<View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/cart.json`)} autoPlay={false} loop={false} />
    </View>)
  },
  {
    name: 'Search',
    activeIcon: null,
    inactiveIcon: (<View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/search.json`)} autoPlay={false} loop={false} />
    </View>)
  },

  {
    name: 'Profile',
    activeIcon: null,
    inactiveIcon: (<View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/user.json`)} autoPlay={false} loop={false} />
    </View>)
  },
  {
    name: 'Setting',
    activeIcon: null,
    inactiveIcon: (<View style={{ width: 40, height: 40 }}>
      <LottieView source={require(`./assets/setting.json`)} autoPlay={false} loop={false} />
    </View>)
  },
]

const App = () => {
  const [tabs, setTabs] = useState(tabData)
  const [bgColor, setBgColor] = useState('#FFC0C7')

  const onTabChange = (item) => {
    let tempTabs =[...tabs]
 
    setTimeout(() => {                  
      tempTabs.map((val) => {
        if (item.name === 'Home' && val.name === 'Home') {
          val.activeIcon = Object.assign({}, activeHome(true))
          setBgColor('#FFC0C7')
        } else if (item.name === 'Cart' && val.name === 'Cart') {
          val.activeIcon = Object.assign({}, activeList(true))
          setBgColor('#FF7128')
        } else if (item.name === 'Search' && val.name === 'Search') {
          val.activeIcon = Object.assign({}, activeCamera(true))
          setBgColor('#0088cc')
        } else if (item.name === 'Setting' && val.name === 'Setting') {
          val.activeIcon = Object.assign({}, activeNotification(true))
          setBgColor('#ff6666')
        } else if (item.name === 'Profile' && val.name === 'Profile') {
          val.activeIcon = Object.assign({}, activeUser(true))
          setBgColor('#66ff99')
        }
        else {
          val.activeIcon = null
        }
      })

      setTabs(tempTabs)
    }, 500);
  }
  return (

    <View style={[styles.container]}>
      <View style={{ backgroundColor: bgColor, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>App component</Text>
      </View>

      <Tabbar
        tabs= {tabs}          
        tabBarBackground={bgColor}        
        labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11 }}
        onTabChange={(item) => onTabChange(item)}
      />
    </View>
  )

}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
