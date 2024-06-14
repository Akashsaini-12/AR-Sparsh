import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  LogBox,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {RootSiblingParent} from 'react-native-root-siblings';
import InternetConnectionAlert from 'react-native-internet-connection-alert';
import messaging from '@react-native-firebase/messaging';
import NavContainer from './src/navigation/routes';
import {nhSetTopLevelNavigator} from './src/navigation/helper';
import {KEYS, getData} from './src/views/AsyncStorage';
import Splash from './src/views/containers/Splash/Splash';
import {requestUserPermission} from './src/utils/CommonUtils';
import Permissions from 'react-native-permissions';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); // Ignore all log notifications

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    requestUserPermission();
  }, []);

  useEffect(() => {
    const requestPermission = async () => {
      const permissionType = Platform.OS === 'ios' ? 'photo' : 'storage';
      const permissionStatus = await Permissions.request(permissionType);
      console.log('Permission status:', permissionStatus);
    };

    requestPermission();
  }, []);

  useEffect(() => {
    const checkNotificationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Notification permission granted');
          } else {
            console.log('Notification permission denied');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      }
    };

    const initialSetup = async () => {
      await checkNotificationPermission();

      try {
        const userData = await getData(KEYS.USER_INFO);
        console.log('User data retrieved:', userData);
        setUserInfo(userData);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }

      setIsLoading(false);
    };

    const timeoutId = setTimeout(initialSetup, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const setNavigatorRef = ref => {
    nhSetTopLevelNavigator(ref);
  };

  if (isLoading) {
    return <Splash />;
  }

  return (
    <InternetConnectionAlert
      onChange={connectionState => {
        // console.log('Connection State: ', connectionState);
      }}>
      <SafeAreaProvider>
        <RootSiblingParent>
          <NavContainer ref={setNavigatorRef} user={userInfo} />
        </RootSiblingParent>
      </SafeAreaProvider>
    </InternetConnectionAlert>
  );
};

export default App;
