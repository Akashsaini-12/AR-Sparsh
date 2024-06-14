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
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomDashboardBox from '../../components/CustomBox/CustomDashboardBox';
import CustomAresaComponent from '../../components/CustomFlatlisitComponent/CustomAresaComponent';
// Icons
export default class Pension extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    // const {isViewProfile: response} = this.props;
    this.state = {};
  }
  Data = [
    {
      id: 1,
      title: 'Know Your Pension',
      iconName:'creditcard', iconType:'AntDesign',
      destination: 'KnowYourPension',
    },
    {
      id: 2,
      title: 'Pension Claims through Bhavishya Portal',
      iconName:'file-pdf-o', iconType:'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: 3,
      title: 'Documents for Family Pension/Death after Retirement',
      iconName:'file-pdf-o', iconType:'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: 4,
      title: 'Change of Next of Kin (NOK) in Family Record',
      iconName:'file-pdf-o', iconType:'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: 5,
      title: 'Constant Attendance Allowance',
      iconName:'file-pdf-o', iconType:'FontAwesome',
      destination: 'ViewPdf',
    },
    {
      id: 6,
      title: 'Details of Pension Benefit',
      iconName:'file-pdf-o', iconType:'FontAwesome',
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
          title="PENSION"
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
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 10,
      paddingTop: theme.scale * 20,
      padding: theme.scale * 10,
    },
  });
