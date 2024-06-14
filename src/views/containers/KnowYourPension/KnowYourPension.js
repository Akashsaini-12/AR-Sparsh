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
export default class KnowYourPension extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {
      isProcessing: false,
      basicPay: '',
      disability: '',
    };
  }
  handleCalculate = () => {
    const {basicPay ,disability} = this.state;
    if (basicPay.trim()=='') {
      Alert.alert('Alert!', 'Please Enter Basic Pay');
    } else if(disability.trim()=="") {
      Alert.alert('Alert!', 'Please Enter Disability Percentage');
    }
    else{
      console.log('calculated button clicked')
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
            title="KNOW YOUR PENSION"
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
              <InputText
                placeholder="Enter Basic Pay"
                placeholderTextColor="gray"
                value={this.state.basicPay}
                onChangeText={e => [this.setState({basicPay: e})]}
                iconName=""
                iconSize={20}
                iconType="FontAwesome5"
              />
              <InputText
                placeholder="Enter Percentage of Disability"
                placeholderTextColor="gray"
                value={this.state.disability}
                onChangeText={e => [this.setState({disability: e})]}
                iconName=""
                iconSize={10}
                iconType="FontAwesome5"
              />
              <CustomButton
                title="Calculate"
                btnContainerStyle={{
                  height: this.theme.scale * 45,
                  width: '98%',
                  zIndex: -2,
                  borderRadius: this.theme.scale * 27,
                }}
                onPress={this.handleCalculate}
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
