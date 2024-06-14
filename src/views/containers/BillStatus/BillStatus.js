// import { View, Text } from 'react-native'
// import React from 'react'

// const BillStatus = () => {
//   return (
//     <View>
//       <Text>BillStatus</Text>
//     </View>
//   )
// }

// export default BillStatus
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
export default class BillStatus extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      userType: 'Select Bill Type',
      selectedPickerData: {
        Id: -1,
        Name: 'Select Bill Type',
        Value: 'Select Bill Type',
      },
    };
  }
  pickerData = [
    {
      Id: 1,
      Name: 'Salary Bill',
      Value: 'Salary Bill',
    },
    {
      Id: 2,
      Name: 'Arrear Bill',
      Value: 'Arrear Bill',
    },
    {
      Id: 3,
      Name: 'DA Arrear Bill',
      Value: 'DA Arrear Bill',
    },
    {
      Id: 4,
      Name: 'Honorium Bill',
      Value: 'Honorium Bill',
    },
    {
      Id: 5,
      Name: 'CDDO Payment Bill',
      Value: 'CDDO Payment Bill',
    },
    {
      Id: 6,
      Name: 'Bouns Bill',
      Value: 'Bouns Bill',
    },
  ];
  handleSubmit = () => {
    const {userType} = this.state;
    if (userType == 'Select Bill Type') {
      Alert.alert('Alert!', 'Please Select Bill Type');
    } else {
      console.log('Submit button clicked');
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
            title="CPBO"
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
                  zIndex: -2,
                  borderRadius: this.theme.scale * 27,
                }}
                onPress={this.handleSubmit}
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
