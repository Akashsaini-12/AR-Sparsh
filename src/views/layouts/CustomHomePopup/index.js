/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// Components

import CustomIcon from 'views/layouts/CustomIcon';
import CustomStyles from 'views/styles/CustomStyles';

//Icons
import img_update_profile from 'assets/images/img_update_profile.gif';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoComponent from 'views/components/CryptoComponent/CryptoComponent';
import {KEYS, getData} from 'views/AsyncStorage';
import {sha256} from 'react-native-sha256';
import {RSA} from 'react-native-rsa-native';
import {BASE_URL, makeRequest} from 'utils/MakeNetworkRequest';
import {showErrorToast} from '../CustomToastMessage';

export default class CustomHomePopup extends Component {
  constructor(props) {
    super(props);

    this.theme = props.theme;

    this.state = {};

    this.parentView = null;
  }

  //image picker

  setViewRef = ref => {
    this.parentView = ref;
  };
  componentDidMount() {
    this.getUSerInfo();
    this.getmember_api_call();
  }

  getmember_api_call = async () => {
    // console.log(userInfo.doctorId);
    const {userInfo} = this.props;
    const deviceId = await getData(KEYS.DEVICE_ID);
    //console.log('deviceId', deviceId);
    const privateStoredKey = await AsyncStorage.getItem('updatedPrivateKey');
    const publicStoredKey = await AsyncStorage.getItem('updatedPublicKey');

    const cryptoComponent = new CryptoComponent();
    try {
      const userInfo = await getData(KEYS.USER_INFO);
      const params = {
        eventID: '1004',
        addInfo: {
          id: this.state.doctorId,
          userType: 'doctor',
        },
      };
      const encryptionKey = deviceId;

      const addInfoString = JSON.stringify(params.addInfo);

      const encryptedData = cryptoComponent.encryptAESData(
        addInfoString,
        encryptionKey,
      );

      const hashData = await sha256(addInfoString);

      const encryptedHashData = await RSA.encrypt(hashData, publicStoredKey);

      const encParams = {
        eventID: '1004',
        addInfo: {
          encData: encryptedData, // Sending the encrypted hash
          encHashData: encryptedHashData, // Sending the hash itself
        },
      };

      const response = await makeRequest(BASE_URL + 'doc/doctors', encParams);
      this.setState({isProcessing: true});

      if (response) {
        const {rData} = response;
        if (rData?.rCode === 0) {
          console.log('rData?.rData', rData.rData);
          this.setState({
            image: rData.rData._image,
            cert: rData.rData._certs,
            address: rData.rData._add_line_1,
            pinCode: rData.rData._pin_code,
            experience: rData.rData._experience,
          });
        } else {
          // showErrorToast(rData.rData);
        }
      } else {
        showErrorToast(response.rData.rMessage);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  getUSerInfo = async () => {
    const userInfo = await getData(KEYS.USER_INFO);
    console.log(userInfo.type, 'userInfouserInfo');
    if (userInfo) {
      console.log(userInfo, 'userInfouserInfouserInfouserInfouserInfo');
      this.setState({
        type: userInfo.type,
        doctorId: userInfo.doctorId,
        // authId: userInfo.auth_id,
      });
    }
  };

  handleStartShouldSetResponder = event => {
    if (this.parentView._nativeTag === event.target._nativeTag) {
      // this.props.closePopup();
    }
  };

  handleApply = () => {
    this.props.closePopup();
  };

  render() {
    return (
      <View
        ref={this.setViewRef}
        onStartShouldSetResponder={this.handleStartShouldSetResponder}
        style={styles(this.theme).modalContainer}>
        <ScrollView>
          <View style={styles(this.theme).popupContainer}>
            <Image
              resizeMode="cover"
              source={img_update_profile}
              style={{
                alignSelf: 'center',
                height: 200,
                aspectRatio: 1 / 1,
                marginTop: 160,
              }}
            />

            <Text
              style={{
                fontSize: this.theme.scale * 20,
                fontWeight: '600',
                color: this.theme.color.primary,
              }}>
              Update Profile
            </Text>

            <Text
              style={{
                fontSize: this.theme.scale * 16,
                fontWeight: '500',
                color: this.theme.color.textSecond,
                marginTop: this.theme.scale * 20,
                textAlign: 'center',
              }}>
              Kindly update your Profile & Certificates to use App. You'll not
              be able to use the app until you update your profile.
            </Text>
            {/* {userLoginData === undefined && ( // Check if userLoginData is undefined
              <TouchableOpacity
                onPress={this.handleLogOut}
                style={[
                  CustomStyles(this.theme).elevatedButtonContainer,
                  {
                    borderColor: this.theme.color.primary,
                    backgroundColor: this.theme.color.secondary,
                    marginTop: this.theme.scale * 50,
                  },
                ]}>
                <Text
                  style={[
                    CustomStyles(this.theme).elevatedButtonText,
                    {color: this.theme.color.primary},
                  ]}>
                  Logout
                </Text>
                <CustomIcon
                  iconName={'retweet'}
                  iconSize={this.theme.scale * 25}
                  iconColor={this.theme.color.primary}
                  iconType="FontAwesome"
                />
              </TouchableOpacity>
            )} */}

            {this.state.image === '' &&
            this.state.address === '' &&
            this.state.experience === '' &&
            this.state.pinCode === '' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('UpdateProfile')}
                style={[
                  CustomStyles(this.theme).elevatedButtonContainer,
                  {
                    borderColor: this.theme.color.primary,
                    backgroundColor: this.theme.color.secondary,
                    marginTop: this.theme.scale * 100,
                  },
                ]}>
                <Text
                  style={[
                    CustomStyles(this.theme).elevatedButtonText,
                    {color: this.theme.color.primary},
                  ]}>
                  Update Profile
                </Text>
                <CustomIcon
                  iconName={'retweet'}
                  iconSize={this.theme.scale * 25}
                  iconColor={this.theme.color.primary}
                  iconType="FontAwesome"
                />
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}

            {this.state.cert === '[]' ? (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('ManageCertificates')
                }
                style={[
                  CustomStyles(this.theme).elevatedButtonContainer,
                  {
                    borderColor: '#886213',
                    backgroundColor: '#faf0db',
                    marginTop: this.theme.scale * 20,
                  },
                ]}>
                <Text
                  style={[
                    CustomStyles(this.theme).elevatedButtonText,
                    {color: '#886213'},
                  ]}>
                  Update Certificates
                </Text>
                <CustomIcon
                  iconName={'certificate'}
                  iconType="MaterialCommunityIcons"
                  iconSize={this.theme.scale * 25}
                  iconColor={'#886213'}
                />
              </TouchableOpacity>
            ) : (
              <Text></Text>
            )}
            {/* {this.state.type === 'ECHS' ? (
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Home')}
                style={[
                  CustomStyles(this.theme).skipButton,
                  {
                    borderColor: this.theme.color.primary,
                    backgroundColor: this.theme.color.secondary,
                    // marginTop: this.theme.scale * 100,
                  },
                ]}>
                <Text
                  style={[
                    CustomStyles(this.theme).elevatedButtonText,
                    {color: this.theme.color.primary},
                  ]}>
                  Skip
                </Text>
              </TouchableOpacity>
            ) : null} */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    modalContainer: {
      flex: 1,
      position: 'absolute',
      backgroundColor: 'rgba(255,255,255,1)',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      width: '100%',
      zIndex: theme.scale * 15,
    },

    popupContainer: {
      height: '100%',
      width: '100%',
      // backgroundColor: '#ffffff',
      borderRadius: theme.scale * 10,
      alignItems: 'center',
      padding: theme.scale * 28,
      // flexDirection: 'row',
      // justifyContent: 'space-around',
    },

    buttonContainer: {
      marginTop: theme.scale * 16,
      alignSelf: 'center',
      width: '100%',
      height: theme.scale * 70,
      borderColor: '#f5e1e9',
      borderBottomWidth: theme.scale * 3,
      backgroundColor: '#fff',
      borderRadius: theme.scale * 12,
      elevation: 5,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      paddingHorizontal: theme.scale * 16,
    },
  });
