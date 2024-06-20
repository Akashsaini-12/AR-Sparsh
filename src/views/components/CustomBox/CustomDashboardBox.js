/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Platform,
} from 'react-native';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  showErrorToast,
  showMessageToast,
} from 'views/layouts/CustomToastMessage';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import PullToRefresh from '../../components/PullToRefresh';
import CustomIcon from '../../layouts/CustomIcon';
export default class CustomDashboardBox extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleDashboard = () => {
    if ((this.props.title == 'INFO DISSEMINATOR')) {
      this.props.navigation.navigate('InfoDisseminator');
    } else if ((this.props.title == 'ARESA')) {
      this.props.navigation.navigate('Aresa');
    }
    else if ((this.props.title == 'ARGIS')) {
      this.props.navigation.navigate('Argis');
    }
    else if ((this.props.title == 'CPBO')) {
      this.props.navigation.navigate('Cpbo');
    }
    else if ((this.props.title == 'RECORD BRANCH')) {
      this.props.navigation.navigate('RecordBranch');
    }
    else if ((this.props.title == 'PENSION/NE')) {
      this.props.navigation.navigate('Pension');
    }
    else if ((this.props.title == 'GPF')) {
      this.props.navigation.navigate('Gpf');
    }
    else if ((this.props.title == 'NORMAL GRIEVANCE')) {
      this.props.navigation.navigate('NormalGrievance');
    }
    else if ((this.props.title == 'VIGILANCE GRIEVANCE')) {
      this.props.navigation.navigate('VigilanceGrievance');
    }
    else if ((this.props.title == 'DG GRIEVANCE')) {
      this.props.navigation.navigate('DgGrievance');
    }
    else if ((this.props.title == 'CHANGE PASSWORD')) {
      this.props.navigation.navigate('UpdatePassword');
    }
    else if ((this.props.title == 'LINKS')) {
      this.props.navigation.navigate('Chatgpt');
    }
  };
  render() {
    const { title, theme, iconName, iconType } = this.props;
    return (
      <>
        <TouchableOpacity
          style={styles(theme).button}
          onPress={this.handleDashboard}>
          <CustomIcon
            iconName={iconName}
            iconSize={24}
            iconColor={theme.color.blackPrimary}
            iconType={iconType}
          />
          <Text style={styles(theme).buttonText}>{title}</Text>
        </TouchableOpacity>
      </>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    button: {
      backgroundColor: theme.color.whitePrimary,
      padding: theme.scale * 23,
      borderRadius: theme.scale * 10,
      elevation: theme.scale * 3,
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      fontSize: theme.scale * 12,
      fontWeight: 'bold',
      marginTop: theme.scale * 5,
      textAlign: 'center'
    },
  });
