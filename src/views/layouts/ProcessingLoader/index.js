import React from 'react';
import {View, StyleSheet, ActivityIndicator} from 'react-native';

const ProcessingLoader = () => (
  <View style={styles.modalContainer}>
    <ActivityIndicator size="large" color="#0468e1" style={{elevation: 5}} />
  </View>
);

export default ProcessingLoader;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 150,
    elevation: 5,
    shadowColor: '#9993',
  },
});
