import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';

import CustomIcon from '../../layouts/CustomIcon';
import Themes from '../../../Themes';
import { Color } from '../../containers/GlobalStyles';
const colorTheme = Themes;

export class CustomButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = colorTheme;
  }
  createStyles(theme) {
    const style = StyleSheet.create({
      elevatedButtonContainer: {
        marginTop: theme.scale * 18,
        width: theme.scale * 151,
        height: theme.scale * 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: theme.scale * 10,
        borderBottomWidth: theme.scale * 1,
        borderColor: theme.color.yellowPrimary,
        backgroundColor: theme.color.yellowPrimary,
        borderRadius: theme.scale * 27,
        
        // backgroundColor: 'rgba(247, 169, 23, 0.8)',
        // // borderColor: theme.color.secondary,
        // borderBottomWidth: theme.scale * 0,
        // shadowColor: 'black',
        // // shadowOffset: {width: 0, height: theme.scale * 3},
        // shadowOpacity: 0.3,
        // shadowRadius: theme.scale * 3,

        // elevation: theme.scale * 3,
        // elevation: theme.scale * 3,
      },

      elevatedButtonText: {
        flex: 1,
        fontSize: theme.scale * 14,
        fontWeight: '600',
        color: theme.color.whitePrimary,
        textAlign: 'center',
      },
    });
    return style;
  }
  render() {
    this.styles = this.createStyles(this.theme);

    return (
      <TouchableOpacity
        style={[
          this.styles.elevatedButtonContainer,
          this.props.btnContainerStyle,
        ]}
        {...this.props}>
        <Text style={[this.styles.elevatedButtonText, this.props.titleStyle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

export class SCustomButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = colorTheme;
  }
  createStyles(theme) {
    const style = StyleSheet.create({
      elevatedButtonContainer: {
        marginTop: theme.scale * 18,
        width: theme.scale * 151,
        height: theme.scale * 45,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: theme.scale * 10,

        backgroundColor: theme.color.whitePrimary,
        borderRadius: theme.scale * 27,
        borderColor: theme.color.redPrimary,
        borderWidth: theme.scale * 1,
        // shadowColor: 'black',
        // // shadowOffset: {width: 0, height: theme.scale * 3},
        // shadowOpacity: 0.3,
        // shadowRadius: theme.scale * 3,

        // elevation: theme.scale * 3,
        // elevation: theme.scale * 3,
        shadowOpacity: 1,
        shadowOffset: {
          width: 0,
          height: 4,
        },
      },

      elevatedButtonText: {
        flex: 1,
        fontSize: theme.scale * 14,
        fontWeight: '600',
        color: theme.color.redPrimary,
        textAlign: 'center',
      },
    });
    return style;
  }
  render() {
    this.styles = this.createStyles(this.theme);

    return (
      <TouchableOpacity
        style={[
          this.styles.elevatedButtonContainer,
          this.props.btnContainerStyle,
        ]}
        {...this.props}>
        <Text style={[this.styles.elevatedButtonText, this.props.titleStyle]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}
