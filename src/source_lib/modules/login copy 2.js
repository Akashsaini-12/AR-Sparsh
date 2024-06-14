import { reqAPI } from "../common/api";
// import "../modules/login";
import {requestHome} from "../modules/home";
import {executeSQL} from "../common/db";
let formData = '';

export function loginClick(req_prm,navigation,formData)
{
    //var sq="select * from settings where id=1;"
    //var retvl=executeSQL(retvl);
       //var userid =  this.state.userid;
    //    const aa = this.props.formData["userid"];
    //    req_prm.formData.setState((props) => ({  // this will change the state
    //     userid:"",
    //     pass:""
    //  })) 

//   alert(formData['userid']);
// alert.rMessage(this.formData);
//alert(this.formData) 
alert(formData.userid);
    formData={
        userid:"",
        pass:""
      };
      validate_field=()=>{
        
        const {userid, pass} = this.formData
        
        if(userid == ""){
            alert("Please Fill Username")
            return false;
        }else if(pass == ""){
            alert("Please Fill Password")
            return false;
        }
        return true;
    }
    
   
        if(this.validate_field()){
            const {userid, pass} = this.formData
            if(userid === pass){
                alert("Successfully Login");
                navigation.navigate('Profile')
            }else{
                alert("Please Enter Username & Password");
            }
            
        }
    
    
       


    
       //alert(aa);
      // alert("hi");
      
    
    //  navigation.navigate('Profile')
    global.jwt="";
    //########### REMOVE THE BELOW LINE ##################
    //global.guid="454534535345355435355"; // remove this once local db issue is sorted out

    req_prm["guid"]=global.guid;
    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"login","eventID" : "1","addInfo":req_prm};
    reqAPI(prm);
    function on_ret(res_prm)
    {

        // global.jwt=res_prm["rData"]["jwt"]; 
        // // now save the java web token into the local database
        // executeSQL("update settings set settings_value='"+res_prm["rData"]["jwt"]+"' where id=2;","",(result)=>{
        //     if(result.rCode==0)
        //         requestHome(navigation);
        //     else
        //         alert("A LocalDB error occured.Please try again");

        //   });

        
        //navigation
        //res_prm=JSON.parse(res_prm);
        //alert(res_prm);
    }
}

export function sendOTPClick(req_prm,navigation)
{
    req_prm.sender.setState((prevState) => ({  // this will change the state
        pass_cont: {hide : "false"},
        btn_sendOTP:{hide:"true",disabled:true},
        btn_verifyOTP:{hide:"false"}
     }))
     if(req_prm.mobile == ""){
      alert("Please Fill Mobile Number")
      return false;
  }  
    //########### REMOVE THE BELOW LINE ##################
    //global.guid="454534535345355435355"; // remove this once local db issue is sorted out

    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"login","eventID":"2","addInfo":{"guid":global.guid,"mobile":req_prm.mobile}};
    //var prm={"ret_fn":on_ret ,"api_method":"GET","srvcID":"contacts"};
    //alert(req_prm.mobile);
   
    reqAPI(prm);
    function on_ret(res_prm)
    {
        //alert(req_prm.mobile);
        
        var prm = {
            eventID: 'SEND_OTP',
            addInfo: {
              guid:"bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d",
              mobile_no:req_prm.mobile 
            }
          };
     // console.log(prm);
          
          
          fetch('http://medskey.sourceinfosys.in/authentication',
          {
            method: 'POST',
            headers: {  
              Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(prm)
          }
          ).then(res => res.json())
          .then(result =>{
            
            //console.log(result, 'RESULTADO')
            if(result.rData.rCode === 0){
              //console.log(result, 'RESULTADO')
             alert(result.rData.rMessage);
              
            }else{
              console.log(result, 'RESULTADO')
              alert(result.rData.rMessage);
            }
          })
          .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
        //alert(res_prm.rData.rCode + " " + res_prm.rData.rMessage);        
        //alert(req_prm.mobile);
        if(res_prm.rData.rCode==0) // if otp was sent 
        {

        }
        else
        {
            navigation.navigate('LoginReg', { screen: 'login' });
        }

        
    }
    //this function will run a timer for 2 minutes before allowing resend otp option
    setTimeout(() => {
        req_prm.sender.setState((prevState) => {  // this will change the state
                return {btn_sendOTP: {title:"Resend OTP",hide:"false",backgroundColor:"transparent", textColor:"red" }}
         })
    }, 10000);

}

export function verifyOTPClick(req_prm,navigation)
{
    req_prm.sender.setState((prevState) => ({  // this will change the state
        //pass: {hide : "false"},
        //btn_sendOTP:{hide:"true",disabled:true},
        btn_verifyOTP:{disabled:true}
     }))

    //if(req_prm.otp.length<=0)


    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"login","eventID":"3","addInfo":{"guid":global.guid,"name":req_prm.name,"email":req_prm.email,"mobile":req_prm.mobile,"otp":req_prm.otp,"pass":req_prm.pass,"guid":global.guid}};
    //var prm={"ret_fn":on_ret ,"api_method":"GET","srvcID":"contacts"};
    reqAPI(prm);
    function on_ret(res_prm)
    {
        
        
        var prm = {
            eventID: 'VERIFY_OTP',
            addInfo: {
              guid:"bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d",
              mobile_no:req_prm.mobile ,
              otp:req_prm.otp
            }
          };
          
      console.log(prm);
          
          
          fetch('http://medskey.sourceinfosys.in/authentication',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(prm)
          }
          ).then(res => res.json())
          .then(result =>{
            
            //console.log(result, 'RESULTADO')
            if(result.rData.rCode==0){
              //console.log(result, 'RESULTADO')
             //alert(result.rData.rMessage);
            
             //this.props.navigation.navigate('Login');
            
            }else{ 
              //console.log(result, 'RESULTADO')
              alert(result.rData.rMessage);

 

              var prm = {
                eventID: 'REGISTER',
                addInfo: {
                  full_name: req_prm.name,
                  uname: req_prm.email,
                  mobile_no: req_prm.mobile,
                  guid:"bf9825fc1aa3a828121bb77c2c3a79c8b6850ed6816b3a91c7a0531c2959b67d",
                  password: req_prm.pass
                }
              };
          //console.log(prm);
          
             //fetch('http://172.21.48.1:81/hrms/services/index.php',
             fetch('http://medskey.sourceinfosys.in/authentication',
                {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                  'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(prm)
                }
                ).then(res => res.json())
                .then(result =>{
                  
                  //console.log(result, 'RESULTADO')
                  if(result.rData.rCode === 0){
                    console.log(result, 'RESULTADO')
                    alert(result.rData.rData);
                    navigation.navigate('LoginReg', { screen: 'login' });
                    //alert("Successfully Login");
                    //this.props.navigation.navigate('Login');
                  }if(result.rStatus === 100){
                    alert(result.rData.Error);
                  }else{ 
                    console.log(result, 'RESULTADO')
                    alert(result.rData.rData);
                  }
                })
                .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
            }
          })
          .catch(err => console.log(JSON.stringify(err), 'ERROR FETCH1'));
        if(res_prm.rData.rCode==0)
        {
            req_prm.sender.setState((prevState) => ({  // this will change the state
                btn_verifyOTP:{disabled:false}
            }))             
            //redirect to login page 

            navigation.navigate('LoginReg', { screen: 'login' });
        }
        else
        {
            alert(res_prm.rData.rMessage);
            req_prm.sender.setState((prevState) => ({  // this will change the state
                btn_verifyOTP:{disabled:false}
            }))            
        }
    }

}

