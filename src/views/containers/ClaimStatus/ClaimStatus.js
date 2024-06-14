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
import {FontFamily, Color, FontSize} from '../GlobalStyles';
import {CustomButton} from '../../components/customComponent/CustomButton';
import {SDropDownPicker} from '../../components/customComponent/CustomDropDown';
import Header from '../../layouts/Header';
import CustomStyles from '../../styles/CustomStyles';
export default class ClaimStatus extends React.Component {
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
      Name: 'Natural Calamities Grant',
      Value: 'Natural Calamities Grant',
    },
    {Id: '2', Name: 'Funeral Grant', Value: 'Funeral Grant'},
    {Id: '3', Name: 'Marriage Grant', Value: 'Marriage Grant'},
    {
      Id: '4',
      Name: 'One Time Old Age  Grant',
      Value: 'One Time Old Age  Grant',
    },
    {Id: '5', Name: 'Medical Grant', Value: 'Medical Grant'},
    {Id: '6', Name: 'School Education Grant', Value: 'School Education Grant'},
    {Id: '7', Name: 'Higher Education Grant', Value: 'Higher Education Grant'},
    {
      Id: '8',
      Name: 'Constant Attendant Allce',
      Value: 'Constant Attendant Allce',
    },
    {
      Id: '9',
      Name: 'Constant Attendant Allce',
      Value: 'Constant Attendant Allce',
    },
    {
      Id: '10',
      Name: 'Various Document Required',
      Value: 'Various Document Required',
    },
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
            title="CLAIM STATUS"
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
                marginHorizontal: this.theme.scale * 16,
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
    container: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
    },
    mainContainer: {
      flex: 1,
    },
  });
