/* eslint-disable react-native/no-inline-styles */
/* eslint-disable quotes */
import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  FlatList,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

// Styles

// Components

import CustomIcon from 'views/layouts/CustomIcon';

export default class TabContainer extends Component {
  constructor(props) {
    super(props);

    const {title, activeTab} = props;

    this.state = {
      tabActive: title,
    };
  }

  handleNavigation = Nav => () => {
    this.props.navigation.navigate(Nav);
  };

  render() {
    const {tabActive} = this.state;

    return (
      <View style={styles.tabContainer}>
        <Pressable
          onPress={this.handleNavigation('TapCard')}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1.0,
              zIndex: 3,
              borderBottomWidth: tabActive === 'TapCard' ? 3 : 0.2,
              borderBottomColor: tabActive === 'TapCard' ? '#1c6ba4' : '#888',
            },
            styles.tabStyle2,
          ]}>
          <CustomIcon
            iconName={'address-card'}
            iconSize={20}
            iconColor={tabActive === 'TapCard' ? '#1c6ba4' : '#888'}
            iconType="FontAwesome5"
            resizeMode="cover"
          />
        </Pressable>

        <Pressable
          onPress={this.handleNavigation('CardPatient')}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1.0,
              zIndex: 3,
              borderBottomWidth: tabActive === 'CardPatient' ? 3 : 0.2,
              borderBottomColor:
                tabActive === 'CardPatient' ? '#1c6ba4' : '#888',
            },
            styles.tabStyle2,
          ]}>
          <CustomIcon
            iconName={'mobile'}
            iconSize={20}
            iconColor={tabActive === 'CardPatient' ? '#1c6ba4' : '#888'}
            // iconStyle={{marginRight: wp(4)}}
            iconType="FontAwesome5"
            // source={tabActive === 'Chats' ? ic_chatting_cl : ic_chatting_wh}
            resizeMode="cover"
          />
        </Pressable>

        <Pressable
          onPress={this.handleNavigation('NewPatient')}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1.0,
              zIndex: 3,
              borderBottomWidth: tabActive === 'NewPatient' ? 3 : 0.2,
              borderBottomColor:
                tabActive === 'NewPatient' ? '#1c6ba4' : '#888',
            },
            styles.tabStyle2,
          ]}>
          <CustomIcon
            iconName={'user-plus'}
            iconSize={20}
            iconColor={tabActive === 'NewPatient' ? '#1c6ba4' : '#888'}
            // iconStyle={{marginRight: wp(4)}}
            iconType="FontAwesome5"
            // source={tabActive === 'Chats' ? ic_chatting_cl : ic_chatting_wh}
            resizeMode="cover"
          />
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderTopColor: '#888',
  },

  camIcon: {
    height: 18,
    aspectRatio: 1 / 1,
  },

  tabContainer: {
    // backgroundColor: '#231B37',
    elevation: 6,
    flexDirection: 'row',
    height: 54,
    // borderBottomRightRadius: wp(8),
  },

  tabStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 7,
    paddingBottom: wp(2),
  },
  tabStyle2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 7,

    // elevation: 3,
  },

  tabBarLabel: {
    color: '#ddd',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
    textAlign: 'center',
    flex: 1,
    marginBottom: hp(-1.8),
    textAlignVertical: 'center',
  },
});
