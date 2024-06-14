import { reqAPI } from "../common/api";
import "./login";
//import { executeSQL } from "../common/db";

// this should be the first function to be called when the app launches
// if verified show the Home Screen else Login Screen
export function requestHome(navigation)
{
    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"home","eventID" : "1","addInfo":{}};
    reqAPI(prm);
    function on_ret(res_prm)
    {
        UpdateMasters(res_prm);
        alert(res_prm);
        navigation.navigate("home");
    }

}

function UpdateMasters(res_prm)
{
    x=0;
}

