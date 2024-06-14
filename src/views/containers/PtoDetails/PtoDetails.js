import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';
import PtoDetailsComponent from '../../components/customComponent/PtoDetailsComponent';
export default class PtoDetails extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }

  Data = [
    {
      id: '1',
      serialNo: '145',
      desription: 'Leave Record>>Leave',
      ptoNo: '39/RECT/35/98',
      date: '2008-09-01',
    },
    {
      id: '2',
      serialNo: '145',
      desription: 'Awards/Leave Record>>Medals',
      ptoNo: '39/RECT/35/98',
      date: '2008-09-01',
    },
    {
      id: '3',
      serialNo: '145',
      desription: 'Leave Record>>Leave',
      ptoNo: '39/RECT/35/98',
      date: '2008-09-01',
    },
  ];

  renderList = ({item}) => {
    return (
      <PtoDetailsComponent
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
          title="PTO DETAILS"
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
