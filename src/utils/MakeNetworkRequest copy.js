import {
  showErrorToast,
  showMessageToast,
} from 'views/layouts/CustomToastMessage';
// Local URL
export const BASE_URL = 'http://medskey.sourceinfosys.in/';
// Live URL
// export const BASE_URL = 'http://medskey.sourceinfosys.in/';

// Methods
export const makeRequest = async (url, params = null) => {
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
      info.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
      // request body
      info.body = JSON.stringify(params);
    } else {
      // headers to prevent cache in GET request
      info.headers = {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: 0,
      };
    }

    console.log('Request URL:', url);
    console.log('Request Params:', info);

    const response = await fetch(url, info);
    // console.log(response)

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
