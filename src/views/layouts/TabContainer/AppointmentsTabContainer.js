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
  BASE_URL,
  makeNetworkRequest,
} from '../../components/utils/makeNetworkRequest';
// import {BASE_URL, makeNetworkRequest} from 'utils/makeNetworkRequest';
// import {KEYS, storeData} from 'views/AsyncStorage';
import {KEYS, storeData} from '../../components/AsyncStorage';
import {
  sshowErrorToast,
  howMessageToast,
  showMessageToast,
  showErrorToast,
} from '../../components/utils/rootToast';
// Icons
import CustomIcon from '../CustomIcon';

export default class AppointmentsTabContainer extends Component {
  constructor(props) {
    super(props);
    // this.patientId = this.props.route.params.patientId;
    const {title, activeTab, patientId} = props;
    console.log('mem prop Profi', this.props);
    this.state = {
      tabActive: title,
    };
  }

  handleNavigation = (Nav, patientId) => () => {
    this.props.navigation.navigate(Nav, patientId);
  };

  render() {
    const {tabActive, patientId} = this.state;

    return (
      <View style={styles.tabContainer}>
        <Pressable
          onPress={this.handleNavigation('CurrentAppointments', {
            patientId,
          })}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1.0,
              zIndex: 3,
              borderBottomWidth: tabActive === 'CurrentAppointments' ? 2 : 0,
              borderBottomColor:
                tabActive === 'CurrentAppointments' ? '#1c6ba4' : '#888',
            },
            styles.tabStyle2,
          ]}>
          {tabActive === 'CurrentAppointments' ? (
            <Text style={{color: '#1c6ba4', fontWeight: '700'}}>Current</Text>
          ) : (
            <Text>Current</Text>
          )}

          {/* <CustomIcon
            iconName={'vcard'}
            iconSize={20}
            iconColor={tabActive === 'CurrentAppointments' ? '#1c6ba4' : '#888'}
            iconType="FontAwesome"
            resizeMode="cover"
          /> */}
        </Pressable>

        <Pressable
          onPress={this.handleNavigation('CompleteAppointments', {
            patientId,
          })}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1.0,
              zIndex: 3,
              borderBottomWidth: tabActive === 'CompleteAppointments' ? 2 : 0,
              borderBottomColor:
                tabActive === 'CompleteAppointments' ? '#1c6ba4' : '#888',
            },
            styles.tabStyle2,
          ]}>
          {tabActive === 'CompleteAppointments' ? (
            <Text style={{color: '#1c6ba4', fontWeight: '700'}}>Completed</Text>
          ) : (
            <Text>Completed</Text>
          )}

          {/* <CustomIcon
            iconName={'calendar'}
            iconSize={20}
            iconColor={
              tabActive === 'CompleteAppointments' ? '#1c6ba4' : '#888'
            }
            // iconStyle={{marginRight: wp(4)}}
            iconType="FontAwesome5"
            // source={tabActive === 'Chats' ? ic_chatting_cl : ic_chatting_wh}
            resizeMode="cover"
          /> */}
        </Pressable>

        <Pressable
          onPress={this.handleNavigation('HistoryAppointments', {
            patientId,
          })}
          style={({pressed}) => [
            {
              opacity: pressed ? 0.8 : 1.0,
              zIndex: 3,
              borderBottomWidth: tabActive === 'HistoryAppointments' ? 2 : 0,
              borderBottomColor:
                tabActive === 'HistoryAppointments' ? '#1c6ba4' : '#888',
            },
            styles.tabStyle2,
          ]}>
          {tabActive === 'HistoryAppointments' ? (
            <Text style={{color: '#1c6ba4', fontWeight: '700'}}>History</Text>
          ) : (
            <Text>History</Text>
          )}
          {/* <CustomIcon
            iconName={'list'}
            iconSize={20}
            iconColor={tabActive === 'HistoryAppointments' ? '#1c6ba4' : '#888'}
            // iconStyle={{marginRight: wp(4)}}
            iconType="FontAwesome5"
            // source={tabActive === 'Chats' ? ic_chatting_cl : ic_chatting_wh}
            resizeMode="cover"
          /> */}
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

  tabContainer: {
    backgroundColor: '#fff',
    // elevation: 6,
    flexDirection: 'row',
    height: 50,
    // borderBottomRightRadius: wp(8),
  },

  tabStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 7,
    paddingBottom: 8,
  },
  tabStyle2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // zIndex: 7,

    // elevation: 3,
  },
});
