import React, {Component} from 'react';
import {Modal} from 'react-native';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import DatePicker from 'react-native-modern-datepicker';

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

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  handlePickerConfirm = dateObj => {
    // const date = dateObj.getDate();
    // const dates = date.toString().length === 1 ? '0' + date : date;
    // const month = dateObj.getMonth() + 1;
    // const months = month.toString().length === 1 ? '0' + month : month;
    // const year = dateObj.getFullYear();
    // this.setState({date: });
    // this.setState({isVisible: false});
    const selectedDate = dateObj.split('/').reverse().join('/');
    this.setState({date: selectedDate, isVisible: false});
    console.log(selectedDate);
    this.props.onChange(selectedDate);
  };

  render() {
    return (
      <View style={[this.props.containerStyle, this.props.style]}>
        <TouchableOpacity onPress={e => this.onPress(e)}>
          <View>
            <Text style={this.props.labelStyle}>{this.props.placeholder}</Text>
            <Text
              style={[this.props.inputStyle, {marginTop: 8, marginLeft: 2}]}>
              {this.state.date}
            </Text>
          </View>
        </TouchableOpacity>

        <Modal
          animationType={'fade'}
          transparent={false}
          visible={this.state.isVisible}
          onRequestClose={() => {
            console.log('Modal has been closed.');
          }}>
          <SafeAreaView style={{flex: 1}}>
            <View>
              <Text
                style={{
                  fontSize: this.theme.scale * 18,
                  textAlign: 'center',
                  color: this.theme.color.primary,
                  fontWeight: '600',
                }}>
                {this.props.label}
              </Text>
              <DatePicker
                mode={'calendar'}
                onSelectedChange={this.handlePickerConfirm}
              />
            </View>
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}
