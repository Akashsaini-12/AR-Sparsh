import {NavigationActions, StackActions} from '@react-navigation/native';

let topLevelNavigator = null;

export const nhSetTopLevelNavigator = navigatorRef => {
  topLevelNavigator = navigatorRef;
};

// navigate action
export const nhReplace = (routeName, params = undefined) => {
  if (topLevelNavigator) {
    const navigateAction = StackActions.replace({routeName, params});
    topLevelNavigator.dispatch(navigateAction);
  }
};

// navigate action
export const nhNavigate = (routeName, params = undefined) => {
  if (topLevelNavigator) {
    const navigateAction = NavigationActions.navigate({routeName, params});
    topLevelNavigator.dispatch(navigateAction);
  }
};

// stack actions
export const nhPush = (routeName, params = undefined) => {
  if (topLevelNavigator) {
    const pushAction = StackActions.push({routeName, params});
    topLevelNavigator.dispatch(pushAction);
  }
};

export const nhPop = (n = 1) => {
  if (topLevelNavigator) {
    const popAction = StackActions.pop({n});
    topLevelNavigator.dispatch(popAction);
  }
};
