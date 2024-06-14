import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import PickerModal from 'react-native-picker-modal-view';

import BasicStyles from 'views/styles/BasicStyles';

export default class DropDownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: {
        Name: props.placeholder,
        Value: props.placeholder,
        Code: 'AX',
        Id: 1,
      },
    };
  }

  renderItemPicker = (disabled, selected, showModal) => {
    const {selectedItem} = this.state;
    const {Name} = selectedItem;

    const labelStyle = this.props.dropdownBtnTxtStyle;
    // const labelStyle = {
    //   color: '#000',
    //   fontSize: wp(3.8),
    //   flex: 1,
    //   marginLeft: wp(2),
    // };

    if (Name === 'Select State') {
      labelStyle.color = '#555';
    }

    const handlePress = disabled ? null : showModal;

    return (
      <View style={[styles.inputContainer]}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={handlePress}
          style={[
            BasicStyles.directionRow,
            BasicStyles.alignCenter,
            BasicStyles.justifyBetween,
          ]}>
          <Text style={labelStyle}>{Name}</Text>
          {/* <Image source={ic_down} resizeMode="cover" style={styles.downIcon} /> */}
        </TouchableOpacity>
      </View>
    );
  };

  handleSelectedItem = async selectedItem => {
    this.setState({
      selectedItem,
    });
    this.props.onChange(selectedItem);
    return selectedItem;
  };

  handleCloseButton = () => {
    const {selectedItem} = this.state;
    this.setState({selectedItem});
  };

  render() {
    return (
      <View style={[this.props.containerStyle]}>
        <View style={{padding: 0, margin: 0}}>
          <Text style={[this.props.labelStyle]}>{this.props.label}</Text>

          <PickerModal
            items={this.props.pickerData}
            selected={this.state.selectedItem}
            onSelected={this.handleSelectedItem}
            onClosed={this.handleCloseButton}
            backButtonDisabled
            showToTopButton={true}
            autoGenerateAlphabeticalIndex={false}
            searchPlaceholderText="Search"
            renderSelectView={this.renderItemPicker}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
