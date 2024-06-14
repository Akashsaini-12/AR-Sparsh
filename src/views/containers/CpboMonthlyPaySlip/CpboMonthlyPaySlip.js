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
export default class CpboMonthlyPaySlip extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      userType: 'Select Month',
      selectedPickerData: {
        Id: -1,
        Name: 'Select Month',
        Value: 'Select Month',
      },
    };
  }
  pickerData = [
    {
      Id: 1,
      Name: 'May-2024',
      Value: 'May-2024',
    },
    {Id: '2', Name: 'April-2024', Value: 'April-2024'},
    {Id: '3', Name: 'March-2024', Value: 'March-2024'},
    {
      Id: '4',
      Name: 'February-2024',
      Value: 'February-2024',
    },
    {Id: '5', Name: 'January-2024', Value: 'January-2024'},
    {Id: '6', Name: 'December-2023', Value: 'December-2023'},
  ];
  handleView = () => {
    const {userType} = this.state;
    if (userType == 'Select Month') {
      Alert.alert('Alert!', 'Please Select Month');
    } else {
      console.log('View button clicked');
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
    row: {
      display: 'flex',
      alignItems: 'center',
    },

    container: {
      flex: 1,
      backgroundColor: theme.color.whitePrimary,
    },
    mainContainer: {
      flex: 1,
    },
  });
