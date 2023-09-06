import { StyleSheet } from 'react-native';

export const staticTabBarStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    zIndex: 100,
  },
  activeIcon: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 11,
    fontWeight: '600',
    // marginTop: 3,
    color: '#000',
  },
  activeIconView: {
    position: 'absolute',
    top: -8,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 50,
  },
});
