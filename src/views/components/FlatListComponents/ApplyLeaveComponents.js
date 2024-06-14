/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';
import React from 'react';
import CustomIcon from '../../layouts/CustomIcon';
import ic_hospital from 'assets/icons/ic_hospital.jpg';
// Icons

const ApplyLeaveComponents = props => {
  const {item, removerFunction, dataArr, index, theme} = props;
  const {
    Image: img,
    _id,
    // Speciality,
    _from_date,
    _to_date,
    _from_time,
    _to_time,
    _remarks,
    _request_by,
    _entry_datetime,
    _leave_status,
  } = item;
  console.log('itemApply Leave', item);
  const navigateToDetail = () => {
    props.navigation.navigate('LeaveDetail', {
      allDetail: item,
    });
  };

  const cancelItem = () => {
    Alert.alert('Remove!', 'Are you sure you want to cancelled Leave', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Yes', onPress: () => cancelledItem()},
    ]);
  };
  const cancelledItem = () => {
    props.cancelItembyId(_id);
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
          <View style={{flex: 1}}>
            <Text
              style={{
                fontSize: theme.scale * 18,
                fontWeight: '600',
                color: theme.color.primary,
                marginBottom: 5,
              }}>
              {/* Applied By {_request_by} */}
              {item.title}
            </Text>
            <Text
              style={[styles(theme).textStyle, {textTransform: 'capitalize'}]}>
              {item.title2}
              {/* {_from_date}:{_from_time} To {_to_date}:{_to_time} */}
            </Text>

            {/* <Text style={styles(theme).textStyle}>
              {item.appointmentFor} General Chechup
            </Text> */}
          </View>
        </View>

        <View
          style={{
            flex: 1,
            // backgroundColor: theme.color.whitePrimary,
            backgroundColor:
              _leave_status == 0
                ? '#f5e1e9'
                : _leave_status == 1
                ? theme.color.whitePrimary
                : '',
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
              {item.bottomText1}
              {/* {_entry_datetime.split(' ')[0]} */}
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
              {''}
              {item.bottomText2}
              {/* {_entry_datetime.split(' ')[1]} */}
            </Text>
          </View>

          <View>
            {item.bottomText3 === 'Cancelled' ? (
              <Text
                style={{
                  color: theme.color.text,
                  fontSize: 12,
                  fontWeight: '600',
                }}>
                Cancelled
              </Text>
            ) : item.bottomText3 === 'Leave Cancel' ? (
              <TouchableOpacity
                style={{flexDirection: 'row', alignItems: 'center'}}
                onPress={cancelItem}>
                <Text
                  style={{
                    color: theme.color.text,
                    fontSize: 12,
                    fontWeight: '600',
                    backgroundColor: '#f5e1e9',
                    padding: 8,
                    borderRadius: 10,
                  }}>
                  Leave Cancel
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
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

export default ApplyLeaveComponents;
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
