/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Icons
import ic_cross from 'assets/icons/ic_cross.png';

const TestsComponent = props => {
  const {item, removerFunction, dataArr, index, theme} = props;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        elevation: 5 * theme.scale,
        marginVertical: wp(0.7),
        marginHorizontal: wp(2),
        padding: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: wp(4), fontWeight: '600', color: '#222'}}>
          {item.testName}
        </Text>
        <Text style={{fontSize: wp(3.3), fontWeight: '500', color: '#555'}}>
          {item.desc}
        </Text>
      </View>
      <TouchableOpacity onPress={removerFunction('testsData', dataArr, index)}>
        <Image
          source={ic_cross}
          resizeMode="cover"
          style={{height: hp(3), aspectRatio: 1 / 1}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TestsComponent;
