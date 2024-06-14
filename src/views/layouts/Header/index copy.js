/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CustomIcon from 'views/layouts/CustomIcon';
import {horizontalScale, moderateScale} from 'views/styles/CustomMetrics';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.theme = props.theme;
    this.state = {};
  }

  handleBack = () => {
    this.props.navigation.goBack();
  };

  handleNotification = () => {
    this.props.navigation.navigate('Notifications');
  };

  render() {
    const {title, showBack} = this.props;

    return (
      <View style={headerStyle(this.theme).linearGradient}>
        <View style={headerStyle(this.theme).headerContainer}>
          {showBack && (
            <Pressable
              onPress={this.handleBack}
              hitSlop={4}
              style={({pressed}) => [
                {
                  zIndex: 10,
                  opacity: pressed ? 0.2 : 1.0,
                  padding: this.theme.scale * 4,
                },
              ]}>
              <CustomIcon
                iconName={'arrow-back-ios'}
                iconSize={this.theme.scale * 25}
                iconColor={'#1c6ba4'}
                iconStyle={headerStyle(this.theme).backIcon}
                iconType="MaterialIcons"
              />
            </Pressable>
          )}

          <Text
            style={[
              headerStyle(this.theme).headerTitle,
              {
                flex: 1,
                textAlign: showBack ? 'center' : 'left',
                fontSize: showBack ? 16 : 18,
              },
            ]}>
            {title}
          </Text>

          <Text
            style={[
              headerStyle(this.theme).captionMedium,
              {
                color: 'skyblue',
              },
            ]}>
            meds
            <Text style={[headerStyle(this.theme).captionBig, {color: '#999'}]}>
              Key
            </Text>
          </Text>
        </View>
      </View>
    );
  }
}

const headerStyle = theme =>
  StyleSheet.create({
    linearGradient: {
      height: theme.scale * 55,
      width: '100%',
      paddingHorizontal: theme.scale * 8,
      // backgroundColor: '#231B37',
    },
    headerContainer: {
      flex: 1,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: theme.scale * 8,
      justifyContent: 'center',
    },

    backIcon: {
      // height: hp(3.5),
      // aspectRatio: 1 / 1,
    },
    headerTitle: {
      marginLeft: theme.scale * 16,
      color: theme.color.primary,
      fontSize: theme.scale * 20,
      fontWeight: '600',
      textAlign: 'left',
    },
    captionMedium: {
      fontSize: theme.scale * 14,
      fontWeight: '500',
    },
  });
