/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons

const MedicinesPrescriptionComponent = props => {
  const {item, removerFunction, dataArr, index, theme} = props;

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: theme.scale * 16,
          fontWeight: '400',
          color: '#222',
          flex: 1,
        }}>
        {item._name}
      </Text>
      <Text
        style={{
          fontSize: theme.scale * 12,
          fontWeight: '400',
          color: theme.color.textLightBlack,
          textAlign: 'right',
        }}>
        1 X 2
      </Text>
    </View>
  );
};

export default MedicinesPrescriptionComponent.js;
