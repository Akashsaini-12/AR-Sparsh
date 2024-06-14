import React, { forwardRef } from 'react';
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

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { InputText } from '../../components/customComponent/InputText';
import { FontFamily, Color, FontSize } from '../GlobalStyles';
import { CustomButton } from '../../components/customComponent/CustomButton';
import { SDropDownPicker } from '../../components/customComponent/CustomDropDown';
import Header from '../../layouts/Header';
import CustomStyles from '../../styles/CustomStyles';
export default class CpboForm extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      userType: 'Select Year',
      selectedPickerData: {
        Id: -1,
        Name: 'Select Year',
        Value: 'Select Year',
      },
      selectPart: 'Select Part',
      selectedPartData: {
        Id: -1,
        Name: 'Select Part',
        Value: 'Select Part',
      },
    };
  }
  pickerData = [
    {
      Id: 1,
      Name: '2023-24',
      Value: '2023-24',
    },
    { Id: '2', Name: '2022-23', Value: '2022-23' },
  ];

  partData = [
    {
      Id: 1,
      Name: 'Part-A',
      Value: 'Part-A',
    },
    { Id: '2', Name: 'Part-B', Value: 'Part-B' },
  ];

  handleView = () => {
    const { userType, selectPart } = this.state;
    if (userType == 'Select Year') {
      Alert.alert('Alert!', 'Please Select Year');
    } else if (selectPart == 'Select Part') {
      Alert.alert('Alert!', 'Please Select Part');
    } else {
      console.log('View Button Clicked');
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

              <SDropDownPicker
                placeholder={this.state.selectPart}
                selectedPickerData={this.state.selectedPartData}
                pickerData={this.partData}
                onChange={e => {
                  this.setState({
                    userType: e.Value.toString(),
                    selectedPartData: e,
                  });
                }}
                containerStyle={[
                  CustomStyles(this.theme).textInputContainer,
                  { zIndex: -1 },
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
                title="View"
                btnContainerStyle={{
                  height: this.theme.scale * 45,
                  width: '98%',
                  zIndex: -2,
                  borderRadius: this.theme.scale * 27,
                }}
                onPress={this.handleView}
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
