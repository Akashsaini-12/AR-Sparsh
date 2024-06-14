import {
  showErrorToast,
  showMessageToast,
} from 'views/layouts/CustomToastMessage';
import {KEYS, getData} from '../views/AsyncStorage';
import {Platform} from 'react-native';
// Local URL
// export const BASE_URL = 'http://210.210.210.31:30564/';
// Live URL
// export const BASE_URL = 'http://dev-agent-pool.sourceinfosys.in:30572/';
// export const BASE_URL_AUTH = 'http://dev-agent-pool.sourceinfosys.in:30564/';
// export const BASE_URL = 'http://dev-api.sourceinfosys.in:8080/';
// let BASE_URL, ECHS_BASE_URL;
// if (Platform.OS === 'android') {
//   // Production Android Live URL
//   BASE_URL = 'https://medskey-api.sourceinfosys.com:30157/';
// } else if (Platform.OS === 'ios') {
//   // Production iOS Live URL
//   BASE_URL = 'https://medskey-api.sourceinfosys.com:30157/';
// }
// export {BASE_URL, ECHS_BASE_URL};

// Android URL
// export const BASE_URL = 'http://medskey-api.sourceinfosys.com:30156/';

// IOS URL
// export const BASE_URL = 'https://medskey-api.sourceinfosys.com:30157/';

export const BASE_URL = 'http://dev-api.sourceinfosys.in/';

// export const BASE_URL_AUTH = 'http://dev-api.sourceinfosys.in/doc-auth/';
// export const BASE_URL_PAT_AUTH = 'http://dev-api.sourceinfosys.in/pat-auth/';
// export const BASE_URL = 'http://medskey.sourceinfosys.in/';
// export const BASE_URL = 'https://dev-agent-pool.sourceinfosys.in/doc-auth/';
// Methods
export const makeRequest = async (
  url,
  params = null,
  sendAuthorizationToken = true,
) => {
  try {
    // request info
    let info = {};

    if (params) {
      // request method type
      info.method = 'POST';

      // Preparing multipart/form-data
      // const formData = new FormData();
      // for (const key in params) {
      //   formData.append(key, params[key]);
      // }
      const deviceId = await getData(KEYS.DEVICE_ID);
      if (sendAuthorizationToken) {
        // fetching userInfo
        const authtoken = await getData(KEYS.AUTH_TOKEN);

        if (!authtoken) {
          return null;
        }

        // const {jwt} = userInfo;
        // console.log('jwwwt', jwt);
        info.headers = {
          Authorization: 'Bearer ' + authtoken,
          Accept: 'application/json',
          'Content-Type': 'application/json',
          guid: deviceId,
        };
      } else {
        info.headers = {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          guid: deviceId,
        };
      }
      // console.log('header', info.headers);
      // request body
      info.body = JSON.stringify(params);
    } else {
      // headers to prevent cache in GET request
      const deviceId = await getData(KEYS.DEVICE_ID);
      if (sendAuthorizationToken) {
        // fetching userInfo
        const authToken = await getData(KEYS.USER_TOKEN);

        if (!authToken) {
          console.log('Unable to fetch user info');
          return null;
        }

        info.headers = {
          Authorization: 'Bearer ' + authToken,
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
          guid: deviceId,
        };
      } else {
        // headers to prevent cache in GET request
        info.headers = {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          Pragma: 'no-cache',
          Expires: 0,
          guid: deviceId,
        };
      }
    }

    console.log('Request URL:', url);
    console.log('Request Params:', info);

    const response = await fetch(url, info);
    console.log(response);

    const result = await response.json();
    console.log('Request Response:', result);

    return result;
  } catch (error) {
    showErrorToast(error.message);
    //alert(error.message);
    //console.log(error.message);
    return null;
  }
};
