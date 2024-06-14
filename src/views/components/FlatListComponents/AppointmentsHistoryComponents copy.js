/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import BasicStyles from 'views/styles/BasicStyles';

// Icons
import ic_user from 'assets/icons/ic_user.png';

const AppointmentsHistoryComponents = props => {
  const {item, removerFunction, dataArr, index, theme} = props;

  const navigateToDetail = () => {
    props.navigation.navigate('AppointmentDetail', {
      cardDetails: {
        cardName: item.patient,
        cardNo: item.patientId,
        type: 'History',
      },
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        // elevation: 5 * theme.scale,
        // marginVertical: wp(1),
        marginHorizontal: theme.scale * 8,
        padding: theme.scale * 12,
        borderRadius: theme.scale * 8,
        flexDirection: 'row',
      }}>
      <Image
        source={ic_user}
        resizeMode="cover"
        style={{
          width: theme.scale * 30,
          aspectRatio: 1 / 1,
          marginRight: theme.scale * 12,
          marginTop: theme.scale * 8,
        }}
      />
      <TouchableOpacity
        onPress={navigateToDetail}
        style={[BasicStyles.marginLeft, BasicStyles.flexOne]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: theme.scale * 16,
              fontWeight: '600',
              color: theme.color.primary,
              flex: 1,
            }}>
            Name : {item.patient}
          </Text>
          <Text
            style={{
              fontSize: theme.scale * 12,
              fontWeight: '600',
              color: theme.color.text,
              textAlign: 'right',
            }}>
            {item.upcomingDate}
          </Text>
        </View>

        <Text
          style={{
            fontSize: theme.scale * 14,
            fontWeight: '500',
            color: theme.color.text,
            flex: 1,
          }}>
          Card Id : {item.patientId}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentsHistoryComponents;
