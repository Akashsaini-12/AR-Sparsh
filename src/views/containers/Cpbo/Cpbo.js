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
import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  showErrorToast,
  showMessageToast,
} from 'views/layouts/CustomToastMessage';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';
import CustomAresaComponent from '../../components/CustomFlatlisitComponent/CustomAresaComponent';
export default class Cpbo extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }
  Data = [
    {
      id: '1',
      title: 'Monthly Pay-Slip',
      iconName: 'creditcard',
      iconType: 'AntDesign',
      destination: 'CpboMonthlyPaySlip',
    },
    {
      id: '2',
      title: 'Form-16',
      iconName: 'document-outline',
      iconType: 'Ionicons',
      destination: 'CpboForm',
    },
    {
      id: '3',
      title: 'Bill Status',
      iconName: 'creditcard',
      iconType: 'AntDesign',
      destination: 'BillStatus',
    },
  ];
  renderList = ({item}) => {
    return (
      <CustomAresaComponent
        item={item}
        navigation={this.props.navigation}
        theme={this.theme}
      />
    );
  };
  keyExtractor = item => item.id;
  getmember_api_call = () => {};

  render() {
    return (
      <View style={CustomStyles(this.theme).container}>
        <Header
          title="CPBO"
          theme={this.theme}
          navigation={this.props.navigation}
        />
        <PullToRefresh onRefresh={this.getmember_api_call}>
          <View style={styles(this.theme).mainContainer}>
            <KeyboardAwareScrollView
              enableOnAndroid={true}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}>
              <FlatList
                keyboardShouldPersistTaps={'handled'}
                data={this.Data}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderList}
              />
            </KeyboardAwareScrollView>
          </View>
        </PullToRefresh>
      </View>
    );
  }
}

const styles = theme =>
  StyleSheet.create({
    mainContainer: {
      flex: 1,
      padding: theme.scale * 12,
    },
  });
