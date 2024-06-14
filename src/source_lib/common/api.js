export function reqAPI(req_prm) {
  var srvcID = req_prm['srvcID'] || 'login';
  var api_url = req_prm['api_url'] || 'http://localhost:5000/' + srvcID;
  var api_method = req_prm['api_method'] || 'POST';

  var final_Prm = {
    eventID: req_prm['eventID'] || '',
    addInfo: req_prm['addInfo'] || {},
  };

  const xhr = new XMLHttpRequest();

  //xhr.setRequestHeader('Authorization', 'Bearer ' + global.jwt);
  // listen for `load` event
  xhr.onload = () => {
    resp = JSON.parse(xhr.response);
    if (resp.rStatus != 0) console.log(resp.rData['Error']);
    // this message to be shown in notification
    else req_prm['ret_fn'](resp);
  };

  // listen for `error` event
  xhr.onerror = err => {
    var resp = {
      rStatus: 1000,
      rData: 'Download Failed. Internet Issue or API link Down',
    };
    req_prm['ret_fn'](resp);
  };

  // listen for `abort` event
  xhr.onabort = () => {
    var resp = {rStatus: 1001, rData: 'Download cancelled.'};
    req_prm['ret_fn'](resp);
  };

  // listen for `progress` event
  xhr.onprogress = event => {
    // event.loaded returns how many bytes are downloaded
    // event.total returns the total number of bytes
    // event.total is only available if server sends `Content-Length` header
    console.log(`Downloaded ${event.loaded} of ${event.total} bytes`);
  };

  // for andooid map the port as follows for localhost access
  //adb reverse tcp:5000 tcp:5000
  // open and send request
  xhr.open(api_method, api_url, true);
  // xhr.send() =JSON.stringify(final_Prm);
  xhr.setRequestHeader('Content-Type', 'application/text');
  xhr.setRequestHeader('Authorization', 'Bearer ' + global.jwt);
  xhr.send(JSON.stringify(final_Prm));
  //xhr.send();
  //xhr.setRequestHeader()
}
