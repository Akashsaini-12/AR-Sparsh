/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';

// Components
import {
  STextInput,
  SHorizontalScrollButtons,
  SSearchList,
} from 'views/layouts/SourceComponents';

import {SProjSearchItem} from 'views/containers/ProjectComponents';
import {searchItemClick, searchBackClick} from 'source_lib/modules/appt';

export default class Info extends React.Component {
  constructor(props) {
    super(props);

    this.theme = props.route.params.theme; // this came as initialParam
    this.state = {};
    this.state.prop = {};
    this.state.activeButton = '1';
    this.formData = {};
  }
  render() {
    const DATA = [
      {
        id: '1',
        title: 'Radiology',
        backgroundColor: 'purple',
        isImageButton: false,
        image: '',
        IconName1: 'medkit',
        IconName2: 'address-book',
        nav: 'polyclinics',
      },
      {
        id: '2',
        title: 'Lab',
        backgroundColor: '#034166',
        isImageButton: false,
        image: '',
        IconName1: 'bank',
        IconName2: 'vcard',
        nav: 'polyclinics',
      },
      {
        id: '3',
        title: 'Other Services',
        backgroundColor: '#009D6E',
        isImageButton: false,
        image: '',
        IconName1: 'building',
        IconName2: 'address-book',
        nav: 'polyclinics',
      },
    ];

    const renderItem = ({item}) => (
      <SProjSearchItem
        onPress={() => searchItemClick(item, this.props.navigation)}
        theme={this.theme}
        item={item}
        backgroundColor="white"
      />
    );

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <SHorizontalScrollButtons
          theme={this.theme}
          data={DATA}
          activeButton={this.state.activeButton}
        />
        <SSearchList
          listItemTemplate={renderItem}
          data={DATA}
          theme={this.theme}
        />
      </View>
    );
  }
}
