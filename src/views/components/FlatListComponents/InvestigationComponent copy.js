/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons

const InvestigationComponent = props => {
  const {item, removerFunction, dataArr, index, theme} = props;

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        backgroundColor: '#fff',
        elevation: 5 * theme.scale,
        marginVertical: 4,
        marginHorizontal: 16,
        padding: 12,
        borderRadius: 6,
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '600',
            color: '#222',
            flex: 1,
          }}>
          {item._name}
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontWeight: '600',
            color: '#333',
            textAlign: 'right',
          }}>
          Instruction :{item._instruction}
        </Text>
      </View>

      {/* <Text
        style={{
          fontSize: 14,
          fontWeight: '500',
          color: '#333',
          flex: 1,
        }}>
        Dose : {item._dosage}
      </Text> */}

      {/* <Text
        style={{
          fontSize: wp(3),
          fontWeight: '500',
          color: '#444',
          textAlign: 'right',
        }}>
        Upcoming : {item.qty}
      </Text> */}
    </TouchableOpacity>
  );
};

export default InvestigationComponent;
