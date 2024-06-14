// import { View, Text } from 'react-native'
// import React from 'react'

// const ClaimStatus = () => {
//   return (
//     <View>
//       <Text>ClaimStatus</Text>
//     </View>
//   )
// }

// export default ClaimStatus
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

import ProcessingLoader from '../../layouts/ProcessingLoader';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {InputText} from '../../components/customComponent/InputText';
import {FontFamily, Color, FontSize} from '../GlobalStyles';
import {CustomButton} from '../../components/customComponent/CustomButton';
import {SDropDownPicker} from '../../components/customComponent/CustomDropDown';
import Header from '../../layouts/Header';
import CustomStyles from '../../styles/CustomStyles';
export default class EMIStatus extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      userType: 'Select Type of Claim',
      selectedPickerData: {
        Id: -1,
        Name: 'Select Type of Claim',
        Value: 'Select Type of Claim',
      },
    };
  }
  pickerData = [
    {
      Id: 1,
      Name: 'HBA',
      Value: 'HBA',
    },
    {
      Id: '2',
      Name: 'CAR',
      Value: 'CAR',
    },
    {Id: '3', Name: 'TWO WHEELER', Value: 'TWO WHEELER'},
    {
      Id: '4',
      Name: 'MARRIAGE',
      Value: 'MARRIAGE',
    },
    {Id: '5', Name: 'EDUCATION', Value: 'EDUCATION'},
  ];

  handleSumbit = () => {
    const {userType} = this.state;
    if (userType == 'Select Type of Claim') {
      Alert.alert('Alert!', 'Please Select Type Of Claim');
    } else {
      console.log('claim button clicked');
    }
  };

  render() {
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
            title="EMI STATUS"
            theme={this.theme}
            navigation={this.props.navigation}
          />
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
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
                pickerData={this.pickerData}
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
              <CustomButton
                title="Submit"
                btnContainerStyle={{
                  height: this.theme.scale * 45,
                  width: '98%',
                  zIndex: -1,
                  borderRadius: this.theme.scale * 27,
                }}
                onPress={this.handleSumbit}
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
