
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

// Components
import CustomIcon from '../../layouts/CustomIcon';

import Themes from '../../../Themes';

const colorTheme = Themes;

export class SDropDownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedItem: {
        Id: 1,
        Name: props.placeholder,
        Value: props.placeholder,
      },
      toggle: false,
    };

    this.theme = colorTheme;
    this.styles = this.createStyles(this.theme);
  }
  
  createStyles(theme) {
    const style = StyleSheet.create({
      dropdownContainer: {
        borderRadius: 8,
        backgroundColor:theme.color.whitePrimary,
        position: 'absolute',
        top: '180%',
        left: -11,
        right:-11,
        zIndex: 999,
        elevation:3
      },
      dropdownItem: {
        padding: theme.scale*10,
      },
      dropdownItemText: {
        fontSize: theme.scale*14,
      },
    });
    return style;
  }

  renderItemPicker = () => {
    const { selectedItem, toggle } = this.state;
    const { Name } = selectedItem;

    const labelStyle = { ...this.props.dropdownBtnTxtStyle };
    if (Name === 'Select User') {
      labelStyle.color = '#555';
    }
  
    return (
      <View style={[this.props.renderItemContainer, { position: 'relative' }]}>
        <TouchableOpacity
          underlayColor="transparent"
          onPress={this.toggleDropdown}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'space-between',
          }}>
          <Text style={[{textAlign:'center', color:this.theme.color.blackPrimary},labelStyle]}>{Name}</Text>
          <View style={{marginRight: this.theme.scale * 4}}>
          <CustomIcon
            iconName={toggle ? 'chevron-small-up' : 'chevron-small-down'}
            iconSize={24}
            iconColor={'#f9be51'}
            iconType={'Entypo'}
          />
          </View>
        </TouchableOpacity>
        {toggle && (
          <View style={this.styles.dropdownContainer}>
            <ScrollView>
              {this.props.pickerData.map((item) => (
                <TouchableOpacity
                  key={item.Id}
                  style={this.styles.dropdownItem}
                  onPress={() => this.handleSelectedItem(item)}
                >
                  <Text style={this.styles.dropdownItemText}>{item.Name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    );
  };

  handleSelectedItem = (selectedItem) => {
    this.setState({
      selectedItem,
      toggle: false,
    });

    this.props.onChange(selectedItem);
  };

  toggleDropdown = () => {
    this.setState((prevState) => ({
      toggle: !prevState.toggle,
    }));
  };

  render() {
    return (
      <View style={[this.props.containerStyle]}>
        <View style={{ padding: 0, margin: 0 }}>
          {this.renderItemPicker()}
        </View>
      </View>
    );
  }
}

