/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Alert,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomIcon from '../../layouts/CustomIcon';
import {horizontalScale, moderateScale} from 'views/styles/CustomMetrics';
import logout_logo from '../../../assets/images/logout.png';
import {clearData} from '../../AsyncStorage';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.theme = props.theme;
    this.state = {};
  }

  handleBack = () => {
    this.props.navigation.goBack();
  };

  handleLogOut = () => {
    Alert.alert(
      'Logout',
      'Are you sure, you want to logout?',
      [
        {text: 'NO', style: 'cancel'},
        {text: 'YES', onPress: this.onLogoutYesPress},
      ],
      {
        cancelable: false,
      },
    );
  };

  onLogoutYesPress = async () => {
    try {
      // Clearing user preferences from local storage
      await clearData();

      // Resetting Navigation to initial state for login again
      this.props.navigation.navigate('Login');
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    const {title, showBack, isHome} = this.props;
    const fontSize =
      Platform.OS === 'android' ? this.theme.scale * 16 : this.theme.scale * 20;

    return (
      <SafeAreaView>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
        />
        <View style={headerStyle(this.theme).container}>
          {title == 'DASHBOARD' ? (
            <View style={headerStyle(this.theme).headerContainer}>
              <Text
                style={[
                  headerStyle(this.theme).headerTitle,
                  {
                    flex: 1,
                    textAlign: 'center',
                    fontSize: this.theme.scale * 18,
                    marginLeft: this.theme.scale * 16,
                  },
                ]}>
                {isHome ? '' : title}
              </Text>
              <Pressable
                onPress={this.handleLogOut}
                hitSlop={4}
                style={({pressed}) => [
                  {
                    zIndex: 10,
                    opacity: pressed ? 0.2 : 1.0,
                  },
                ]}>
                <Image
                  source={logout_logo}
                  resizeMode="contain"
                  style={{
                    height: this.theme.scale * 30,
                    width: this.theme.scale * 30,
                    aspectRatio: 1 / 1,
                    right: 15,
                  }}
                />
              </Pressable>
            </View>
          ) : (
            <View style={headerStyle(this.theme).headerContainer}>
              <Pressable
                onPress={this.handleBack}
                hitSlop={4}
                style={({pressed}) => [
                  {
                    zIndex: 10,
                    opacity: pressed ? 0.2 : 1.0,
                  },
                ]}>
                <Image
                  style={{
                    height: this.theme.scale * 24,
                    width: this.theme.scale * 24,
                    alignSelf: 'center',
                    marginStart: this.theme.scale * 10,
                  }}
                  source={require('../../../assets/images/arrow.png')}
                />
                {/* <CustomIcon
                  iconName={'left'}
                  iconSize={this.theme.scale * 25}
                  iconColor={'#000'}
                  iconStyle={headerStyle(this.theme).backIcon}
                  iconType="AntDesign"
                /> */}
              </Pressable>
              <Text
                style={[
                  headerStyle(this.theme).headerTitle,
                  {
                    flex: 1,
                    textAlign: 'center',
                    fontSize: this.theme.scale * 18,
                    // marginLeft: this.theme.scale * 16,
                  },
                ]}>
                {isHome ? '' : title}
              </Text>
              <Text></Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

const headerStyle = theme =>
  StyleSheet.create({
    container: {
      height: theme.scale * 70,
      width: '100%',
      backgroundColor: theme.color.whitePrimary,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 10},
      shadowOpacity: theme.scale * 0.25,
      shadowRadius: theme.scale * 10,
      elevation: theme.scale * 3,
    },

    headerContainer: {
      flex: 1,
      height: theme.scale * 100,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      paddingHorizontal: theme.scale * 8,
      justifyContent: 'center',
      bottom: 15,
    },

    backIcon: {
      // height: hp(3.5),
      // aspectRatio: 1 / 1,
    },
    headerTitle: {
      color: theme.color.blackPrimary,
      fontSize: theme.scale * 20,
      fontWeight: '600',
    },
    captionMedium: {
      fontSize: theme.scale * 14,
      fontWeight: '500',
    },
  });
