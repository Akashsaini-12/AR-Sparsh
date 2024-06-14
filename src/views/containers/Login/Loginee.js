import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// Components
import LoginRegFooter from 'views/layouts/Footer/LoginRegFooter';

import CustomIcon from 'views/layouts/CustomIcon';

import {makeNetworkRequest} from 'state/utils';
import {BASE_URL} from 'state/utils/makeNetworkRequest';
import {KEYS, storeData} from 'views/AsyncStorage';
import {showMessageToast, showErrorToast} from 'utils/rootToast';
import ProcessingLoader from 'views/layouts/ProcessingLoader';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile: '',
      password: '',
      isProcessing: false,
    };
  }

  handleLogin = async () => {
    const {mobile, password} = this.state;

    if (mobile.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Mobile Number');
      return;
    }

    if (password.trim() === '') {
      Alert.alert('Alert!', 'Please Enter Correct Password');
      return;
    }

    try {
      this.setState({isProcessing: true});

      const params = {
        eventID: 'LOGIN',
        addInfo: {
          uname: mobile,
          password,
          guid: 'bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d',
        },
      };

      const response = await makeNetworkRequest(
        BASE_URL + 'authentication',
        params,
      );

      if (response) {
        this.setState({isProcessing: false});
        const {rData} = response;

        if (rData?.rCode === 0) {
          await storeData(KEYS.USER_INFO, rData);
          this.props.navigation.replace('Home');
          showMessageToast(rData.rMessage);
        } else {
          showErrorToast(rData.rMessage);
        }
      } else {
        showErrorToast(response.rData.rMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.9, justifyContent: 'center'}}>
          <Text style={styles.logoText}>
            meds<Text style={{color: 'grey'}}>Key</Text>
          </Text>

          <Text style={styles.logoSemiText}>Hospital</Text>
        </View>

        <View style={styles.mainContainer}>
          <View style={styles.backDropStyle}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[]}>
              <View style={styles.inputContainer}>
                <Text
                  style={{fontSize: wp(3), fontWeight: '500', color: 'grey'}}>
                  Mobile Number
                </Text>
                <TextInput
                  placeholder="Enter Number"
                  style={styles.inputStyle}
                  maxLength={10}
                  keyboardType="number-pad"
                  value={this.state.mobile}
                  onChangeText={e => [this.setState({mobile: e})]}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text
                  style={{fontSize: wp(3), fontWeight: '500', color: 'grey'}}>
                  Password
                </Text>
                <TextInput
                  placeholder="Enter Password"
                  style={styles.inputStyle}
                  secureTextEntry={true}
                  value={this.state.password}
                  onChangeText={e => [this.setState({password: e})]}
                />
              </View>

              <TouchableOpacity
                style={styles.btnContainer}
                onPress={this.handleLogin}>
                <Text style={styles.btnText}>Login</Text>
                <CustomIcon
                  iconName={'login'}
                  iconSize={20}
                  iconColor={'#fff'}
                  iconStyle={styles.footerIcon}
                  iconType="Entypo"
                />
              </TouchableOpacity>
            </KeyboardAwareScrollView>
          </View>
        </View>

        {this.state.isProcessing && <ProcessingLoader />}

        <LoginRegFooter
          title="Login"
          theme={this.props.theme}
          navigation={this.props.navigation}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  mainContainer: {
    flex: 1,
  },
  logoText: {
    fontSize: hp(4.5),
    alignSelf: 'center',
    marginTop: hp(10),
    color: 'skyblue',
  },
  logoSemiText: {
    fontSize: wp(4),
    alignSelf: 'center',
    marginLeft: hp(15),
    marginBottom: hp(10),
    color: '#231B37',
  },

  backDropStyle: {
    height: hp(60),
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
    backgroundColor: 'rgba(255,255,255,0.9)',
    // elevation: 5,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingTop: hp(6),
  },

  inputContainer: {
    height: hp(9.5),
    backgroundColor: '#fff',
    width: wp(95),
    borderBottomWidth: 4,
    borderBottomColor: '#023C66',
    borderRadius: wp(2),
    elevation: 5,
    padding: wp(2),
    marginVertical: hp(1.5),
  },

  inputStyle: {
    fontSize: wp(4),
    color: '#222',
  },

  btnContainer: {
    backgroundColor: '#023C66',
    width: wp(95),
    height: hp(7),
    borderRadius: wp(1.5),
    marginTop: hp(4.5),
    alignItems: 'center',
    flexDirection: 'row',
    // justifyContent: 'center',
    paddingHorizontal: wp(4),
  },
  btnText: {
    color: '#fff',
    fontSize: wp(4.2),
    fontWeight: '600',
    flex: 1,
  },
});
