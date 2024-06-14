/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import CustomIcon from 'views/layouts/CustomIcon';
import ic_star from 'assets/icons/ic_star.png';
import ic_star_inactive from 'assets/icons/ic_star_inactive.png';
import ic_hospital from 'assets/icons/ic_hospital.jpg';
import ic_doctor_img from 'assets/icons/ic_doctor_img.jpg';
const HospitalListComponents = props => {
  const {item, index, navigation, theme} = props;

  const {
    Image: img,
    Id,
    // Speciality,
    FacilityName,
    HospitalName,
    DoctorName,
    rating,

    District,
    State,
    Pincode,
    services,
    category,
  } = item;
  // console.log(speciality);

  const Default_Rating = 2;
  //To set the default Star Selected
  const Max_Rating = 5;

  let React_Native_Rating_Bar = [];
  //Array to hold the filled or empty Stars
  for (var i = 1; i <= Max_Rating; i++) {
    React_Native_Rating_Bar.push(
      <View key={i}>
        <Image
          style={styles(theme).StarImage}
          source={i <= 4 ? ic_star : ic_star_inactive}
        />
      </View>,
    );
  }

  return (
    <TouchableOpacity
      onPress={() =>
        //this.props.navigation.navigate('memberprofile', {card_no: '7351961'})
        props.navigation.navigate('OnboardHospitalsDetails', {
          facilityId: item.Id,
        })
      }
      style={[
        styles(theme).container,
        {
          backgroundColor: FacilityName ? '#e9f5f8' : theme.color.whitePrimary,
        },
      ]}>
      <View
        style={{
          // backgroundColor: theme.color.primary,
          padding: theme.scale * 2,
        }}>
        {/* <Image
          // source={FacilityName ? ic_hospital : ic_doctor_img}

          // source={{uri: `data:image/jpg;base64,${img}`}}
          source={
            img === '' ? ic_hospital : {uri: `data:image/jpg;base64,${img}`}
          }
          resizeMode="cover"
          style={{
            height: theme.scale * 80,
            aspectRatio: 1 / 1,
            borderRadius: theme.scale * 12,
          }}
        /> */}

        <Image
          // source={ic_hospital}
          // source={{uri: `data:image/jpg;base64,${img}`}}
          source={img === '' ? ic_hospital : {uri: img}}
          resizeMode="cover"
          style={{
            height: theme.scale * 80,
            aspectRatio: 1 / 1,
            borderRadius: theme.scale * 12,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          marginLeft: theme.scale * 16,
        }}>
        <Text
          style={[
            styles(theme).topTextStyle,
            {
              fontSize: theme.scale * 18,
              fontWeight: '700',
            },
          ]}>
          {item.FacilityName}
        </Text>

        <View style={styles(theme).childView}>
          {React_Native_Rating_Bar}
          <Text
            style={{
              fontSize: 14,
              color: theme.color.labelInactive,
              marginLeft: 8,
            }}>
            73 Reviews
          </Text>
        </View>
        <Text
          style={[
            styles(theme).topTextStyle,
            {color: theme.color.labelInactive, textTransform: 'capitalize'},
          ]}>
          {District} {State} {Pincode}
        </Text>
        <TouchableOpacity
          onPress={() =>
            //this.props.navigation.navigate('memberprofile', {card_no: '7351961'})
            props.navigation.navigate('OnboardHospitalsDetails', {
              facilityId: item.Id,
            })
          }
          style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text
            style={{
              fontSize: theme.scale * 16,
              fontWeight: '600',
              marginRight: theme.scale * 10,
              color: theme.color.primary,
            }}>
            View Details
          </Text>
          <CustomIcon
            iconName={'eye'}
            iconSize={20}
            iconColor={theme.color.primary}
            iconType="Entypo"
          />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default HospitalListComponents;

const styles = theme =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: theme.scale * 10,
      // elevation: 5,
      // borderWidth: theme.scale * 0.3,
      borderColor: '#ccc',
      borderRadius: theme.scale * 8,
      marginBottom: theme.scale * 5,
      marginHorizontal: theme.scale * 5,
    },
    topTextStyle: {
      fontSize: theme.scale * 14,
      color: theme.color.primary,
      fontWeight: '400',
      textAlign: 'left',
    },

    childView: {
      justifyContent: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      // marginTop: theme.scale * 30,
    },

    StarImage: {
      width: theme.scale * 13,
      height: theme.scale * 13,
      resizeMode: 'cover',
    },
  });
