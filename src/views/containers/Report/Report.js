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

export default class Report extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,

      regimentalNumber: '',
      issue: '',
      captcha: '',
      userType: 'Select Prefix',
      selectedPickerData: {
        Id: -1,
        Name: 'Select User',
        Value: 'Select User',
      },
    };
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };
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
  handleLogin = () => {
    this.props.navigation.navigate('Login');
  };
  hanldeRegister = () => {
    this.props.navigation.navigate('Registration');
  };
  goBack = () => {
    this.props.navigation.goBack();
  };

  render() {
    const {password, showPassword} = this.state;
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
              justifyContent: 'center',
            }}>
            <View
              style={{
                flex: 1,
                padding: this.theme.scale * 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={logo_image}
                resizeMode="contain"
                style={{
                  height: 200,
                  aspectRatio: 1 / 1,
                }}
              />

              <SDropDownPicker
                placeholder={this.state.userType}
                selectedPickerData={this.state.selectedPickerData}
                pickerData={[
                  {
                    Name: 'User1',
                    Value: 'User1',
                    Id: 1,
                  },
                  {
                    Name: 'User2',
                    Value: 'User2 ',
                    Id: 2,
                  },
                  {
                    Name: 'User3',
                    Value: 'User3',
                    Id: 3,
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
                  {
                    marginLeft: 4,
                  },
                ]}
                labelStyle={CustomStyles(this.theme).textInputLabel}
              />
             
              <InputText
                placeholder="Regimental Number"
                placeholderTextColor="gray"
                value={this.state.regimentalNumber}
                onChangeText={e => [this.setState({regimentalNumber: e})]}
                iconName="mobile-alt"
                iconSize={20}
                iconType="FontAwesome5"
              />
              <InputText
                label="issues"
                placeholder="issue"
                placeholderTextColor="gray"
                value={this.state.issue}
                onChangeText={e => [this.setState({issue: e})]}
                iconName="box-tissue"
                iconSize={20}
                iconType="FontAwesome5"
              />
              <View
                style={{
                  alignSelf: 'flex-end',
                  flexDirection: 'column',
                  marginTop: this.theme.scale * 13,
                }}>
                <View style={[styles(this.theme).frameParentFlexBox]}>
                  <View style={styles(this.theme).m87f9cWrapper}>
                    <Text
                      style={[
                        styles(this.theme).m87f9c,
                        styles(this.theme).hindiFlexBox,
                      ]}>
                      M87F9C
                    </Text>
                  </View>
                  <TouchableOpacity style={styles(this.theme).vectorWrapper}>
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
                placeholderTextColor="gray"
                value={this.state.captcha}
                onChangeText={e => [this.setState({captcha: e})]}
              />
              <View style={styles(this.theme).buttonView}>
                <CustomButton
                  title="Report"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    borderRadius: this.theme.scale * 12,
                  }}
                  // onPress={this.making_api_call}
                />
                <CustomButton
                  title="Back"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    borderRadius: this.theme.scale * 12,
                  }}
                  onPress={this.goBack}
                />
              </View>
              <View>
                <LoginRegFooter
                  theme={this.theme}
                  navigation={this.props.navigation}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>

        {this.state.isProcessing && <ProcessingLoader />}
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
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
    },
    m87f9cWrapper: {
      backgroundColor: theme.color.yellowPrimary,
      justifyContent: 'center',
      paddingHorizontal: theme.scale * 8,
      paddingVertical: theme.scale * 4,
    },
    frameParentFlexBox: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    hindiFlexBox: {
      textAlign: 'left',
      color: theme.color.blackPrimary,
    },
    vectorIcon1: {
      width: theme.scale * 25,
      height: theme.scale * 25,
    },
    vectorWrapper: {
      backgroundColor: theme.color.yellowPrimary,
      paddingHorizontal: theme.scale * 8,
      paddingVertical: theme.scale * 7,
      marginLeft: theme.scale * 10,
      flexDirection: 'row',
    },
    buttonView: {
      flexDirection: 'row',
      gap: theme.scale * 40,
      marginTop: theme.scale * 15,
    },
  });
