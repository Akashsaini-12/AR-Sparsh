import { reqAPI } from "../common/api";
import "../modules/login";
import {requestHome} from "../modules/home";
import {executeSQL} from "../common/db";

export function loginClick(req_prm,navigation)
{
    //var sq="select * from settings where id=1;"
    //var retvl=executeSQL(retvl);
    //navigation.navigate('Details')
    global.jwt="";
    //########### REMOVE THE BELOW LINE ##################
    //global.guid="454534535345355435355"; // remove this once local db issue is sorted out

    req_prm["guid"]=global.guid;
    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"login","eventID" : "1","addInfo":req_prm};
    reqAPI(prm);
    function on_ret(res_prm)
    {

        global.jwt=res_prm["rData"]["jwt"]; 
        // now save the java web token into the local database
        executeSQL("update settings set settings_value='"+res_prm["rData"]["jwt"]+"' where id=2;","",(result)=>{
            if(result.rCode==0)
                requestHome(navigation);
            else
                alert("A LocalDB error occured.Please try again");

          });

        
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

    //########### REMOVE THE BELOW LINE ##################
    //global.guid="454534535345355435355"; // remove this once local db issue is sorted out

    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"login","eventID":"2","addInfo":{"guid":global.guid,"mobile":req_prm.mobile}};
    //var prm={"ret_fn":on_ret ,"api_method":"GET","srvcID":"contacts"};
    reqAPI(prm);
    function on_ret(res_prm)
    {
        alert(res_prm.rData.rCode + " " + res_prm.rData.rMessage);        
        
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


    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"login","eventID":"3","addInfo":{"guid":global.guid,"mobile":req_prm.mobile,"otp":req_prm.otp,"pass":req_prm.pass,"guid":global.guid}};
    //var prm={"ret_fn":on_ret ,"api_method":"GET","srvcID":"contacts"};
    reqAPI(prm);
    function on_ret(res_prm)
    {
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

