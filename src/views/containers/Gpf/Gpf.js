import React, {forwardRef} from 'react';
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Image,
  Button,
  ScrollView,
  Alert
} from 'react-native';

import ProcessingLoader from '../../layouts/ProcessingLoader';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {InputText} from '../../components/customComponent/InputText';
import {FontFamily, Color, FontSize} from '../GlobalStyles';
import {CustomButton} from '../../components/customComponent/CustomButton';
import {SDropDownPicker} from '../../components/customComponent/CustomDropDown';
import Header from '../../layouts/Header';
import CustomStyles from '../../styles/CustomStyles';
export default class Gpf extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      finYear: 'Select fin Year',
      selectedPickerData: {
        Id: -1,
        Name: 'Select Fin Year',
        Value: 'Select Fin Year',
      },
    };
  }
  pickerData = [
    {
      Id: 1,
      Name: '2020',
      Value: '2020',
    },
    {
      Id: 2,
      Name: '2021',
      Value: '2021',
    },
    {
      Id: 3,
      Name: '2023',
      Value: '2023',
    },
  ];

  handleView = () => {
    const {finYear} = this.state;
    if (finYear == 'Select fin Year') {
      Alert.alert('Alert!', 'Please Select Fin Year');
    } else {
     this.props.navigation.navigate('ViewPdf')
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
            title="GPF"
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
                placeholder={this.state.finYear}
                selectedPickerData={this.state.selectedPickerData}
                pickerData={this.pickerData}
                onChange={e => {
                  this.setState({
                    finYear: e.Value.toString(),
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
                title="View"
                btnContainerStyle={{
                  height: this.theme.scale * 45,
                  width: '98%',
                  zIndex: -1,
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
