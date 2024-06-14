/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import CustomIcon from '../../layouts/CustomIcon';
// Icons
import ic_user from 'assets/icons/ic_user.png';

const CurrentAppointmentsComponent = props => {
  const {item, removerFunction, dataArr, index, theme} = props;
  const {
    patientImage,
    appointmentId,
    // Speciality,
    fromTime,
    toTime,
    patientName,
    bookingDate,
    facilityName,
    appointmentDate,
    time,
    status,
  } = item;
  const navigateToDetail = () => {
    props.navigation.navigate('AppointmentDetail', {
      allDetail: item,
    });
  };

  return (
    <TouchableOpacity onPress={navigateToDetail}>
      <View
        style={{
          flex: 1,
          backgroundColor: theme.color.whitePrimary,
          elevation: 3,
          marginVertical: theme.scale * 3,
          marginHorizontal: theme.scale * 3,
          // padding: theme.scale * 16,
          borderRadius: theme.scale * 6,
          borderWidth: 0.5,
          borderColor: theme.color.secondary,
        }}>
        <View style={[styles(theme).directionRowCenter, {padding: 12}]}>
          <Image
            // source={ic_user}
            source={patientImage === '' ? ic_user : {uri: patientImage}}
            resizeMode="cover"
            style={{
              width: 70,
              height: 70,
              aspectRatio: 1 / 1,
              marginRight: theme.scale * 12,
              borderRadius: 5,
            }}
          />
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: theme.scale * 18,
                fontWeight: '600',
                color: theme.color.primary,
                marginBottom: 5,
              }}>
              {patientName}
            </Text>
            {/* <Text style={styles(theme).textStyle}>{item.patientId}</Text> */}
            <Text style={styles(theme).textStyle}>
              Hospital Name: {facilityName}
            </Text>
            <Text style={styles(theme).textStyle}>
              Booking Date: {bookingDate}
            </Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            // backgroundColor: theme.color.secondary,
            backgroundColor:
              item.aptStatus === 'Completed'
                ? theme.color.whitePrimary
                : item.aptStatus === 'Cancelled'
                ? '#f5e1e9'
                : '#faf0db',
            borderBottomLeftRadius: 6,
            borderBottomRightRadius: 6,
            paddingVertical: 5,
            paddingHorizontal: 20,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginLeft: 0.1,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomIcon
              iconName={'calendar-alt'}
              iconSize={15}
              iconColor={theme.color.primary}
              iconType="FontAwesome5"
            />
            <Text style={{color: '#000', fontSize: 13}}>
              {' '}
              {appointmentDate.split(' ')[0]}
              {/* {appointmentDate} */}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomIcon
              iconName={'clock'}
              iconSize={15}
              iconColor={theme.color.primary}
              iconType="FontAwesome5"
            />
            <Text style={{color: '#000', fontWeight: '500', fontSize: 13}}>
              {' '}
              {fromTime}: {toTime}
            </Text>
          </View>

          <Text
            style={{
              color: theme.color.text,
              fontSize: 12,
              fontWeight: '600',
            }}>
            {status === 1
              ? 'Pending'
              : status === 2
              ? 'Completed'
              : status === 3
              ? 'Cancelled'
              : 'Laps'}
          </Text>
        </View>

        {/* <View style={styles(theme).directionRowCenter}>
        <Text style={styles(theme).textStyle}>{item.patientId}</Text>
      </View> */}

        {/* <Text style={styles(theme).textStyle}>
        Status :{' '}
        <Text
          style={{
            color:
              item.aptStatus === 'Completed'
                ? theme.color.greenPrimary
                : item.aptStatus === 'Cancelled'
                ? '#eb3b00'
                : theme.color.yellowPrimary,
            fontWeight: '500',
          }}>
          {item.aptStatus}
        </Text>
      </Text> */}

        {/* <Text
        style={[
          styles(theme).textStyle,
          {
            fontSize: theme.scale * 12,
            alignSelf: 'flex-end',
            fontWeight: '500',
          },
        ]}>
        {item.appointmentDate}
      </Text> */}
      </View>
    </TouchableOpacity>
  );
};

export default CurrentAppointmentsComponent;
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
