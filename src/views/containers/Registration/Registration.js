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
  Pressable,
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
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      name: '',
      regimentalNumber: '',
      dob: '',
      mobile: '',
      pan: '',
      password: '',
      email: '',
      captcha: '',
      isDatePickerVisible: false,
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
  handleLogin = () => {
    this.props.navigation.navigate('Login');
  };
  hanldeRegister = () => {
    const {userType, name, email, mobile, dob, pan} = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[^@0-9_][A-Za-z0-9_]*$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    if (userType === 'Select User') {
      Alert.alert('Alert!', 'Please Select User');
    } else if (name.trim() === '') {
      Alert.alert('Alert!', 'Please Enter the Name');
    } else if (!nameRegex.test(name)) {
      Alert.alert('Alert!', 'Please Enter the valid Name');
    } else if (email.trim() === '') {
      Alert.alert('Alert!', 'Please Enter the Email');
    } else if (!emailRegex.test(email)) {
      Alert.alert('Alert!', 'Please enter a valid Email');
    } else if (mobile.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Regimental Number');
    } else if (dob.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Regimental Number');
    } else if (pan.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Password');
    } else if (!panRegex.test(pan)) {
      Alert.alert('Alert!', 'Please Enter valid PAN Card Number');
    } else {
      showMessageToast('Registration Successfully');
      this.setState({
        mobile: '',
        password: '',
        userType: 'Select User',
      });
      this.props.navigation.navigate('Login');
    }
  };

  showDatePicker = () => {
    this.setState({isDatePickerVisible: true});
  };
  hideDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };
  handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    this.hideDatePicker();
  };

  render() {
    const {isDatePickerVisible, showPassword} = this.state;
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
                  {
                    marginLeft: 4,
                  },
                ]}
                labelStyle={CustomStyles(this.theme).textInputLabel}
              />
              <InputText
                placeholder="Name"
                placeholderTextColor={this.theme.color.grayPrimary}
                value={this.state.name}
                onChangeText={e => [this.setState({name: e})]}
                iconName="user"
                iconSize={20}
                iconType="Feather"
              />
              <InputText
                placeholder="Email"
                placeholderTextColor={this.theme.color.grayPrimary}
                value={this.state.email}
                onChangeText={e => [this.setState({email: e})]}
                iconName="email"
                iconSize={20}
                iconType="Entypo"
              />
              <InputText
                placeholder="Mobile No/ Regimental No"
                placeholderTextColor={this.theme.color.grayPrimary}
                value={this.state.mobile}
                onChangeText={e => [this.setState({mobile: e})]}
                iconName="mobile1"
                iconSize={25}
                iconType="AntDesign"
              />
              <Pressable onPress={this.showDatePicker}>
                <InputText
                  placeholder="Date Of Birth"
                  placeholderTextColor={this.theme.color.grayPrimary}
                  value={this.state.dob}
                  onChangeText={e => [this.setState({dob: e})]}
                  iconName="calendar"
                  iconSize={20}
                  iconType="AntDesign"
                />
              </Pressable>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={this.handleConfirm}
                onCancel={this.hideDatePicker}
              />
              <InputText
                placeholder="Permanent Account Number"
                placeholderTextColor={this.theme.color.grayPrimary}
                value={this.state.pan}
                onChangeText={e => [this.setState({pan: e})]}
                iconName="creditcard"
                iconSize={20}
                iconType="AntDesign"
              />

              <View style={styles(this.theme).buttonView}>
                <SCustomButton
                  title="Login"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    borderRadius: this.theme.scale * 27,
                  }}
                  onPress={this.handleLogin}
                />
                <CustomButton
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
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
    },
    mainContainer: {
      flex: 1,
    },
    buttonView: {
      flexDirection: 'row',
      gap: theme.scale * 17,
      marginTop: theme.scale * 10,
    },
    arSparshTypo: {
      color: theme.color.blackPrimary,
      fontFamily: FontFamily.sansation,
      fontSize: theme.scale * 21,
      position: 'absolute',
      bottom: theme.scale * 28,
    },
    addIcon: {
      bottom: theme.scale * 16,
      alignItems: 'center',
    },
  });
