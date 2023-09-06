import { StyleSheet } from 'react-native';

export const tabBarStyle = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    alignSelf: 'center',
  },
  svgView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeAreaView: {
    alignSelf: 'center',
  },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
