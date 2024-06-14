import React, {Component} from 'react';
import {FlatList, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomStyles from '../../styles/CustomStyles';
import Header from '../../layouts/Header';
import PullToRefresh from '../../components/PullToRefresh';
import PromotionComponent from '../../components/customComponent/PromotionComponent';
export default class Promotion extends Component {
  constructor(props) {
    super(props);
    this.theme = props.route.params.theme;
    this.state = {};
  }

  Data = [
    {
      id: '1',
      rank: 'Lance Naik',
      promotionDate: '2008-09-01',
      ptoNo: '39/RECT/35/98',
      remarks: 'NA',
    },
    {
      id: '2',
      rank: 'Lance Naik',
      promotionDate: '2008-09-01',
      ptoNo: '39/RECT/35/98',
      remarks: 'NA',
    },
    {
      id: '3',
      rank: 'Lance Naik',
      promotionDate: '2008-09-01',
      ptoNo: '39/RECT/35/98',
      remarks: 'NA',
    },
  ];

  renderList = ({item}) => {
    return (
      <PromotionComponent
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
          title="PROMOTION"
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
