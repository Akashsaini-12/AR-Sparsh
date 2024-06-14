import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';

//Responsive Screen
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Styles
import BasicStyles from 'views/styles/BasicStyles';

// Icons
import CustomIcon from 'views/layouts/CustomIcon';

export default class HomeFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateProfile = () => {
    this.props.navigation.navigate('Home');
  };

  navigateBookAppointment = () => {
    this.props.navigation.navigate('TapCard');
  };

  navigateAppointments = () => {
    this.props.navigation.navigate('Appointments');
  };

  render() {
    const {title} = this.props;
    const activeStyle = [
      styles.footerMenu,
      {borderBottomWidth: 2, borderBottomColor: '#fff'},
    ];
    const activeTextStyle = [{fontWeight: '700'}];
    return (
      <View style={[BasicStyles.directionRow, styles.footerComponent]}>
        <Pressable
          onPress={this.navigateProfile}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Profile' ? activeStyle : styles.footerMenu,
          ]}>
          <CustomIcon
            iconName={'user'}
            iconSize={20}
            iconColor={'#fff'}
            iconStyle={styles.footerIcon}
            iconType="FontAwesome"
          />

          <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.whiteColor,
              BasicStyles.marginTopHalf,
              title === 'Profile' ? activeTextStyle : null,
            ]}>
            Profile
          </Text>
        </Pressable>

        <Pressable
          onPress={this.navigateBookAppointment}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'BookAppointment' ? activeStyle : styles.footerMenu,
          ]}>
          <CustomIcon
            iconName={'calendar'}
            iconSize={20}
            iconColor={'#fff'}
            iconStyle={styles.footerIcon}
            iconType="Foundation"
          />

          <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.whiteColor,
              BasicStyles.marginTopHalf,
              title === 'Book Appointment' ? activeTextStyle : null,
            ]}>
            Book Appointment
          </Text>
        </Pressable>

        <Pressable
          onPress={this.navigateAppointments}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Appointments' ? activeStyle : styles.footerMenu,
          ]}>
          <CustomIcon
            iconName={'clipboard-list'}
            iconSize={20}
            iconColor={'#fff'}
            iconStyle={styles.footerIcon}
            iconType="FontAwesome5"
          />

          <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.whiteColor,
              BasicStyles.marginTopHalf,
              title === 'Appointments' ? activeTextStyle : null,
            ]}>
            Appointments
          </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  footerComponent: {
    height: hp(7),
    // borderTopLeftRadius: wp(15),
  },
  footerIcon: {
    height: wp(5),
    aspectRatio: 1 / 1,
  },
  footerMenu: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#023C66',
  },
});
