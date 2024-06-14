import {StyleSheet, Platform, StatusBar} from 'react-native';
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 70 : StatusBar.currentHeight;
export default StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
});
