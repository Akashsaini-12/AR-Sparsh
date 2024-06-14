import React, {Component} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export default class DatePicker extends Component {
  constructor(props) {
    super(props);

    this.state = {isVisible: false, date: 'Select Date'};
  }

  onPress(e) {
    this.setState({isVisible: true});
  }

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  handlePickerConfirm = dateObj => {
    const date = dateObj.getDate();
    const dates = date.toString().length === 1 ? '0' + date : date;
    const month = dateObj.getMonth() + 1;
    const months = month.toString().length === 1 ? '0' + month : month;
    const year = dateObj.getFullYear();
    const selectedDate = `${year}-${months}-${dates}`;
    this.setState({date: selectedDate, isVisible: false});
    this.props.onChange(selectedDate);
  };

  render() {
    return (
      <TouchableOpacity
        onPress={e => this.onPress(e)}
        style={[this.props.styles]}>
        <Text style={this.props.labelStyle}>{this.props.label}</Text>

        <Text
          style={[
            this.props.inputStyle,
            {marginTop: hp(1), marginLeft: wp(0.5)},
          ]}>
          {this.state.date}
        </Text>

        <DateTimePickerModal
          isVisible={this.state.isVisible}
          mode="date"
          onConfirm={this.handlePickerConfirm}
          onCancel={this.hidePicker}
        />
      </TouchableOpacity>
    );
  }
}
