/* eslint-disable react-native/no-inline-styles */
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

export default class LoginRegFooter extends Component {
  constructor(props) {
    super(props);
    this.theme = props.theme;
    this.state = {};
  }

  navigateLogin = () => {
    this.props.navigation.navigate('Login');
  };

  navigateRegistration = () => {
    this.props.navigation.navigate('RegistrationOtpVerify');
  };

  render() {
    const {title} = this.props;
    const activeStyle = [
      styles.footerMenu,
      {borderBottomWidth: this.theme.scale * 3, borderBottomColor: '#1c6ba4'},
    ];
    const activeTextStyle = [{fontWeight: '700'}];
    return (
      <View style={styles(this.theme).footerComponent}>
        <Pressable
          onPress={this.navigateLogin}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Login' ? activeStyle : styles(this.theme).footerMenu,
          ]}>
          <CustomIcon
            iconName={'login'}
            iconSize={20}
            iconColor={'#1c6ba4'}
            iconStyle={styles(this.theme).footerIcon}
            iconType="Entypo"
          />

          <Text
            style={[
              {
                fontSize: this.theme.scale * 12,
                color: '#1c6ba4',
                marginTop: this.theme.scale * 3,
              },
              title === 'Login' ? activeTextStyle : null,
            ]}>
            Login
          </Text>
        </Pressable>

        <Pressable
          onPress={this.navigateRegistration}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'RegistrationOtpVerify'
              ? activeStyle
              : styles(this.theme).footerMenu,
          ]}>
          <CustomIcon
            iconName={'add-user'}
            iconSize={20}
            iconColor={'#1c6ba4'}
            iconStyle={styles(this.theme).footerIcon}
            iconType="Entypo"
          />

          <Text
            style={[
              {
                fontSize: this.theme.scale * 12,
                color: '#1c6ba4',
                marginTop: this.theme.scale * 3,
              },
              title === 'RegistrationOtpVerify' ? activeTextStyle : null,
            ]}>
            Registration
          </Text>
        </Pressable>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    footerComponent: {
      height: theme.scale * 70,
      flexDirection: 'row',
      // borderTopLeftRadius: wp(15),
    },
    footerIcon: {
      height: theme.scale * 20,
      aspectRatio: 1 / 1,
    },
    footerMenu: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dcedf9',
    },
  });
