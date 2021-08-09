# React Native Tabbar Interaction
This instructions will help you to migrate version from ***1.0.0*** to ***2.1.4***

# Now you can use

```js

import TabBar from "@mindinventory/react-native-tab-bar-interaction";
...

const tabs = [
  {
    name: 'Home',
    activeIcon: <Icon name="home" color="#fff" size={25} />,
    inactiveIcon: <Icon name="home" color="#4d4d4d" size={25} />
  },
  {
    name: 'list',
    activeIcon: <Icon name="list-ul" color="#fff" size={25} />,
    inactiveIcon: <Icon name="list-ul" color="#4d4d4d" size={25} />
  },
  {
    name: 'camera',
    activeIcon: <Icon name="camera" color="#fff" size={25} />,
    inactiveIcon: <Icon name="camera" color="#4d4d4d" size={25} />
  },
  {
    name: 'Notification',
    activeIcon: <Icon name="bell" color="#fff" size={25} />,
    inactiveIcon: <Icon name="bell" color="#4d4d4d" size={25} />
  },
  {
    name: 'Profile',
    activeIcon: <Icon name="user" color="#fff" size={25} />,
    inactiveIcon: <Icon name="user" color="#4d4d4d" size={25} />
  },

];
...

return (
  <Tabbar
    tabs={tabs}
    tabBarContainerBackground='#fff'
    tabBarBackground='#6699ff'
    activeTabBackground='#6699ff'
    labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11 }}
    onTabChange={() => console.log('Tab changed')}
  />
);

```
# Insted of

```js

import TabBar from "@mindinventory/react-native-tab-bar-interaction";
...
  render() {
      return (
          <TabBar bgNavBar="white" bgNavBarSelector="white" stroke="skyblue">
            <TabBar.Item
                icon={require('./tab1.png')}
                selectedIcon={require('./tab1.png')}
                title="Tab1"
                screenBackgroundColor={{ backgroundColor: '#008080' }}
            >
              <View>
                  {/*Page Content*/}
              </View>
            </TabBar.Item>
            <TabBar.Item
                icon={require('./tab2.png')}
                selectedIcon={require('./tab1.png')}
                title="Tab2"
                screenBackgroundColor={{ backgroundColor: '#F08080' }}
            >
                <View>
                    {/*Page Content*/}
                </View>
            </TabBar.Item>
            <TabBar.Item
                icon={require('./tab3.png')}
                selectedIcon={require('./tab1.png')}
                title="Tab3"
                screenBackgroundColor={{ backgroundColor: '#485d72' }}
            >
              <View>
                  {/*Page Content*/}
              </View>
            </TabBar.Item>
          </TabBar>
      );
    }
```

