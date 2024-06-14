/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import CustomIcon from '../../layouts/CustomIcon';
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
    <TouchableOpacity onPress={navigateToDetail}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.color.whitePrimary,
          elevation: 3,
          marginVertical: theme.scale * 7,
          marginHorizontal: theme.scale * 15,
          // padding: theme.scale * 16,
          borderRadius: theme.scale * 10,
        }}>
        <View style={[styles(theme).directionRowCenter, {padding: 12}]}>
          <Image
            source={ic_user}
            resizeMode="cover"
            style={{
              width: 70,
              height: 70,
              aspectRatio: 1 / 1,
              marginRight: theme.scale * 12,
            }}
          />
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: theme.scale * 18,
                fontWeight: '600',
                color: theme.color.primary,
              }}>
              {item.patient}
            </Text>
            <Text style={styles(theme).textStyle}>
              Card Id : {item.patientId}
            </Text>
            {/* <Text style={styles(theme).textStyle}>
            {' '}
            Last Appointment : {item.lastDate}
          </Text> */}
          </View>

          {/* <TouchableOpacity>
          <CustomIcon
            iconName={'dots-three-vertical'}
            iconSize={18}
            iconColor={'green'}
            iconStyle={{marginVertical: theme.scale * 8}}
            iconType="Entypo"
          />
        </TouchableOpacity> */}
        </View>

        <View
          style={{
            flex: 1,
            backgroundColor: theme.color.secondary,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
            paddingVertical: 10,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomIcon
              iconName={'calendar-alt'}
              iconSize={18}
              iconColor={theme.color.primary}
              iconStyle={{marginVertical: theme.scale * 8}}
              iconType="FontAwesome5"
            />
            <Text style={{color: '#000', fontSize: 13}}> 15 May</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomIcon
              iconName={'clock'}
              iconSize={18}
              iconColor={theme.color.primary}
              iconStyle={{marginVertical: theme.scale * 8}}
              iconType="FontAwesome5"
            />
            <Text style={{color: '#000', fontSize: 13}}> 11:00 - 12:00</Text>
          </View>

          <View>
            <Text
              style={{
                color:
                  item.aptStatus === 'Completed'
                    ? '#28a745'
                    : item.aptStatus === 'Cancelled'
                    ? 'red'
                    : theme.color.yellowPrimary,
                fontSize: 12,

                padding: 8,
                paddingHorizontal: 12,
                borderRadius: 20,
                width: 100,
                textAlign: 'center',
              }}>
              Completed
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentsHistoryComponents;
const styles = theme =>
  StyleSheet.create({
    textStyle: {
      fontSize: theme.scale * 14,
      fontWeight: '400',
      color: theme.color.text,
    },

    directionRowCenter: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
