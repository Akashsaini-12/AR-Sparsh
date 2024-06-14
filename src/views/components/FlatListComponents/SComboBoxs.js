import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  Image,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class SComboBoxs extends React.Component {
  constructor(props) {
    super(props);

    // ... (rest of the constructor code)
  }

  // ... (rest of the component methods)

  render() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() => this.onItemSelect(item)}
        style={[this.styles.itemContainer, this.props.style]}
        underlayColor={
          this.props.underlayColor ? this.props.underlayColor : '#042417'
        }
        {...this.props}>
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );

    if (this.props.hide === 'true') return null;

    return (
      <View style={[this.styles.containerStyle, this.props.style]}>
        <TouchableOpacity onPress={e => this.onPress(e)}>
          <View style={{padding: 0, margin: 0}}>
            <Text style={this.styles.labelStyle}>{this.props.label}</Text>
            {this.state.compiledValues}
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
            <Text style={this.styles.modalHeader}>{this.props.label}</Text>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                margin: 0,
                padding: 0,
                borderBottomWidth: 2,
                borderBottomColor: this.theme.color.activeColor,
              }}>
              {this.state.compiledValues}

              <TextInput
                ref={input => {
                  this.nameInput = input;
                }}
                style={this.styles.inputStyleModel}
                autoCorrect={false}
                placeholder={this.props.placeholder}
                onChangeText={this.onTextChange.bind(this)}
                value={this.state.text}
                {...this.props}
              />
              <Icon
                onPress={e => this.onCloseIconClick(e)}
                name={'close'}
                size={
                  this.props.IconSize
                    ? this.props.IconSize
                    : this.theme.scale * 25
                }
                style={this.styles.btnIcon}
              />
            </View>
            <FlatList
              keyboardShouldPersistTaps={'handled'}
              style={{
                marginTop: this.theme.scale * 3,
                padding: this.theme.scale * 10,
              }}
              data={this.state.data}
              renderItem={renderItem}
            />
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}
