import React from 'react';
import {View, Text, Image, StyleSheet, Platform} from 'react-native';
import dashedBorderImage from '../../../assets/images/dash.png';

const InvestigationPresComponent = props => {
  const {item, removerFunction, dataArr, index, theme, lastItem} = props;

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{height: 24, width: 24, tintColor: '#42a5f5'}}
          source={require('../../../assets/images/test.png')}
        />
        <View style={{marginHorizontal: 18, bottom: 4}}>
          <Text style={styles.medicineName}> {item.name}</Text>
          <Text style={styles.medicineInstruction}>
            {item.dosages} {item.instruction}
          </Text>
        </View>
      </View>

      {Platform.OS === 'android'
        ? !lastItem && <View style={styles.separator}></View>
        : !lastItem && (
            <Image
              source={dashedBorderImage}
              style={{
                height: 1,
                top: 15,
                alignItems: 'center',
                alignSelf: 'center',
              }}
            />
          )}

      {/* Conditionally render the separator if it's not the last item */}
      {/* {!lastItem && <View style={styles.separator}></View>} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 15,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  medicineName: {
    fontSize: 15,
    color: '#263238',
    fontWeight: '600',
    marginBottom: 5,
  },
  medicineInstruction: {
    fontSize: 13,
    // marginStart: 6,
    color: '#546e7a',
    // marginBottom: 4,
  },
  separator: {
    width: '100%',
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    borderStyle: 'dashed',
    top: 15,
  },
});

export default InvestigationPresComponent;
