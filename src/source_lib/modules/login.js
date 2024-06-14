import {reqAPI} from '../common/api';
// import "../modules/login";
import {requestHome} from '../modules/home';
import {executeSQL} from '../common/db';
let formData = '';

export function loginClick(req_prm, navigation, formData) {
  //var sq="select * from settings where id=1;"
  //var retvl=executeSQL(retvl);
  //var userid =  this.state.userid;
  //    const aa = this.props.formData["userid"];
  //    req_prm.formData.setState((props) => ({  // this will change the state
  //     userid:"",
  //     pass:""
  //  }))

  //   console.log(formData['userid']);
  // console.log.rMessage(this.formData);
  //console.log(this.formData)
  console.log(formData.userid);
  formData = {
    userid: '',
    pass: '',
  };
  validate_field = () => {
    const {userid, pass} = this.formData;

    if (userid == '') {
      console.log('Please Fill Username');
      return false;
    } else if (pass == '') {
      console.log('Please Fill Password');
      return false;
    }
    return true;
  };

  if (this.validate_field()) {
    const {userid, pass} = this.formData;
    if (userid === pass) {
      console.log('Successfully Login');
      navigation.navigate('Profile');
    } else {
      console.log('Please Enter Username & Password');
    }
  }

  //console.log(aa);
  // console.log("hi");

  //  navigation.navigate('Profile')
  global.jwt = '';
  //########### REMOVE THE BELOW LINE ##################
  //global.guid="454534535345355435355"; // remove this once local db issue is sorted out

  req_prm['guid'] = global.guid;
  var prm = {
    ret_fn: on_ret,
    api_method: 'POST',
    srvcID: 'login',
    eventID: '1',
    addInfo: req_prm,
  };
  reqAPI(prm);
  function on_ret(res_prm) {
    // global.jwt=res_prm["rData"]["jwt"];
    // // now save the java web token into the local database
    // executeSQL("update settings set settings_value='"+res_prm["rData"]["jwt"]+"' where id=2;","",(result)=>{
    //     if(result.rCode==0)
    //         requestHome(navigation);
    //     else
    //         console.log("A LocalDB error occured.Please try again");
    //   });
    //navigation
    //res_prm=JSON.parse(res_prm);
    //console.log(res_prm);
  }
}

export function sendOTPClick(req_prm, navigation) {
  if (!req_prm.mobile) {
    console.log('Enter Mobile Number');
  } else if (req_prm.mobile.length != 10) {
    console.log('Please Enter 10 Digit Mobile Number');
  } else {
    //   req_prm.sender.setState((prevState) => ({  // this will change the state
    //     pass_cont: {hide : "false"},
    //     btn_sendOTP:{hide:"true",disabled:true},
    //     btn_verifyOTP:{hide:"false"}
    //  }))

    //########### REMOVE THE BELOW LINE ##################
    //global.guid="454534535345355435355"; // remove this once local db issue is sorted out

    var prm = {
      ret_fn: on_ret,
      api_method: 'POST',
      srvcID: 'login',
      eventID: '2',
      addInfo: {guid: global.guid, mobile: req_prm.mobile},
    };
    //var prm={"ret_fn":on_ret ,"api_method":"GET","srvcID":"contacts"};
    //console.log(req_prm.mobile);
    reqAPI(prm);
    function on_ret(res_prm) {
      //console.log(req_prm.mobile);

      var prm = {
        eventID: 'SEND_OTP',
        addInfo: {
          guid: 'bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d',
          mobile_no: req_prm.mobile,
        },
      };
      // console.log(prm);

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
            //console.log(result, 'RESULTADO')

            req_prm.sender.setState(prevState => ({
              // this will change the state
              pass_cont: {hide: 'false'},
              btn_sendOTP: {hide: 'true', disabled: true},
              btn_verifyOTP: {hide: 'false'},
            }));
            console.log(result.rData.rMessage);
          } else {
            // console.log(result, 'RESULTADO')
            console.log(result.rData.rMessage);
          }
        })
        .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
      //console.log(res_prm.rData.rCode + " " + res_prm.rData.rMessage);
      //console.log(req_prm.mobile);
      if (res_prm.rData.rCode == 0) {
        // if otp was sent
      } else {
        navigation.navigate('LoginReg', {screen: 'login'});
      }
    }
    //this function will run a timer for 2 minutes before allowing resend otp option
    setTimeout(() => {
      req_prm.sender.setState(prevState => {
        // this will change the state
        return {
          btn_sendOTP: {
            title: 'Resend OTP',
            hide: 'false',
            backgroundColor: '#007059',
            textColor: 'red',
          },
        };
      });
    }, 10000);
  }
}

export function verifyOTPClick(req_prm, navigation) {
  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!req_prm.otp) {
    console.log('please Enter Otp');
  } else if (req_prm.otp.length != 8) {
    console.log('Please Enter 8 Digit Otp');
  } else if (!req_prm.name) {
    console.log('Please Fill Name');
  } else if (!req_prm.email) {
    console.log('Please Fill Email');
  } else if (!reg.test(req_prm.email) === true) {
    console.log('Please Fill Valid Email');
  } else if (!req_prm.pass) {
    console.log('Please Fill Password');
  } else if (req_prm.pass.length < 5) {
    console.log('Password should be more than 6 characters');
  } else if (!req_prm.confirm) {
    console.log('Please Fill confirm Password');
  } else if (req_prm.confirm !== req_prm.pass) {
    console.log('Your Password & Confirm Password is not Match');
  } else {
    req_prm.sender.setState(prevState => ({
      // this will change the state
      //pass: {hide : "false"},
      //btn_sendOTP:{hide:"true",disabled:true},
      btn_verifyOTP: {disabled: true},
    }));

    //if(req_prm.otp.length<=0)

    var prm = {
      ret_fn: on_ret,
      api_method: 'POST',
      srvcID: 'login',
      eventID: '3',
      addInfo: {
        guid: global.guid,
        name: req_prm.name,
        email: req_prm.email,
        mobile: req_prm.mobile,
        otp: req_prm.otp,
        pass: req_prm.pass,
      },
    };
    //var prm={"ret_fn":on_ret ,"api_method":"GET","srvcID":"contacts"};
    reqAPI(prm);
    function on_ret(res_prm) {
      var prm = {
        eventID: 'VERIFY_OTP',
        addInfo: {
          guid: 'bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d',
          mobile_no: req_prm.mobile,
          otp: req_prm.otp,
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
          if (result.rData.rCode == 0) {
            console.log(result, 'RESULTADO');
            console.log(result.rData.rMessage);

            var prm = {
              eventID: 'REGISTER',
              addInfo: {
                full_name: req_prm.name,
                uname: req_prm.email,
                mobile_no: req_prm.mobile,
                guid: 'bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d',
                password: req_prm.pass,
              },
            };
            fetch('http://medskey.sourceinfosys.in/authentication', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(prm),
            })
              .then(resreg => resreg.json())
              .then(resultreg => {
                //console.log(result, 'RESULTADO')
                if (resultreg.rData.rCode === 0) {
                  console.log(resultreg, 'RESULTADO');
                  console.log(resultreg.rData.rData);
                  navigation.navigate('LoginReg', {screen: 'Login'});

                  //   this.props.navigation.navigate('Login');
                  //   this.props.navigation.navigate("LoginReg", {
                  //     params: {
                  //         screen: 'Login',
                  //       }
                  // });
                }
                if (resultreg.rStatus === 100) {
                  console.log(resultreg.rData.Error);
                } else {
                  //console.log(result, 'RESULTADO')
                  console.log(resultreg.rData.rData);
                }
              })
              .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));

            //this.props.navigation.navigate('Login');
            //navigation.navigate('LoginReg', { screen: 'login' });
          } else {
            //console.log(result, 'RESULTADO')
            console.log(result.rData.rMessage);
            // navigation.navigate('LoginReg', { screen: 'login' });
          }
        })
        .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
      if (res_prm.rData.rCode == 0) {
        req_prm.sender.setState(prevState => ({
          // this will change the state
          btn_verifyOTP: {disabled: false},
        }));
        //redirect to login page

        navigation.navigate('LoginReg', {screen: 'login'});
      } else {
        console.log(res_prm.rData.rMessage);
        req_prm.sender.setState(prevState => ({
          // this will change the state
          btn_verifyOTP: {disabled: false},
        }));
      }
    }
  }
}

export function sendOTPClickPatient(req_prm, navigation) {
  if (!req_prm.mobile) {
    console.log('Enter Mobile Number');
  } else if (req_prm.mobile.length != 10) {
    console.log('Please Enter 10 Digit Mobile Number');
  } else {
    //   req_prm.sender.setState((prevState) => ({  // this will change the state
    //     pass_cont: {hide : "false"},
    //     btn_sendOTP:{hide:"true",disabled:true},
    //     btn_verifyOTP:{hide:"false"}
    //  }))

    //########### REMOVE THE BELOW LINE ##################
    //global.guid="454534535345355435355"; // remove this once local db issue is sorted out

    var prm = {
      ret_fn: on_ret,
      api_method: 'POST',
      srvcID: 'login',
      eventID: '2',
      addInfo: {guid: global.guid, mobile: req_prm.mobile},
    };
    //var prm={"ret_fn":on_ret ,"api_method":"GET","srvcID":"contacts"};
    //console.log(req_prm.mobile);
    reqAPI(prm);
    function on_ret(res_prm) {
      //console.log(req_prm.mobile);

      var prm = {
        eventID: 'SEND_OTP',
        addInfo: {
          guid: 'bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d',
          mobile_no: req_prm.mobile,
        },
      };
      // console.log(prm);

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
            //console.log(result, 'RESULTADO')
            req_prm.sender.setState(prevState => ({
              // this will change the state
              pass_cont_patient: {hide: 'false'},
              btn_sendOTP_patient: {hide: 'true', disabled: true},
              btn_verifyOTP_patient: {hide: 'false'},
            }));
            //    req_prm.sender.setState((prevState) => ({  // this will change the state
            //     pass_cont: {hide : "false"},
            //     btn_sendOTP:{hide:"true",disabled:true},
            //     btn_verifyOTP:{hide:"false"}
            //  }))
            console.log(result.rData.rMessage);
          } else {
            // console.log(result, 'RESULTADO')
            console.log(result.rData.rMessage);
          }
        })
        .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
      //console.log(res_prm.rData.rCode + " " + res_prm.rData.rMessage);
      //console.log(req_prm.mobile);
      // if(res_prm.rData.rCode==0) // if otp was sent
      // {

      // }
      // else
      // {
      //     navigation.navigate('LoginReg', { screen: 'login' });
      // }
    }
    //this function will run a timer for 2 minutes before allowing resend otp option
    setTimeout(() => {
      req_prm.sender.setState(prevState => {
        // this will change the state
        return {
          btn_sendOTP_patient: {
            title: 'Resend OTP',
            hide: 'false',
            backgroundColor: '#007059',
            textColor: 'red',
          },
        };
      });
    }, 10000);
  }
}

export async function verifyOTPClickPatient(req_prm, navigation) {
  console.log(req_prm);

  const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!req_prm.otp) {
    console.log('please Enter Otp');
  } else if (req_prm.otp.length != 8) {
    console.log('Please Enter 8 Digit Otp');
  } else if (!req_prm.name) {
    console.log('Please Fill Name');
  } else if (!req_prm.email) {
    console.log('Please Fill Email');
  } else if (!reg.test(req_prm.email) === true) {
    console.log('Please Fill Valid Email');
  } else if (!req_prm.dob) {
    console.log('Please Fill Date of Birth');
  } else if (!req_prm.gender) {
    console.log('Please Fill Gender');
  } else if (!req_prm.pin) {
    console.log('Please Fill Pin');
  } else if (req_prm.pin.length < 6) {
    console.log('Pin should be more than 6 characters');
  } else if (!req_prm.confirmpin) {
    console.log('Please Fill confirm Pin');
  } else if (req_prm.confirmpin !== req_prm.pin) {
    console.log('Your Pin & Confirm Pin is not Match');
  } else {
    req_prm.sender.setState(prevState => ({
      // this will change the state
      //pass: {hide : "false"},
      //btn_sendOTP:{hide:"true",disabled:true},
      btn_verifyOTP_patient: {disabled: true},
    }));

    //if(req_prm.otp.length<=0)

    var prm = {
      ret_fn: on_ret,
      api_method: 'POST',
      srvcID: 'login',
      eventID: '3',
      addInfo: {
        guid: global.guid,
        name: req_prm.name,
        email: req_prm.email,
        mobile: req_prm.mobile,
        otp: req_prm.otp,
        pass: req_prm.pass,
      },
    };
    var prm = {ret_fn: on_ret, api_method: 'GET', srvcID: 'contacts'};
    await reqAPI(prm);

    function on_ret(res_prm) {
      var prm = {
        eventID: 'VERIFY_OTP',
        addInfo: {
          guid: 'bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d',
          mobile_no: req_prm.mobile,
          otp: req_prm.otp,
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
          if (result.rData.rCode == 0) {
            console.log(result, 'RESULTADO');
            console.log(result.rData.rMessage);

            var prm = {
              eventID: 'REGISTER_PAT',
              addInfo: {
                full_name: req_prm.name,
                email_id: req_prm.email,
                mobile_no: req_prm.mobile,
                dob: req_prm.dob,
                gender: req_prm.gender,
                // guid: "bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d",
                pin: req_prm.pin,
              },
            };
            console.log(prm);
            fetch('http://medskey.sourceinfosys.in/patients', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(prm),
            })
              .then(respat => respat.json())
              .then(resultpat => {
                if (resultpat.rData.rCode === 0) {
                  console.log(resultpat, 'RESULTADO');

                  navigation.navigate('PatientDocRecording');
                }
                if (resultpat.rStatus === 100) {
                  console.log(resultpat.rData.Error);
                } else {
                  //console.log(result, 'RESULTADO')
                  console.log(resultpat.rData.rData);
                }
              })
              .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
          } else {
            console.log(result.rData.rMessage);
          }
        })
        .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
      if (res_prm.rData.rCode == 0) {
        req_prm.sender.setState(prevState => ({
          // this will change the state
          btn_verifyOTP_patient: {disabled: false},
        }));
        //redirect to login page

        navigation.navigate('LoginReg', {screen: 'login'});
      } else {
        console.log(res_prm.rData.rMessage);
        req_prm.sender.setState(prevState => ({
          // this will change the state
          btn_verifyOTP_patient: {disabled: false},
        }));
      }
    }
  }
}
