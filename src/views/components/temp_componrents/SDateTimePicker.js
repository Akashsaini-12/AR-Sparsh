import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-modern-datepicker';

export class SDateTimePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.isVisible = false;
    let today = new Date();
    this.state.date = today.toDateString();
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme);
  }

  createStyles(theme) {
    const styles = StyleSheet.create({
      inputStyle: {
        color: theme.color.text,
        fontSize: theme.scale * 20,
        fontFamily: 'System',
        width: '100%',
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
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: theme.color.textBack,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'lightgrey',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: 8,
        shadowOpacity: 0.2,
        margin: 5,
        borderBottomColor: theme.color.primary,
        borderBottomWidth: 3,
      },
    });
    return styles;
  }

  onPress(e) {
    this.setState({isVisible: true});
  }
  render() {
    if (this.props.hide == 'true') return null;

    return (
      <View style={[this.styles.containerStyle, this.props.style]}>
        <TouchableOpacity onPress={e => this.onPress(e)}>
          <View style={{padding: 0, margin: 0}}>
            <Text style={this.styles.labelStyle}>{this.props.label}</Text>
            <Text style={this.styles.inputStyle}>{this.state.date}</Text>
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
              <Text style={this.styles.modalHeader}>{this.props.label}</Text>
              <DatePicker
                onSelectedChange={date => {
                  this.setState({date: date});
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
