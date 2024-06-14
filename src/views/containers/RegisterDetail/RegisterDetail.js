/* eslint-disable react-native/no-inline-styles */
import {Text, View, Image, StyleSheet, ScrollView} from 'react-native';
import React from 'react';

import {STextInput, SButton, SView} from 'views/layouts/SourceComponents';

export default class RegisterDetail extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme; // this came as initialParam
    this.state = {};

    this.state.pass_cont = {hide: 'true'};

    this.state.btn_sendOTP = {};
    this.state.btn_verifyOTP = {hide: 'true'};
    this.formData = {};
    this.formData.sender = this; // pass this instance as ref to be used by login functions
    this.styles = this.createStyles(this.theme);
  }

  createStyles(theme) {
    const styles = StyleSheet.create({
      echsLogo: {
        left: -45,
        top: -250,
        position: 'absolute',
        width: '100%',
        resizeMode: 'contain',
        //backgroundColor:"green",

        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {top: 10, width: 0, height: 0},
        elevation: 8,
        shadowOpacity: 0.5,
      },

      sdcplLogo: {
        //backgroundColor:"green",
        width: 80,
        height: 100,
        top: 250,
        right: 20,
        position: 'absolute',
        resizeMode: 'contain',

        shadowColor: 'black',
        shadowRadius: 5,
        shadowOffset: {top: 10, width: 0, height: 0},
        elevation: 8,
        shadowOpacity: 0.5,
      },
      captionMedium: {
        color: '#253C8F',
        fontSize: 50,
      },
      captionBig: {
        color: '#0B78E0',
        fontSize: 20,
      },
    });
    return styles;
  }

  validate_field = () => {
    const {name, email, mobile, password, cpassword} = this.formData;
    if (name == '') {
      alert('Please Fill Name');
      return false;
    } else if (email == '') {
      alert('Please Fill Email');
      return false;
    } else if (mobile == '') {
      alert('Please Fill Mobile');
      return false;
    } else if (password == '') {
      alert('Please Fill Password');
      return false;
    } else if (cpassword == '') {
      alert('Please Fill Password');
      return false;
    }

    return true;
  };

  making_api_call = () => {
    if (this.validate_field()) {
      const {name, email, mobile, password} = this.formData;
      var prm = {
        eventID: 'REGISTER',
        addInfo: {
          full_name: name,
          uname: email,
          mobile_no: mobile,
          guid: 'bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d',
          password: password,
        },
      };
      //console.log(prm);

      fetch('http://medskey.sourceinfosys.in/authentication', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prm),
      })
        .then(res => res.json())
        .then(result => {
          //console.log(result, 'RESULTADO')
          if (result.rData.rCode === 0) {
            console.log(result, 'RESULTADO');
            alert(result.rData.rData);

            //alert("Successfully Login");
            this.props.navigation.navigate('Login');
          }
          if (result.rStatus === 100) {
            alert(result.rData.Error);
          } else {
            console.log(result, 'RESULTADO');
            alert(result.rData.rData);
          }
        })
        .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
    }
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            backgroundColor: this.theme.color.stdScreenBackground,
            width: '100%',
            height: '100%',
          }}>
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: 15,
              borderTopRightRadius: 15,
              paddingTop: 120,
            }}>
            {/* <Image style={this.styles.echsLogo} source={require('../images/echsnew1.png')} />
          <Image  style={this.styles.sdcplLogo} source={require('../images/sdc_logo.png')}/> */}
            <Text style={this.styles.captionMedium}>
              MedsKey D<Text style={this.styles.captionBig}></Text>
            </Text>
            <STextInput
              placeholder="Enter Your Name"
              label="Name"
              theme={this.theme}
              onChange={text => (this.formData['name'] = text)}
              {...this.state.prop}
            />
            <STextInput
              placeholder="Enter Your Email ID"
              label="Email"
              theme={this.theme}
              onChange={text => (this.formData['email'] = text)}
              {...this.state.prop}
            />

            <STextInput
              placeholder="Enter Your Mobile No"
              label="Mobile"
              theme={this.theme}
              onChange={text => (this.formData['mobile'] = text)}
              {...this.state.prop}
            />

            {/* <STextInput keyboardType={"number-pad"} placeholder="Username" label="Mobile / UserID" theme={this.theme} onChange={(text)=>this.formData["userid"]=text} {...this.state.prop}/> */}
            <STextInput
              label="Password"
              theme={this.theme}
              onChange={text => (this.formData['password'] = text)}
              secureTextEntry={true}
            />
            <STextInput
              label="Confirm Password"
              theme={this.theme}
              onChange={text => (this.formData['cpassword'] = text)}
              secureTextEntry={true}
            />

            {/* <SButton iconSet={2} theme={this.theme} IconSize={40} IconName="enter-sharp" backgroundColor={this.theme.color.stdButton} textAlign="center" title={"Login"} onPress={()=>loginClick(this.formData,this.props.navigation)}/>  */}
            <SButton
              iconSet={2}
              theme={this.theme}
              IconSize={40}
              IconName="enter-sharp"
              backgroundColor={this.theme.color.stdButton}
              textAlign="center"
              title={'Register'}
              onPress={() => this.making_api_call()}
            />
          </View>
        </View>
      </ScrollView>
    );
  }
}
