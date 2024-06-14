import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import SelectDropdown from 'react-native-select-dropdown';

export default class DropDownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {gender: ['Male', 'Female']};
  }

  render() {
    return (
      <View style={[this.props.containerStyle]}>
        <View style={{padding: 0, margin: 0}}>
          <Text style={[this.props.labelStyle]}>{this.props.label}</Text>

          <SelectDropdown
            defaultButtonText={this.props.placeholder}
            buttonStyle={this.props.dropDownBtnStyle}
            buttonTextStyle={this.props.dropdownBtnTxtStyle}
            onSelect={(selectedItem, index) => console.log(selectedItem)}
            {...this.state.prop}
            data={this.props.pickerData}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
