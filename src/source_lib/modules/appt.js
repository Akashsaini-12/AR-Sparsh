import { reqAPI } from "../common/api";

export function searchApptClick(req_prm,navigation)
{
    // send details to be searched
    //alert("bing");
    navigation.navigate("apptSearchResult");
    return;
    var prm={"ret_fn":on_ret ,"api_method":"POST","srvcID":"home","eventID" : "1","addInfo":{}};
    reqAPI(prm);
    function on_ret(res_prm)
    {
        //alert(res_prm);
        navigation.navigate("home");
    }
}

export function searchItemClick(item,navigation)
{
  alert("item : "+ item.title);
}

export function searchBackClick(item,navigation)
{
    
  //alert("item : "+ item.title);
  navigation.navigate("apptSearch");
}