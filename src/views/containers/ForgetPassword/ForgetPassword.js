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
import Header from '../../layouts/Header';
import CustomStyles from '../../styles/CustomStyles';
export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      activeMobile: false,
      mobile: '',
      userType: 'Select User',
      selectedPickerData: {
        Id: -1,
        Name: 'Select User',
        Value: 'Select User',
      },
    };
  }

  
  forgetPassword =()=>{
    this.props.navigation.navigate('VerifyOtp')
  }

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
          <Header
            title="FORGET PASSWORD"
            theme={this.theme}
            navigation={this.props.navigation}
          />
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              // justifyContent: 'center',
            }}>
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
                placeholder="Mobile Number / Regimental Number"
                placeholderTextColor="gray"
                value={this.state.mobile}
                onChangeText={e => [this.setState({mobile: e})]}
                iconName="mobile1"
                iconSize={25}
                iconType="AntDesign"
              />
                <CustomButton
                  title="Proceed"
                  btnContainerStyle={{
                    height: this.theme.scale * 45,
                    width:'99%',
                    zIndex:-1,
                    borderRadius: this.theme.scale * 27,
                  }}
                  onPress={this.forgetPassword}
                />
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
    },
    frameParentFlexBox: {
      alignItems: 'center',
      flexDirection: 'row',
    },
    hindiFlexBox: {
      textAlign: 'left',
      color: Color.colorBlack,
    },
    vectorIcon1: {
      width: theme.scale * 25,
      height: theme.scale * 25,
    },
    vectorWrapper: {
      backgroundColor: theme.color.yellowPrimary,
      paddingHorizontal: theme.scale * 7,
      paddingVertical: theme.scale * 6,
      marginLeft: theme.scale * 8,
      flexDirection: 'row',
    },
    buttonView: {
      flexDirection: 'row',
      gap: theme.scale * 40,
      marginTop: theme.scale * 15,
    },
    addIcon: {
      position: 'absolute',
      right: theme.scale * 25,
      bottom: theme.scale * 8,
      // zIndex: 999,
    },
    arSparshTypo: {
      color: theme.color.blackPrimary,
      fontFamily: FontFamily.sansation,
      fontSize: theme.scale * 21,
      position: 'absolute',
      bottom: theme.scale * 28,
    },
  });
