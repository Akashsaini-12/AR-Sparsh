import React from 'react';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class SLabel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
    //this.styles = this.createStyles(this.theme)
  }
  createStyles(theme) {
    const style = StyleSheet.create({
      lblTopContain: {
        flexDirection: 'column',
        alignSelf: 'stretch',
        padding: 10,
        backgroundColor: theme.color.textBack,
        borderWidth: this.props.border ? 0.5 : 0,
        borderRadius: 5,
        borderColor: 'lightgrey',
        margin: 5,
        marginTop: 2,
        marginBottom: 2,
        width: this.props.buttonWidth ? this.props.buttonWidth : 'auto',
        //borderBottomColor: this.theme.color.inactiveColor,
        //borderBottomWidth: 3,

        shadowColor: 'black',
        shadowRadius: this.props.shadow ? 2 : 0,
        shadowOffset: this.props.shadow ? {top: 0, width: 0, height: 0} : null,
        shadowOpacity: this.props.shadow ? 0.4 : 0,
        elevation: this.props.shadow ? theme.scale * 5 : 0, // this only works for android
      },

      lblContainer: {
        //flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        //margin:5,
      },
      btnIcon: {
        color: this.props.IconColor ? this.props.IconColor : 'white',
        paddingLeft: theme.scale * 5,
        paddingRight: theme.scale * 20,
        display: this.props.hideIcon ? 'none' : 'flex',
      },
      lblTextContainer: {
        flex: 1,
        textAlignVertical: 'center',
        justifyContent: 'center',
      },
      lblText: {
        fontSize: this.props.fontSize ? this.props.fontSize : theme.scale * 20,
        color: this.props.textColor
          ? this.props.textColor
          : theme.color.labelText,
        textAlign: this.props.textAlign ? this.props.textAlign : 'right',
      },
    });
    return style;
  }
  render() {
    this.styles = this.createStyles(this.theme);
    if (this.props.hide == 'true') return null;

    return (
      <View
        style={[this.styles.lblTopContain, this.props.style]}
        {...this.props}>
        <View style={this.styles.lblContainer}>
          <Icon
            name={this.props.IconName ? this.props.IconName : 'sent'}
            size={
              this.props.IconSize ? this.props.IconSize : this.theme.scale * 15
            }
            style={this.styles.btnIcon}
          />
          <View style={this.styles.lblTextContainer}>
            <Text style={this.styles.lblText}>{this.props.title}</Text>
          </View>
        </View>
      </View>
    );
  }
}
