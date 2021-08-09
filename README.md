# React Native Tabbar Interaction

Beautiful Tabbar Interaction with Sliding Inset FABs,
made with React Native.

Check it out on Béhance (https://www.behance.net/gallery/68043143/Tab-bar-interaction-with-animated-icons)

Check it out on Dribbble (https://dribbble.com/shots/4844696-Tab-bar-interaction-with-animated-icons)

<img src="https://cdn.dribbble.com/users/1233499/screenshots/4844696/preview.gif" >

# Installation

using npm:

```
npm install mindinventory/react-native-tab-bar-interaction
```

using yarn:

```
yarn add @mindinventory/react-native-tab-bar-interaction
```

### Supported platform

- Android
- Ios

# Usage

```js

import Tabbar from "@mindinventory/react-native-tab-bar-interaction";
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
    tabBarContainerBackground='#6699ff'
    tabBarBackground='#fff'
    activeTabBackground='#6699ff'
    labelStyle={{ color: '#4d4d4d', fontWeight: '600', fontSize: 11 }}
    onTabChange={() => console.log('Tab changed')}
  />
);

```

## Component props

### Tabbar

| prop                      | value    | required/optional | description                                 |
| ------------------------- | -------- | ----------------- | -------------------------------------------- |
| tabs                      | array    | required          | It is user for showing icon and label.       |
| tabBarContainerBackground | string   | optional          | Use for change tabBar container color.       |
| tabBarBackground          | string   | required          | Use for change tabBar background color.      |
| activeTabBackground       | string   | optional          | Use for change active tab background color.  |
| labelStyle                | style    | optional          | Use for apply style on tab label.            |
| onTabChange               | function | optional          | Use to perform any action when click on tab. |
| containerBottomSpace      | number   | optional          | Use to add space between tabBar container and from bottom of screen. |
| containerWidth            | number   | optional          | Use for set width of tabBar container        |
| containerTopRightRadius   | number   | optional          | Use for add top right radius on tabBar container |
| containerTopLeftRadius    | number   | optional          | Use for add top left radius on tabBar container |
| containerBottomLeftRadius | number   | optional          | Use for add bottom left radius on tabBar container |
| containerBottomRightRadius| number   | optional          | Use for add bottom right radius on tabBar container |

### tabs

| properties                | value     | required/optional | description                                 |
| ------------------------- | --------  | ----------------- | ------------------------------------------- |
| name                      | string    | required          | use for showing tab label.                  |
| activeIcon                | component | required          | Use for showing tab active icon/image.      |
| inactiveIcon              | component | required          | Use for showing tab inactiveIcon icon/image.|


## Dependencies

- `react-native-svg`

# Version Migration

### Version: 2.0.1

How to migrate version [**1.0.0** to **2.0.1**](VERSION_MIGRATION.md).

# LICENSE!

React-native-tabbar-interaction is [MIT-licensed](https://github.com/Mindinventory/react-native-tabbar-interaction/blob/master/LICENSE).

# Let us know!

We’d be really happy if you send us links to your projects where you use our component. Just send an email to sales@mindinventory.com And do let us know if you have any questions or suggestion regarding our work.
