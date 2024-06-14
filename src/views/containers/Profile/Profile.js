/* eslint-disable react-native/no-inline-styles */
import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import React, {Component} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// Components
import no_image from 'assets/images/doctor-img.jpg';

import Header from 'views/layouts/Header';
import HomeFooter from 'views/layouts/Footer/HomeFooter';
import CustomIcon from 'views/layouts/CustomIcon';
import {
  showErrorToast,
  showMessageToast,
} from 'views/layouts/CustomToastMessage';
// Icons
import ic_user from 'assets/icons/ic_user.png';
import {KEYS, storeData, getData} from 'views/AsyncStorage';
import CryptoJS from 'react-native-crypto-js';
import {RSA} from 'react-native-rsa-native';
import {sha256, sha256Bytes} from 'react-native-sha256';
import CryptoComponent from 'views/components/CryptoComponent/CryptoComponent';

import {BASE_URL, makeRequest} from 'utils/MakeNetworkRequest';
import BasicStyles from 'views/styles/BasicStyles';
import {clearData} from 'views/AsyncStorage';
import CustomStyles from 'views/styles/CustomStyles';
import {SButton} from 'medskey_ui_components';
export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      specialityData: '',
    };
  }
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
  componentDidMount() {
    this.getUSerInfo();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.notoficationlist_api_call();
    });
    // BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  // componentDidMount() {
  //   BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // componentWillUnmount() {
  //   BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  // }

  // handleBackButton = () => {
  //   Alert.alert(
  //     'Confirm Exit',
  //     'Are you sure you want to exit?',
  //     [
  //       {text: 'Cancel', style: 'cancel'},
  //       {
  //         text: 'Exit',
  //         onPress: () => {
  //           // Perform any cleanup or exit logic here
  //           BackHandler.exitApp(); // Close the app
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );

  //   return true; // Prevent default back navigation
  // };

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
  getUSerInfo = async () => {
    const userInfo = await getData(KEYS.USER_INFO);
    if (userInfo) {
      this.setState(
        {
          doctorId: userInfo.doctorId,
        },
        () => {
          this.getmember_api_call(userInfo.doctorId);
        },
      );
    }
  };

  getmember_api_call = async doctorId => {
    console.log(doctorId);
    const {userInfo} = this.props;
    const deviceId = await getData(KEYS.DEVICE_ID);
    //console.log('deviceId', deviceId);
    const privateStoredKey = await AsyncStorage.getItem('updatedPrivateKey');
    const publicStoredKey = await AsyncStorage.getItem('updatedPublicKey');

    const cryptoComponent = new CryptoComponent();
    try {
      const params = {
        eventID: '1004',
        addInfo: {
          id: doctorId,
          userType: 'doctor',
        },
      };
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
        eventID: '1004',
        addInfo: {
          encData: encryptedData, // Sending the encrypted hash
          encHashData: encryptedHashData, // Sending the hash itself
        },
      };

      console.log('enchParam1004', encParams);
      const response = await makeRequest(BASE_URL + 'doc/doctors', encParams);

      if (response) {
        this.setState({isProcessing: false});
        const {rData} = response;

        if (rData?.rCode === 0) {
          //this.setState({money: ''});
          this.setState({
            name: rData.rData._name,
            about: rData.rData._about,
            email: rData.rData._email_id,
            mobile: rData.rData._mobile_no,
            specialisation: rData.rData._spcialisation,
            image: rData.rData._image,
            linkHospLeave: rData.linkHospLeave,
          });
          const arr = JSON.parse(rData.rData._spcialisation);
          // console.log('data', arr);
          let res = arr.map(arr => {
            return arr._name + ', ';
          });
          // console.log(obj);
          this.setState({membersData: arr});
          this.setState({specialityData: res});
          // const arr = rData.rData;
          this.hospitallist_api_call();
          // console.log(res);

          //console.log(arr);
          //alert(rData.rMessage);
          //showMessageToast(rData.rMessage);
        } else {
          // showErrorToast(rData.rData);
        }
      } else {
        // showErrorToast(response.rData.rMessage);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  hospitallist_api_call = async () => {
    const {doctorId} = this.state;
    const deviceId = await getData(KEYS.DEVICE_ID);
    //console.log('deviceId', deviceId);
    const privateStoredKey = await AsyncStorage.getItem('updatedPrivateKey');
    const publicStoredKey = await AsyncStorage.getItem('updatedPublicKey');

    const cryptoComponent = new CryptoComponent();
    //console.log('Mid', mid);
    try {
      const params = {
        eventID: '1010',
        addInfo: {
          doctorId: doctorId,
        },
      };
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
        eventID: '1010',
        addInfo: {
          encData: encryptedData, // Sending the encrypted hash
          encHashData: encryptedHashData, // Sending the hash itself
        },
      };

      console.log('enchParam', encParams);
      this.setState({isProcessing: true});
      const response = await makeRequest(
        BASE_URL + 'fac/commDetails',
        encParams,
      );
      this.setState({isProcessing: false});
      if (response) {
        const {rData} = response;

        if (rData?.rCode === 0) {
          const arr = rData.rData;

          this.setState({count: arr.length});
          //const totaldata = res;
          // console.log(res);

          // console.log(arr);
          //alert(rData.rMessage);
          //showMessageToast(rData.rMessage);
        } else {
          // showErrorToast(rData.rMessage);
        }
      } else {
        showErrorToast(response.rData.rMessage);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  render() {
    const {
      name,
      email,
      count,
      mobile,
      specialisation,
      mid,
      aid,
      specialityData,
      image,
      about,
      linkHospLeave,
    } = this.state;
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="Profile"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <View style={styles(this.theme).mainContainer}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}>
            <View style={styles(this.theme).topContainerView}>
              <Text
                style={[
                  styles(this.theme).topTextName,
                  {
                    fontSize: 20,
                    fontWeight: '700',
                    textAlign: 'right',
                    color: '#fff',
                  },
                ]}>
                {name}
              </Text>
            </View>

            <View style={styles(this.theme).topContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: this.theme.scale * 5,
                }}>
                <View>
                  <Image
                    source={image === '' ? no_image : {uri: image}}
                    resizeMode="cover"
                    style={{
                      height: this.theme.scale * 90,
                      aspectRatio: 1 / 1,
                      borderRadius: this.theme.scale * 25,
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('UpdateProfile')
                    }
                    style={{marginTop: 8}}>
                    <Text
                      style={[
                        {
                          color: this.theme.color.primary,
                          fontSize: 14,
                          textAlign: 'center',
                          fontWeight: '600',
                        },
                      ]}>
                      Edit Profile
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={{flex: 1, alignItems: 'flex-end'}}>
                  {/* <Text style={styles(this.theme).topTextStyle}>
                      {specialityData
                        .toString()
                        .substring(0, specialityData.toString().length - 0)}
                    </Text> */}
                  <Text style={styles(this.theme).topTextStyle}>{about}</Text>
                  <Text style={styles(this.theme).topTextStyle}>{mobile}</Text>
                  <Text style={styles(this.theme).topTextStyle}>{email}</Text>
                </View>
              </View>
            </View>
            <View style={styles(this.theme).bottomContainer}>
              <SButton
                title="Update Mobile"
                onPress={() =>
                  this.props.navigation.navigate('UpdateMobile', {
                    mobileNumber: mobile,
                  })
                }
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#dcedf9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#175784',
                }}
                iconName={'file-certificate'}
                iconSize={26}
                iconColor={'#175784'}
                iconType="MaterialCommunityIcons"
              />
              <SButton
                title="Update Email"
                onPress={() =>
                  this.props.navigation.navigate('UpdateEmail', {
                    emailId: email,
                  })
                }
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#f5e1e9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#933158',
                }}
                iconName={'certificate'}
                iconSize={26}
                iconColor={'#933158'}
                iconType="MaterialCommunityIcons"
              />

              <SButton
                title="Apply Leave"
                onPress={() => {
                  if (linkHospLeave === 0) {
                    // Show alert that request to the hospital is not approved
                    alert(
                      'You are not link with any Hospital or your request is pending.',
                    );
                  } else {
                    this.props.navigation.navigate('ApplyLeave');
                  }
                }}
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#dcedf9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#175784',
                }}
                iconName={'file-certificate'}
                iconSize={26}
                iconColor={'#175784'}
                iconType="MaterialCommunityIcons"
              />

              {/* <SButton
                title="Apply Leave"
                onPress={() => this.props.navigation.navigate('ApplyLeave')}
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#dcedf9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#175784',
                }}
                iconName={'file-certificate'}
                iconSize={26}
                iconColor={'#175784'}
                iconType="MaterialCommunityIcons"
              /> */}
              {/* <View>
                <SButton
                  title="Onboard Hospital"
                  onPress={() =>
                    this.props.navigation.navigate('OnboardHospitals')
                  }
                  btnContainerStyle={{
                    backgroundColor: this.theme.color.whitePrimary,
                    borderBottomColor: '#f5e1e9',
                    height: this.theme.scale * 55,
                  }}
                  titleStyle={{
                    color: '#933158',
                  }}
                  iconName={'certificate'}
                  iconSize={26}
                  iconColor={'#933158'}
                  iconType="MaterialCommunityIcons"
                />
                <View style={CustomStyles(this.theme).badgeIcon}>
                  <Text style={CustomStyles(this.theme).badgeIconText}>
                    {count}
                  </Text>
                </View>
              </View> */}
              <View>
                <SButton
                  title="Onboard Hospital"
                  onPress={() =>
                    this.props.navigation.navigate('OnboardHospitals')
                  }
                  btnContainerStyle={{
                    backgroundColor: this.theme.color.whitePrimary,
                    borderBottomColor: '#f5e1e9',
                    height: this.theme.scale * 55,
                  }}
                  titleStyle={{
                    color: '#933158',
                  }}
                  iconName={'certificate'}
                  iconSize={26}
                  iconColor={'#933158'}
                  iconType="MaterialCommunityIcons"
                />

                <View
                  style={{
                    height: this.theme.scale * 25,
                    width: this.theme.scale * 25,
                    position: 'absolute',
                    backgroundColor: this.theme.color.themeBlue,
                    right: this.theme.scale * 0,
                    top: this.theme.scale * 5,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: this.theme.scale * 30,
                  }}>
                  <Text
                    style={{
                      color: this.theme.color.whitePrimary,
                      fontSize: this.theme.scale * 14,
                      fontWeight: '700',
                    }}>
                    {count || 0}
                  </Text>
                </View>
              </View>

              <SButton
                title="Change Password"
                onPress={() => this.props.navigation.navigate('ChangePassword')}
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#dcedf9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#175784',
                }}
                iconName={'file-certificate'}
                iconSize={26}
                iconColor={'#175784'}
                iconType="MaterialCommunityIcons"
              />
              <SButton
                title="Manage Certificates"
                onPress={() =>
                  this.props.navigation.navigate('ManageCertificates')
                }
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#f5e1e9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#933158',
                }}
                iconName={'certificate'}
                iconSize={26}
                iconColor={'#933158'}
                iconType="MaterialCommunityIcons"
              />
              <SButton
                title="Manage Degrees"
                onPress={() => this.props.navigation.navigate('ManageDegrees')}
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#dcedf9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#175784',
                }}
                iconName={'file-certificate'}
                iconSize={26}
                iconColor={'#175784'}
                iconType="MaterialCommunityIcons"
              />
              <SButton
                title="Manage Specialization"
                onPress={() =>
                  this.props.navigation.navigate('ManageSpecialization')
                }
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#dcedf9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#933158',
                }}
                iconName={'info'}
                iconSize={26}
                iconColor={'#933158'}
                iconType="MaterialIcons"
              />
              <SButton
                title="Log Out"
                onPress={this.handleLogOut}
                btnContainerStyle={{
                  backgroundColor: this.theme.color.whitePrimary,
                  borderBottomColor: '#dcedf9',
                  height: this.theme.scale * 55,
                }}
                titleStyle={{
                  color: '#175784',
                }}
                iconName={'logout'}
                iconSize={26}
                iconColor={'#175784'}
                iconType="MaterialCommunityIcons"
              />
            </View>
          </KeyboardAwareScrollView>
        </View>

        <HomeFooter
          title="Profile"
          theme={this.theme}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    mainContainer: {
      flex: 1,
      padding: theme.scale * 12,
    },
    topContainer: {
      backgroundColor: '#dcedf9',
      paddingVertical: theme.scale * 6,
      paddingHorizontal: theme.scale * 12,
      elevation: 5,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      marginHorizontal: 3,
      // borderWidth: 1,
      // borderColor: '#204e79',
    },
    topContainerView: {
      backgroundColor: '#204e79',

      paddingVertical: theme.scale * 6,
      paddingHorizontal: theme.scale * 12,
      elevation: 5,
      // borderRadius: theme.scale * 12,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,

      marginHorizontal: 3,
    },

    topTextStyle: {
      fontSize: theme.scale * 14,
      color: theme.color.primary,
      fontWeight: '600',
    },

    bottomContainer: {
      marginTop: theme.scale * 45,
      marginHorizontal: theme.scale * 2,
      padding: theme.scale * 0,
      marginBottom: 20,
    },
  });
