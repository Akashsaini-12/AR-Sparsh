/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from 'react-native';
import React from 'react';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {horizontalScale} from 'views/styles/CustomMetrics';

// Icons
const UpcomingAppointmentsComponent = props => {
  const {item, theme} = props;

  const {id, date, time, patient, problem} = item;
  console.log(item, 'Iteeemmmss');
  // const dateString = '2023-07-25';
  const dateString = item.bottomText1;
  function formatDate(inputDate) {
    var parts = inputDate.split('-');
    var formattedDate =
      parts[2] +
      '-' +
      // parts[1].padStart(2, '0') +
      '-' +
      parts[0].padStart(2, '0');
    return formattedDate;
  }
  const datess = formatDate(dateString);
  const dates = new Date(datess);

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
  const dayName = daysOfWeek[dates.getDay()];
  console.log('dayNamedayName', dayName);

  return (
    <TouchableOpacity
      style={styles(theme).container}
      onPress={() =>
        props.navigation.navigate('AppointmentDetail', {allDetail: item})
      }>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View
          style={{
            elevation: 5,
            backgroundColor: theme.color.primary,
            padding: theme.scale * 8,
            marginRight: theme.scale * 16,
            borderRadius: theme.scale * 8,
          }}>
          <Text
            style={{
              fontSize: theme.scale * 16,
              fontWeight: '600',
              color: theme.color.whitePrimary,
              width: theme.scale * 48,
              textAlign: 'center',
              textAlignVertical: 'center',
              top: Platform.OS === 'android' ? 0 : 14,
              height: theme.scale * 70,
            }}>
            {item.bottomText1.substr(0, 7)}
            {` `} {dayName}
          </Text>
        </View>

        <View>
          <Text
            style={{
              fontSize: theme.scale * 12,
              fontWeight: '300',
              color: theme.color.whitePrimary,
            }}>
            {/* {item.fromTime} : {item.toTime} */}
            {item.bottomText2}
          </Text>
          <Text
            style={{
              fontSize: theme.scale * 16,
              fontWeight: '600',
              color: theme.color.whitePrimary,
            }}>
            {item.title}
          </Text>

          <Text
            style={{
              fontSize: theme.scale * 12,
              fontWeight: '300',
              color: theme.color.whitePrimary,
            }}>
            {item.title2}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default UpcomingAppointmentsComponent;

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.color.themeSecondaryBlue,
      elevation: 5,
      marginVertical: theme.scale * 6,
      marginRight: theme.scale * 14,
      paddingHorizontal: theme.scale * 16,
      padding: theme.scale * 12,
      borderRadius: theme.scale * 20,
      height: theme.scale * 113,
      width: theme.scale * 300,
    },
  });
