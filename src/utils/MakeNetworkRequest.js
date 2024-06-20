import { showErrorToast } from './rootToast';
import {KEYS, clearData, getData} from '../views/AsyncStorage';
import {Platform} from 'react-native';

//Development URL
export const BASE_URL = 'https://dev-api.sourceinfosys.in/';

// BHDC Polyclinic URL
// export const Polyclinic_Url = 'http://192.168.1.8:81/meds/unrestricted/index.php';
// export const Polyclinic_Url = 'http://dev-api.sourceinfosys.in:31920/index.php';
// export const Polyclinic_Url = 'http://192.168.1.8:81/echs/unrestricted/service/index.php';

//Local Source URL
// export const Polyclinic_Url = 'http://dev-api.sourceinfosys.in:31920/index.php';

// Local Live URL For APKs
// export const BASE_URL = 'https://dev-api.sourceinfosys.in:4443/';

//Production URL
// export const BASE_URL = 'https://medskey-api.sourceinfosys.com:30157/';

//Logout
const onLogoutYesPress = async () => {
  try {
    await clearData();
    this.props.navigation.navigate('Login');
  } catch (error) {
    console.log(error.message);
  }
};
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

      const deviceId = await getData(KEYS.DEVICE_ID);
      if (sendAuthorizationToken) {
        // fetching userInfo
        const authtoken = await getData(KEYS.AUTH_TOKEN);

        if (!authtoken) {
          return null;
        }

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

    // Check if the response indicates the need for logout
    if (
      result &&
      result.rStatus === 200 &&
      result.rData &&
      result.rData.rCode === 101 &&
      result.rData.rMessage === 'UnMatched Data...'
    ) {
      await onLogoutYesPress();
    }

    return result;
  } catch (error) {
    showErrorToast(error.message);

    return null;
  }
};
