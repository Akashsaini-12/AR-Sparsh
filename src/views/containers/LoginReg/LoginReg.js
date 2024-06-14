import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import Login from 'views/containers/Login';
import Register from 'views/containers/Register';

export default class LoginReg extends React.Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
  }
  render() {
    const Tab = createBottomTabNavigator();
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Login') {
              iconName = focused ? 'user' : 'user';
            } else if (route.name === 'Registration') {
              iconName = focused ? 'user-plus' : 'user-plus';
            }

            // You can return any component that you like here!
            return (
              <Icon
                name={iconName}
                size={30 * this.theme.scale}
                color={color}
              />
            );
          },
          tabBarOptions: {
            style: {
              backgroundColor: 'transparent',
            },
          },
          tabBarActiveTintColor: this.theme.color.activeBarSurface,
          tabBarInactiveTintColor: this.theme.color.disabledBarSurface,
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: this.theme.color.stdBaseScreenBackground,
          },
        })}>
        <Tab.Screen
          name="Login"
          component={Login}
          initialParams={{theme: this.theme}}
          // options={{tabBarBadge: 3}}
        />
        <Tab.Screen
          name="Registration"
          component={Register}
          initialParams={{theme: this.theme}}
        />
      </Tab.Navigator>
    );
  }
}
