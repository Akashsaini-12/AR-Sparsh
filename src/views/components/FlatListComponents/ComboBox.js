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

export class ComboBox extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme);
    console.log(this.props.data);
    this.state = {};
    this.values = [];
    this.state.compiledValues = <Text style={this.styles.inputStyle}> </Text>;
    this.state.isVisible = false;
    // console.log(this.styles.inputStyle);
    if (this.props.showListByDefault)
      // if list is to de displayed by default
      this.state.data = this.props.data;
    // console.log(this.state.data);
  }
  createStyles(theme) {
    const styles = StyleSheet.create({
      inputStyle: {
        color: theme.color.text,
        fontSize: theme.scale * 20,
        fontFamily: 'System',
        width: '85%',
        padding: 0,
      },
      inputStyleModel: {
        color: this.theme.color.text,
        fontSize: theme.scale * 20,
        fontFamily: 'System',
        width: '85%',
        padding: 0,
      },
      labelStyle: {
        fontSize: theme.scale * 13,
        color: theme.color.labelInactive,
        paddingBottom: 3,
        fontFamily: 'System',
        position: 'relative',
      },
      modalHeader: {
        fontSize: theme.scale * 18,
        fontWeight: '600',
        color: theme.color.buttonBack,
        paddingBottom: 3,
        fontFamily: 'System',
        //position: 'relative',
        marginTop: theme.scale * 5,
        padding: theme.scale * 5,
        alignSelf: 'center',
      },

      containerStyle: {
        flexDirection: 'column',
        //flex:1,
        // alignSelf: 'stretch',
        padding: 10,
        backgroundColor: theme.color.whitePrimary,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'lightgrey',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: 3,
        shadowOpacity: 0.2,
        margin: 5,

        // borderBottomColor: theme.color.primary,
        // borderBottomWidth: 3,
      },
      itemContainer: {
        flexDirection: 'row',
        backgroundColor: this.props.backgroundColor
          ? this.props.backgroundColor
          : theme.color.labelBack,
        borderRadius: this.props.borderRadius
          ? this.props.borderRadius
          : theme.scale * 5,
        padding: theme.scale * 5,
        margin: theme.scale * 5,
        shadowColor: 'black',
        shadowRadius: theme.scale * 10,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: theme.scale * 14, // this only works for android
        shadowOpacity: 0.2,
        alignSelf: 'stretch',

        marginTop: 1,
        marginBottom: 1,
      },
      selectedItem: {
        flexDirection: 'row',
        backgroundColor: this.props.backgroundColor
          ? this.props.backgroundColor
          : theme.color.labelBack,
        borderRadius: this.props.borderRadius
          ? this.props.borderRadius
          : theme.scale * 5,
        padding: theme.scale * 5,
        margin: theme.scale * 5,
        shadowColor: 'black',
        shadowRadius: theme.scale * 10,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: 5, // this only works for android
        shadowOpacity: 0.2,
        //alignSelf:"stretch",

        marginLeft: 5,
        marginBottom: 5,
      },
    });
    return styles;
  }
  // ... (rest of the component methods)
  onPress(e) {
    this.setState({isVisible: true});
  }
  onTextChange(text) {
    var datas = {};
    if (text.trim().length > 0) {
      datas = this.props.data.filter(
        item => item.title.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
    } else if (text.trim().length <= 0 && this.props.showListByDefault)
      // if no details
      datas = this.props.data; // if list can be displayed by default then showlist when nothing is typer for filtering

    this.setState({data: datas});
  }

  onCloseIconClick(e) {
    this.setState({isVisible: false});
    // alert('hi');
    // console.log('this.values', this.values);
  }

  onItemCloseIconClick(data, index) {
    this.values.splice(index, 1);
    this.valueList(this.values);
  }

  onItemSelect(item) {
    // alert('hi');
    if (!this.props.multiSelect) {
      this.setState({isVisible: false});
      this.values = [];
    }
    this.values.push(item);
    this.valueList(this.values);

    // console.log(this.values);
  }

  onKeyDown(e) {
    if (e.nativeEvent.key === 'Backspace' && this.state.text.length - 1 < 0)
      this.values.pop();

    this.valueList(this.values);
  }

  valueList(values) {
    var selectedList = '';
    // console.log('selectedList', selectedList);
    if (this.props.multiSelect) {
      selectedList = values.map((data, index) => {
        return (
          <View style={this.styles.selectedItem}>
            <Text>{data[this.props.displayID]}</Text>
            <Icon
              onPress={() => this.onItemCloseIconClick(data, index)}
              name={'close'}
              size={18}
              style={this.styles.btnIcon}
            />
          </View>
        );
      });
      selectedList = (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            margin: 0,
            padding: 0,
          }}>
          {selectedList}
        </View>
      );
      // console.log('selectedList', this.values);
      this.setState({compiledValues: selectedList}); // change state
    } else {
      selectedList = (
        <Text style={this.styles.inputStyle}>
          {values[0][this.props.displayID]}
        </Text>
      );
    }
    this.setState({compiledValues: selectedList}); // change state
  }

  render() {
    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() => this.onItemSelect(item)}
        style={[this.styles.itemContainer, this.props.style]}
        underlayColor={
          this.props.underlayColor ? this.props.underlayColor : '#042417'
        }
        {...this.props}>
        {/* console.log( {this.props}); */}
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
