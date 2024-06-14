import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import CustomStyles from 'views/styles/CustomStyles';
//Responsive Screen

// Icons
import CustomIcon from 'views/layouts/CustomIcon';

export default class HomeFooter extends Component {
  constructor(props) {
    super(props);
    // this.theme = props.route.params.theme;
    this.theme = props.theme;
    this.state = {};
  }

  navigateHome = () => {
    this.props.navigation.navigate('Home');
  };

  navigateAppointments = () => {
    this.props.navigation.navigate('CurrentAppointments');
  };
  navigateBookAppointment = () => {
    this.props.navigation.navigate('TapCard');
  };

  navigateProfile = () => {
    this.props.navigation.navigate('Profile');
  };

  render() {
    const {title, theme} = this.props;
    const activeStyle = [
      styles(theme).footerMenu,
      {borderBottomWidth: 2, borderBottomColor: '#fff'},
    ];
    const activeTextStyle = [{fontWeight: '700', color: theme.color.primary}];
    return (
      <View style={styles(theme).footerComponent}>
        <Pressable
          onPress={this.navigateHome}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Home' ? activeStyle : styles(theme).footerMenu,
          ]}>
          <CustomIcon
            iconName={'home'}
            iconSize={23}
            iconColor={
              title === 'Home' ? theme.color.primary : theme.color.labelInactive
            }
            iconStyle={styles(theme).footerIcon}
            iconType="FontAwesome5"
          />

          {/* <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.marginTopHalf,
              title === 'Profile' ? activeTextStyle : null,
              {color: theme.color.labelInactive},
            ]}>
            Home
          </Text> */}
        </Pressable>

        <Pressable
          onPress={this.navigateAppointments}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'CurrentAppointments'
              ? activeStyle
              : styles(theme).footerMenu,
          ]}>
          <CustomIcon
            iconName={'calendar'}
            iconSize={23}
            iconColor={
              title === 'CurrentAppointments'
                ? theme.color.primary
                : theme.color.labelInactive
            }
            iconStyle={styles.footerIcon}
            iconType="Foundation"
          />

          {/* <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.marginTopHalf,
              title === 'Book Appointment' ? activeTextStyle : null,
              {color: theme.color.labelInactive},
            ]}>
            Book Appointment
          </Text> */}
        </Pressable>

        {/* <Pressable
          onPress={this.navigateBookAppointment}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'New Prescription'
              ? activeStyle
              : styles(theme).footerMenu,
          ]}>
          <CustomIcon
            iconName={'clipboard-list'}
            iconSize={23}
            iconColor={
              title === 'New Prescription'
                ? theme.color.primary
                : theme.color.labelInactive
            }
            iconStyle={styles.footerIcon}
            iconType="FontAwesome5"
          />
        </Pressable> */}

        <Pressable
          onPress={this.navigateProfile}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Profile' ? activeStyle : styles(theme).footerMenu,
          ]}>
          <CustomIcon
            iconName={'user'}
            iconSize={23}
            iconColor={
              title === 'Profile'
                ? theme.color.primary
                : theme.color.labelInactive
            }
            iconStyle={styles(theme).footerIcon}
            iconType="FontAwesome5"
          />

          {/* <Text
            style={[
              BasicStyles.textSmall,
              BasicStyles.marginTopHalf,
              title === 'Appointments' ? activeTextStyle : null,
              {color: theme.color.labelInactive},
            ]}>
            Appointments
          </Text> */}
        </Pressable>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    footerComponent: {
      height: theme.scale * 40,
      backgroundColor: theme.color.whitePrimary,
      flexDirection: 'row',
    },

    footerMenu: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    badgeIconFooter: {
      backgroundColor: theme.color.themeBlue,
      alignItems: 'center',
      justifyContent: 'center',
      padding: theme.scale * 2,
      height: theme.scale * 25,
      aspectRatio: 1 / 1,
      borderRadius: theme.scale * 44,
      position: 'absolute',
      top: theme.scale * -17,
      right: theme.scale * 37,
    },
    badgeIconFooterText: {
      color: theme.color.whitePrimary,
      fontSize: theme.scale * 13,
    },
  });
