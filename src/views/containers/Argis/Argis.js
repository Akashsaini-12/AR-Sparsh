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
// Icons
export default class Argis extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }

  Data = [
    {
      id: '1',
      title: 'Annual ARGIS Statement',
      iconName: 'creditcard',
      iconType: 'AntDesign',
      destination: 'AnnualArgisStatement',
    },
    {
      id: '2',
      title: 'Details of Payment Status',
      iconName: 'creditcard',
      iconType: 'AntDesign',
      destination: 'PaymentDetalisStatus',
    },
    {
      id: '3',
      title: 'HBA Update Status',
      iconName: 'creditcard',
      iconType: 'AntDesign',
      destination: 'HbaUpdateStatus',
    },
    {
      id: '4',
      title: 'EMI Status',
      iconName: 'creditcard',
      iconType: 'AntDesign',
      destination: 'EMIStatus',
    },
    {
      id: '5',
      title: 'Formate of Application',
      iconName: 'file-pdf-o',
      iconType: 'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: '6',
      title: 'PRIS PDF',
      iconName: 'file-pdf-o',
      iconType: 'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: '7',
      title: 'Formate of Application For Conveyance',
      iconName: 'file-pdf-o',
      iconType: 'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: '8',
      title: 'Proposal for EDN Loan',
      iconName: 'file-pdf-o',
      iconType: 'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: '9',
      title: 'Proposal for Daughter Marriage Loan',
      iconName: 'file-pdf-o',
      iconType: 'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: '10',
      title: 'Proposal for Computer ADV',
      iconName: 'file-pdf-o',
      iconType: 'FontAwesome',
      destination: 'ViewPdf',
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
          title="ARGIS"
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
