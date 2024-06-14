/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {Modal} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-modern-datepicker';

import CustomIcon from 'views/layouts/CustomIcon';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SafeAreaView from 'react-native-safe-area-view';

export default class CustomDatePicker extends Component {
  constructor(props) {
    super(props);

    const {date, theme} = props;

    this.theme = theme;

    this.state = {isVisible: false, date: date};
  }

  onPress(e) {
    this.setState({isVisible: true});
  }

  render() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    return (
      <View style={[this.props.containerStyle, this.props.style]}>
        <TouchableOpacity onPress={e => this.onPress(e)}>
          <View style={[this.props.yearCalendarStyle]}>
            <Text style={this.props.labelStyle}>{this.props.placeholder}</Text>
            <Text
              style={[
                this.props.inputStyle,
                {marginTop: this.props.iconName ? 0 : 8, marginLeft: 4},
              ]}>
              {this.state.date}
            </Text>
            {this.props.iconName && (
              <CustomIcon
                iconName={this.props.iconName}
                iconSize={this.props.iconSize}
                iconColor={this.props.iconColor}
                iconType={this.props.iconType}
              />
            )}
          </View>
        </TouchableOpacity>

        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {}}>
          <SafeAreaView style={{flex: 1}}>
            <View>
              <Text
                style={{
                  fontSize: this.theme.scale * 18,
                  textAlign: 'center',
                  color: this.theme.color.primary,
                  fontWeight: '600',
                  marginVertical: this.theme.scale * 14,
                }}>
                {this.props.label}
              </Text>
              <DatePicker
                mode={
                  this.props.datePickerType
                    ? this.props.datePickerType
                    : 'calendar'
                }
                onMonthYearChange={selectedDate => {
                  let month =
                    selectedDate.split(' ')[1].charAt(0) === '0'
                      ? selectedDate.split(' ')[1].split('')[1]
                      : selectedDate.split(' ')[1];

                  let currentDate = `${monthNames[parseInt(month - 1)]} ${
                    selectedDate.split(' ')[0]
                  }`;

                  this.props.onChangeDate(currentDate);

                  this.setState({isVisible: false, date: currentDate});
                }}
                onTimeChange={selectedTime => {
                  this.props.onChangeDate(selectedTime);
                  this.setState({isVisible: false, date: selectedTime});
                }}
                onSelectedChange={date => {
                  let selectedDate = date.split('/').reverse().join('/');
                  this.setState({date: selectedDate});
                  this.props.onChangeDate(selectedDate);
                  this.setState({isVisible: false});
                }}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}
