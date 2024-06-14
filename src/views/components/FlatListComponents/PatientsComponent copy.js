/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons

const PatientsComponent = props => {
  const {item, removerFunction, dataArr, index, theme} = props;

  // this.theme = props.route.params.theme; // this came as initialParam

  // patient
  // patientId
  // lastDate
  // upcomingDate

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: '#fff',

        // marginVertical: wp(1),
        marginHorizontal: theme.scale * 16,
        padding: theme.scale * 12,
        borderRadius: theme.scale * 6,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: theme.scale * 16,
            fontWeight: '600',
            color: '#222',
            flex: 1,
          }}>
          {item.patient}
        </Text>
        <Text
          style={{
            fontSize: theme.scale * 12,
            fontWeight: '600',
            color: '#333',
            textAlign: 'right',
          }}>
          {item.lastDate}
        </Text>
      </View>

      <Text
        style={{
          fontSize: theme.scale * 14,
          fontWeight: '500',
          color: '#333',
          flex: 1,
        }}>
        ID : {item.patientId}
      </Text>

      <Text
        style={{
          fontSize: theme.scale * 12,
          fontWeight: '500',
          color: '#444',
          textAlign: 'right',
        }}>
        Upcoming : {item.upcomingDate}
      </Text>
    </TouchableOpacity>
  );
};

export default PatientsComponent;
