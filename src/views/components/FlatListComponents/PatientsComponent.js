/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import CustomIcon from '../../layouts/CustomIcon';
import ic_user from 'assets/icons/ic_user.png';
// Icons

const PatientsComponent = props => {
  const {item, removerFunction, dataArr, index, theme} = props;
  const navigateToDetail = () => {
    props.navigation.navigate('AppointmentDetail', {
      allDetail: item,
    });
  };
  // this.theme = props.route.params.theme; // this came as initialParam

  // patient
  // patientId
  // lastDate
  // upcomingDate

  return (
    <TouchableOpacity>
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
            source={ic_user}
            // source={item.image === '' ? ic_user : {uri: item.image}}
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
              {/* {item.patientName} */}
              Prince Kumar
            </Text>
            {/* <Text style={styles(theme).textStyle}>{item.patientId}</Text> */}
            <Text style={styles(theme).textStyle}>Token No : {1234566}</Text>
            <Text style={styles(theme).textStyle}>Mobile : {8989898989}</Text>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            // backgroundColor: theme.color.whitePrimary,
            backgroundColor:
              item.gender == 1
                ? theme.color.whitePrimary
                : item.gender == 2
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
              47 Years
              {/* {item.dob} */}
              {/* {appointmentDate} */}
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <CustomIcon
              iconName={'blood-drop'}
              iconSize={15}
              iconColor={theme.color.primary}
              iconType="Fontisto"
            />
            <Text style={{color: '#000', fontWeight: '500', fontSize: 13}}>
              {' '}
              {item.bloodGroup}
            </Text>
          </View> */}

          <Text
            style={{
              color: theme.color.text,
              fontSize: 12,
              fontWeight: '600',
            }}>
            {/* {item.gender === 0 ? 'Male' : 'Female'} */}
            {/* {item.gender == 1 ? 'Male' : item.gender == 2 ? 'Female' : 'Other'} */}
            Male
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

export default PatientsComponent;
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
