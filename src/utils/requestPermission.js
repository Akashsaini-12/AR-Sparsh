import React, {PureComponent} from 'react';
import {Alert, Platform} from 'react-native';

// Permission
import {
  check,
  request,
  openSettings,
  PERMISSIONS,
  RESULTS,
} from 'react-native-permissions';

export const requestPermission = async permission => {
  try {
    const platformPermission = Platform.select({
      android: permission,
      ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
    });

    const result = await check(platformPermission);

    switch (result) {
      case RESULTS.DENIED:
        const requestResult = await request(platformPermission);
        switch (requestResult) {
          case RESULTS.GRANTED:
            return RESULTS.GRANTED;
        }
        break;
      case RESULTS.GRANTED:
        return RESULTS.GRANTED;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Permission Blocked',
          'Press OK and provide permission in App Setting',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: handleOpenSettings,
            },
          ],
          {cancelable: false},
        );
    }
  } catch (error) {
    console.log(error.message);
  }
};

const handleOpenSettings = async () => {
  try {
    await openSettings();
  } catch (error) {
    console.log('Unable to open App Settings:', error);
  }
};

// export default requestPermission;
