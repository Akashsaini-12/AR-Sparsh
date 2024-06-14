import React, {forwardRef} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Alert,
  TouchableOpacity,
  TextInput,
  BackHandler,
  StatusBar,
  Image,
  Button,
  ScrollView,
} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import ProcessingLoader from '../../layouts/ProcessingLoader';
import {
  showErrorToast,
  showMessageToast,
} from '../../layouts/CustomToastMessage';

import logo_image from '../../../assets/images/ar_logo.png';
import LoginRegFooter from '../../layouts/Footer/LoginRegFooter';
import {STextInput, SButton} from 'medskey_ui_components';
import {BASE_URL, makeRequest} from '../../../utils/MakeNetworkRequest';
import {KEYS, storeData, getData} from '../../AsyncStorage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Toast from 'react-native-root-toast';
import {InputText} from '../../components/customComponent/InputText';
import {FontFamily, Color, FontSize} from '../GlobalStyles';
import {
  CustomButton,
  SCustomButton,
} from '../../components/customComponent/CustomButton';
import {SDropDownPicker} from '../../components/customComponent/CustomDropDown';
import CustomStyles from '../../styles/CustomStyles';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      activeMobile: false,
      mobile: '',
      password: '',
      captcha: '',
      generatedCaptcha: this.generateCaptcha(),
      showPassword: false,
      userType: 'Select User',
      selectedPickerData: {
        Id: -1,
        Name: 'Select User',
        Value: 'Select User',
      },
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton = () => {
    Alert.alert(
      'Confirm Exit',
      'Are you sure you want to exit?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Exit',
          onPress: () => {
            // Perform any cleanup or exit logic here
            BackHandler.exitApp(); // Close the app
          },
        },
      ],
      {cancelable: false},
    );

    return true; // Prevent default back navigation
  };
  generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(
      {length: 6},
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
  };
  refreshCaptcha = () => {
    this.setState({generatedCaptcha: this.generateCaptcha()});
  };
  hanldeRegister = () => {
    this.props.navigation.navigate('Registration');
  };
  handleLogin = async () => {
    const {captcha, generatedCaptcha, mobile, password, userType} = this.state;
    if (userType === 'Select User') {
      Alert.alert('Alert!', 'Please Select User');
    } else if (mobile.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Regimental Number');
    } else if (password.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Password');
    } else if (captcha.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Captcha');
    } else if (captcha !== generatedCaptcha) {
      Alert.alert('Alert!', 'Invalid Captcha');
    } else {
      showMessageToast('Login Successfully');
      await storeData(KEYS.USER_INFO, 'kxssamcmdxcmdm');
      this.props.navigation.navigate('Home');
      this.setState({
        captcha: '',
        mobile: '',
        password: '',
        userType: 'Select User',
        selectedPickerData: {
          Id: -1,
          Name: 'Select User',
          Value: 'Select User',
        },
      });
    }
  };

  render() {
    const {generatedCaptcha} = this.state;
    return (
      <View style={styles(this.theme).container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#fff"
          translucent={true}
        />

        <View style={styles(this.theme).mainContainer}>
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              // justifyContent: 'center',
            }}>
            <View style={styles(this.theme).row}>
              <Image
                source={logo_image}
                resizeMode="contain"
                style={{
                  height: this.theme.scale * 200,
                  aspectRatio: 1 / 1,
                }}
              />
              <Text
                style={[styles(this.theme).arSparshTypo]}>{`AR SPARSH `}</Text>
            </View>
            <View
              style={{
                padding: this.theme.scale * 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: 16,
              }}>
              <SDropDownPicker
                placeholder={this.state.userType}
                selectedPickerData={this.state.selectedPickerData}
                pickerData={[
                  {
                    Name: 'Serving Officer',
                    Value: 'User1',
                    Id: 1,
                  },
                  {
                    Name: 'Serving JCO/OR',
                    Value: 'User2 ',
                    Id: 2,
                  },
                  {
                    Name: 'Ex-Serviceman',
                    Value: 'User3',
                    Id: 3,
                  },
                  {
                    Name: 'Next Of Kin(NOK)',
                    Value: 'User3',
                    Id: 4,
                  },
                ]}
                onChange={e => {
                  this.setState({
                    userType: e.Value.toString(),
                    selectedPickerData: e,
                  });
                }}
                containerStyle={[
                  CustomStyles(this.theme).textInputContainer,
                  CustomStyles(this.theme).customWidth100,
                ]}
                dropdownBtnTxtStyle={[
                  CustomStyles(this.theme).dropdownBtnTxtStyle,
                  {},
                ]}
                labelStyle={CustomStyles(this.theme).textInputLabel}
              />

              <InputText
                placeholder="Mobile No / Regimental No"
                placeholderTextColor={this.theme.color.grayPrimary}
                value={this.state.mobile}
                onChangeText={e => [this.setState({mobile: e})]}
                iconName="mobile1"
                iconSize={25}
                iconType="AntDesign"
                keyboardType="numeric"
                maxLength={10}
              />
              <InputText
                label="Password"
                placeholder="Password"
                placeholderTextColor={this.theme.color.grayPrimary}
                value={this.state.password}
                onChangeText={e => [this.setState({password: e})]}
                iconName="eye"
                iconSize={20}
                iconType="FontAwesome"
              />
              <View
                style={{
                  alignSelf: 'flex-end',
                  flexDirection: 'column',
                  marginTop: this.theme.scale * 13,
                  marginEnd: this.theme.scale * 5,
                  zIndex: -1,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate('ForgetPassword');
                  }}>
                  <Text
                    style={{
                      color: this.theme.color.yellowPrimary,
                      fontSize: this.theme.scale * 14,
                      fontWeight: '500',
                      textAlign: 'right',
                      marginBottom: this.theme.scale * 5,
                    }}>
                    Forget Password ?
                  </Text>
                </TouchableOpacity>

                <View style={[styles(this.theme).frameParentFlexBox]}>
                  <View style={styles(this.theme).m87f9cWrapper}>
                    <Text
                      style={[
                        styles(this.theme).m87f9c,
                        styles(this.theme).hindiFlexBox,
                      ]}>
                      {generatedCaptcha}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles(this.theme).vectorWrapper}
                    onPress={this.refreshCaptcha}>
                    <Image
                      style={styles(this.theme).vectorIcon1}
                      resizeMode="cover"
                      source={require('../../../assets/images/vector1.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <InputText
                label="captcha"
                placeholder="Enter Captcha"
                placeholderTextColor={this.theme.color.grayPrimary}
                value={this.state.captcha}
                onChangeText={e => [this.setState({captcha: e})]}
              />
              <View style={styles(this.theme).buttonView}>
                <CustomButton
                  title="Login"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    borderRadius: this.theme.scale * 27,
                  }}
                  onPress={this.handleLogin}
                />
                <SCustomButton
                  title="Register"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    borderRadius: this.theme.scale * 27,
                  }}
                  onPress={this.hanldeRegister}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
        <View style={styles(this.theme).addIcon}>
          <LoginRegFooter
            theme={this.theme}
            navigation={this.props.navigation}
          />
        </View>
        {this.state.isProcessing && <ProcessingLoader />}
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    row: {
      display: 'flex',
      // justifyContent: 'center',
      alignItems: 'center',
    },

    container: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
    },
    mainContainer: {
      flex: 1,
    },
    m87f9c: {
      fontSize: theme.scale * 24,
      fontFamily: FontFamily.sansation,
      textAlign: 'left',
      // color:'#fff'
    },
    m87f9cWrapper: {
      backgroundColor: theme.color.yellowPrimary,
      justifyContent: 'center',
      paddingHorizontal: theme.scale * 7,
      paddingVertical: theme.scale * 3,
      borderRadius: theme.scale * 1,
    },
    frameParentFlexBox: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 5,
    },
    hindiFlexBox: {
      textAlign: 'left',
      color: theme.color.whitePrimary,
    },
    vectorIcon1: {
      width: theme.scale * 25,
      height: theme.scale * 25,
      tintColor: theme.color.whitePrimary,
    },
    vectorWrapper: {
      backgroundColor: theme.color.yellowPrimary,
      paddingHorizontal: theme.scale * 7,
      paddingVertical: theme.scale * 6,
      marginLeft: theme.scale * 8,
      flexDirection: 'row',
      borderRadius: theme.scale * 1,
    },
    buttonView: {
      flexDirection: 'row',
      gap: theme.scale * 17,
      marginTop: theme.scale * 15,
    },
    addIcon: {
      bottom: theme.scale * 16,
      alignItems: 'center',
    },
    arSparshTypo: {
      color: theme.color.blackPrimary,
      fontFamily: FontFamily.sansation,
      fontSize: theme.scale * 21,
      position: 'absolute',
      bottom: theme.scale * 28,
    },
  });
