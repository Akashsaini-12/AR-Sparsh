import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Pressable,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CustomStyles from 'views/styles/CustomStyles';
//Responsive Screen
import {KEYS, storeData, getData} from 'views/AsyncStorage';
import {RSA} from 'react-native-rsa-native';
import {sha256, sha256Bytes} from 'react-native-sha256';
import CryptoComponent from 'views/components/CryptoComponent/CryptoComponent';
import {BASE_URL, makeRequest} from 'utils/MakeNetworkRequest';
// Icons
import CustomIcon from 'views/layouts/CustomIcon';

export default class HomeFooter extends Component {
  constructor(props) {
    super(props);
    // this.theme = props.route.params.theme;
    this.theme = props.theme;
    this.state = {};
  }
  componentDidMount() {
    this.getUSerInfo();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.notoficationlist_api_call();
    });
  }

  getUSerInfo = async () => {
    const userInfo = await getData(KEYS.USER_INFO);
    if (userInfo) {
      this.setState(
        {
          doctorId: userInfo.doctorId,
        },
        () => {
          this.notoficationlist_api_call();
        },
      );
    }
  };

  notoficationlist_api_call = async () => {
    const {doctorId} = this.state;
    //console.log('doctorId', doctorId);
    const {userInfo} = this.props;
    const deviceId = await getData(KEYS.DEVICE_ID);
    //console.log('deviceId', deviceId);
    const privateStoredKey = await AsyncStorage.getItem('updatedPrivateKey');
    const publicStoredKey = await AsyncStorage.getItem('updatedPublicKey');

    const cryptoComponent = new CryptoComponent();
    try {
      const params = {
        eventID: '1001',
        addInfo: {
          userId: this.state.doctorId,
          userType: 'doctor',
        },
      };
      this.setState({isProcessing: true});
      const encryptionKey = deviceId;

      const addInfoString = JSON.stringify(params.addInfo);
      //console.log('addInfoString', addInfoString);

      const encryptedData = cryptoComponent.encryptAESData(
        addInfoString,
        encryptionKey,
      );

      const hashData = await sha256(addInfoString);

      const encryptedHashData = await RSA.encrypt(hashData, publicStoredKey);

      const encParams = {
        eventID: '1001',
        addInfo: {
          encData: encryptedData, // Sending the encrypted hash
          encHashData: encryptedHashData, // Sending the hash itself
        },
      };

      //console.log('enchParam', encParams);
      const response = await makeRequest(
        BASE_URL + 'fac/notification',
        encParams,
      );
      this.setState({isProcessing: false});
      if (response) {
        const {rData} = response;

        if (rData) {
          if (rData.rCode === 1) {
            const notification = 0;
            this.setState({notoficationCount: notification});
          } else {
            const arr = rData.rData;
            console.log(rData.rData.length);
            const filteredData = arr.filter(item => item._status === '0');

            const notification = filteredData.length;
            this.setState({notoficationCount: notification});
          }
        } else {
          // showErrorToast(rData.rMessage);
        }
      } else {
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  navigateHome = () => {
    this.props.navigation.navigate('Home');
  };
  navigateNotifications = () => {
    this.props.navigation.navigate('Notifications');
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
          onPress={this.navigateNotifications}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.6 : 1.0,
            },
            title === 'Notifications' ? activeStyle : styles(theme).footerMenu,
          ]}>
          <View
            style={{
              width: 24,
              top: 3,
              height: 24,
              borderRadius: 20,
              backgroundColor: '#1c6ba4',
              marginLeft: 20,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 10,
                fontWeight: '600',
                textAlign: 'center',
                color: '#fff',
              }}>
              {this.state.notoficationCount || 0}
            </Text>
          </View>
          <View style={{bottom: 10}}>
            <CustomIcon
              iconName={'bell'}
              iconSize={23}
              iconColor={
                title === 'Notifications'
                  ? theme.color.primary
                  : theme.color.labelInactive
              }
              iconType="FontAwesome5"
            />
          </View>
        </Pressable>
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
      height: Platform.OS === 'android' ? 50 : 80,
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
