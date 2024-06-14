import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
// import RNFirebase from 'react-native-firebase';

// const configurationOptions = {
//   debug: true,
//   promptOnMissingPlayServices: true,
// };

// const firebase = RNFirebase.initializeApp(configurationOptions);

// export default firebase;

export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    // getFcmToken();
  }
}

// const getFcmToken = async () => {
//   let checkToken = await AsyncStorage.getItem('fcmToken');
//   console.log('the old token', checkToken);
//   if (!checkToken) {
//     try {
//       const fcmToken = await firebase.messaging().getToken();
//       if (!fcmToken) {
//         console.log('fcm token generated', fcmToken);
//         await AsyncStorage.setItem('fcmToken');
//       }
//     } catch (error) {
//       console.log('error in fcmToken', error);
//       alert(error?.message);
//     }
//   }
// };

export const notificationListner = () => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigation.navigate(remoteMessage.data.type);
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        // setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
      }
      //   setLoading(false);
    });
};
export const getToken = async () => {
  await messaging().registerDeviceForRemoteMessages();
  const token = await messaging().getToken();
  console.log('=====token=====');
  console.log(token);
  console.log('=====token=====');
};

export const sendNotification = async (fcmToken, title, body) => {
  try {
    const FIREBASE_SERVER_KEY =
      'AAAApTonqpg:APA91bEppN1FxjeuyUAFwf5hQwhprxbVoeyes2eCwhjC8QhL_9z2smIDuyzjqqTt0N4DgjQz2365HJ0w0Sirl0_MfPZxGDr24rbiaYvKk5BCQ6Dl6zErFOHoToKFaNnApVZAREo_DVGa'; // Replace with your Firebase server key

    const message = {
      token: fcmToken,
      notification: {
        title: title,
        body: body,
      },
    };

    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${FIREBASE_SERVER_KEY}`,
      },
      body: JSON.stringify(message),
    });

    const result = await response.json();

    console.log('Notification sent successfully:', result);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
