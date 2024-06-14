import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  ScrollView,
  Alert,
} from 'react-native';

import CustomIcon from '../../layouts/CustomIcon';
import { SDropDownPicker } from '../../components/customComponent/CustomDropDown';
import CustomStyles from '../../styles/CustomStyles';
import { InputText } from '../../components/customComponent/InputText';
import { FontFamily, FontSize } from '../../containers/GlobalStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  CustomButton,
  SCustomButton,
} from '../../components/customComponent/CustomButton';
export default class LoginRegFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      helpModalVisible: false,
      generatedCaptcha: this.generateCaptcha(),
      regimentalNumber: '',
      issue: '',
      captcha: '',
      userType: 'Select User',
      selectedPickerData: {
        Id: -1,
        Name: 'Select User',
        Value: 'Select User',
      },
    };
  }

  navigateReport = () => {
    this.setState({ modalVisible: true });
  };
  navigateHelp = () => {
    this.setState({ helpModalVisible: true });
  };

  onReportModalClose = () => {
    this.setState({
      modalVisible: false,
      captcha: '',
      regimentalNumber: '',
      issue: '',
      userType: 'Select User',
    });
  };

  onHelpModalClose = () => {
    this.setState({
      helpModalVisible: false,
      captcha: '',
      regimentalNumber: '',
      issue: '',
      userType: 'Select User',
    });
  };

  generateCaptcha = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(
      { length: 6 },
      () => characters[Math.floor(Math.random() * characters.length)],
    ).join('');
  };
  refreshCaptcha = () => {
    this.setState({ generatedCaptcha: this.generateCaptcha() });
  };

  handleHelp = () => { };
  handleReport = () => {
    const { captcha, regimentalNumber, issue, userType, generatedCaptcha } =
      this.state;
    if (userType === 'Select User') {
      Alert.alert('Alert! Please Select User');
    }
    else if (regimentalNumber.trim() == '') {
      Alert.alert('Alert! Please Enter Regimental Number');
    }
    else if (issue.trim() == '') {
      Alert.alert('Alert!', 'Please Enter Issue')
    } else if(captcha.trim()==''){
      Alert.alert('Alert!', 'Please Enter Captchas')
    }
    else if (captcha !== generatedCaptcha) {
      Alert.alert('Alert!', 'Invalid Captach')
    }
  };

  render() {
    const { title, theme } = this.props;
    const { generatedCaptcha } = this.state;
    const activeTextStyle = [{ fontWeight: '700' }];
    return (
      <View style={styles(theme).footerIcon}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setState({ modalVisible: false })}>
          <View style={styles(theme).modalContainer}>
            <View style={styles(theme).modalContent}>
              <TouchableOpacity
                onPress={this.onReportModalClose}
                style={styles(theme).closeButtonContainer}>
                {/* <Image
                  source={require('../../../assets/images/cross.png')}
                  resizeMode="cover"
                  style={{
                    width: theme.scale * 40,
                    height: theme.scale * 40,
                    aspectRatio: 1 / 1,
                    tintColor: 'white',
                  }}
                /> */}
                <View style={styles(theme).crossView}>
                  <CustomIcon
                    iconName={'cross'}
                    iconSize={24}
                    iconColor={theme.color.blackPrimary}
                    iconType={'Entypo'}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  marginHorizontal: theme.scale * 16,
                }}>
                <Text style={[styles(theme).arSparshTypo]}>{`Report`}</Text>
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
                    CustomStyles(theme).textInputContainer,
                    CustomStyles(theme).customWidth100,
                  ]}
                  dropdownBtnTxtStyle={[
                    CustomStyles(theme).dropdownBtnTxtStyle,
                    {
                      marginLeft: 4,
                    },
                  ]}
                  labelStyle={CustomStyles(theme).textInputLabel}
                />
                <InputText
                  placeholder="Regimental Number"
                  placeholderTextColor={theme.color.grayPrimary}
                  value={this.state.regimentalNumber}
                  onChangeText={e => [this.setState({ regimentalNumber: e })]}
                  iconName="mobile1"
                  iconSize={25}
                  iconType="AntDesign"
                />
                <InputText
                  label="Issues"
                  placeholder="Issue"
                  placeholderTextColor={theme.color.grayPrimary}
                  value={this.state.issue}
                  onChangeText={e => [this.setState({ issue: e })]}
                  iconName="box-tissue"
                  iconSize={15}
                  iconType="FontAwesome5"
                />
                <View
                  style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'column',
                    marginTop: theme.scale * 13,
                    zIndex: -1,
                  }}>
                  <View style={[styles(theme).frameParentFlexBox]}>
                    <View style={styles(theme).m87f9cWrapper}>
                      <Text
                        style={[
                          styles(theme).m87f9c,
                          styles(theme).hindiFlexBox,
                        ]}>
                        {generatedCaptcha}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles(theme).vectorWrapper}
                      onPress={this.refreshCaptcha}>
                      <Image
                        style={styles(theme).vectorIcon1}
                        resizeMode="cover"
                        source={require('../../../assets/images/vector1.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <InputText
                  label="captcha"
                  placeholder="Enter Captcha"
                  placeholderTextColor={theme.color.grayPrimary}
                  value={this.state.captcha}
                  onChangeText={e => [this.setState({ captcha: e })]}
                />
                <CustomButton
                  title="Report"
                  btnContainerStyle={{
                    height: theme.scale * 45,
                    width: '99%',
                    borderRadius: theme.scale * 27,
                  }}
                  onPress={this.handleReport}
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.helpModalVisible}
          onRequestClose={() => this.setState({ helpModalVisible: false })}>
          <View style={styles(theme).modalContainer}>
            <View style={styles(theme).modalContent}>
              <TouchableOpacity
                onPress={this.onHelpModalClose}
                style={styles(theme).closeButtonContainer}>
                <View style={styles(theme).crossView}>
                  <CustomIcon
                    iconName={'cross'}
                    iconSize={24}
                    iconColor={'#000'}
                    iconType={'Entypo'}
                  />
                </View>
              </TouchableOpacity>

              <View
                style={{
                  marginHorizontal: theme.scale * 16,
                }}>
                <Text style={[styles(theme).arSparshTypo]}>{`Help`}</Text>
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
                    CustomStyles(theme).textInputContainer,
                    CustomStyles(theme).customWidth100,
                  ]}
                  dropdownBtnTxtStyle={[
                    CustomStyles(theme).dropdownBtnTxtStyle,
                    {
                      marginLeft: 4,
                    },
                  ]}
                  labelStyle={CustomStyles(theme).textInputLabel}
                />
                <InputText
                  placeholder="Regimental Number"
                  placeholderTextColor={theme.color.grayPrimary}
                  value={this.state.regimentalNumber}
                  onChangeText={e => [this.setState({ regimentalNumber: e })]}
                  iconName="mobile1"
                  iconSize={25}
                  iconType="AntDesign"
                />
                <InputText
                  label="issues"
                  placeholder="Issue"
                  placeholderTextColor={theme.color.grayPrimary}
                  value={this.state.issue}
                  onChangeText={e => [this.setState({ issue: e })]}
                  iconName="box-tissue"
                  iconSize={15}
                  iconType="FontAwesome5"
                />
                <View
                  style={{
                    alignSelf: 'flex-end',
                    flexDirection: 'column',
                    marginTop: theme.scale * 13,
                    zIndex: -1,
                  }}>
                  <View style={[styles(theme).frameParentFlexBox]}>
                    <View style={styles(theme).m87f9cWrapper}>
                      <Text
                        style={[
                          styles(theme).m87f9c,
                          styles(theme).hindiFlexBox,
                        ]}>
                        {generatedCaptcha}
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={styles(theme).vectorWrapper}
                      onPress={this.refreshCaptcha}>
                      <Image
                        style={styles(theme).vectorIcon1}
                        resizeMode="cover"
                        source={require('../../../assets/images/vector1.png')}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <InputText
                  label="captcha"
                  placeholder="Enter Captcha"
                  placeholderTextColor={theme.color.grayPrimary}
                  value={this.state.captcha}
                  onChangeText={e => [this.setState({ captcha: e })]}
                />
                <CustomButton
                  title="Help"
                  btnContainerStyle={{
                    height: theme.scale * 45,
                    width: '99%',
                    borderRadius: theme.scale * 27,
                  }}
                  onPress={this.handleHelp}
                />
              </View>
            </View>
          </View>
        </Modal>
        <TouchableOpacity onPress={this.navigateReport}>
          <Image
            style={styles(theme).vectorIcon2}
            resizeMode="cover"
            source={require('../../../assets/images/vector2.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.navigateHelp}>
          <Image
            style={styles(theme).vectorIcon2}
            resizeMode="cover"
            source={require('../../../assets/images/vector3.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    footerIcon: {
      // height: theme.scale * 20,
      // aspectRatio: 1 / 1,
    },

    vectorIcon2: {
      width: theme.scale * 30,
      height: theme.scale * 30,
    },
    footerIcon: {
      flexDirection: 'row',

      gap: theme.scale * 260,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: theme.color.whitePrimary,
      paddingHorizontal: theme.scale * 20,
      borderTopLeftRadius: theme.scale * 20,
      borderTopRightRadius: theme.scale * 20,
      minHeight: '63%',
    },
    closeButtonContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      bottom: theme.scale * 38,
    },
    m87f9c: {
      fontSize: theme.scale * 24,
      fontFamily: FontFamily.sansation,
      textAlign: 'left',
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
      marginLeft: theme.scale * 10,
      flexDirection: 'row',
      borderRadius: theme.scale * 1,
    },
    buttonView: {
      flexDirection: 'row',
      gap: theme.scale * 40,
      marginTop: theme.scale * 15,
    },
    arSparshTypo: {
      color: theme.color.blackPrimary,
      fontFamily: FontFamily.sansation,
      fontSize: theme.scale * 21,
      textAlign: 'center',
    },
    crossView: {
      width: theme.scale * 35,
      height: theme.scale * 35,
      backgroundColor: '#ffff',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
    },
  });
