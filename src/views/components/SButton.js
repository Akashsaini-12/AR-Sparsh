import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  Button,
} from 'react-native';

// Libraries
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Icon1 from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
import Icon3 from 'react-native-vector-icons/dist/Entypo';
import Icon4 from 'react-native-vector-icons/dist/Fontisto';
import Icon5 from 'react-native-vector-icons/dist/Ionicons';
import Icon6 from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Icon7 from 'react-native-vector-icons/dist/MaterialIcons';
import Icon8 from 'react-native-vector-icons/dist/Octicons';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

export class SButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
    //this.styles = this.createStyles(this.theme)
  }
  createStyles(theme) {
    const style = StyleSheet.create({
      btnClickContain: {
        flexDirection: 'row',
        backgroundColor: this.props.backgroundColor
          ? this.props.backgroundColor
          : theme.color.buttonBack,
        borderRadius: this.props.borderRadius
          ? this.props.borderRadius
          : theme.scale * 5,
        padding: theme.scale * 5,

        shadowColor: 'black',
        shadowRadius: theme.scale * 6,
        shadowOffset: {top: 10, width: 0, height: 0},
        elevation: theme.scale * 14, // this only works for android
        shadowOpacity: 0.4,
        marginTop: wp(2),
        marginBottom: wp(2),
        width: this.props.btnContainerWidth,
      },
      btnContainer: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center',
        margin: wp(2),
      },
      btnIcon: {
        color: this.props.IconColor ? this.props.IconColor : 'white',
        paddingLeft: theme.scale * 5,
        paddingRight: theme.scale * 5,
        display: this.props.hideIcon ? 'none' : 'flex',
      },
      // btnTextContainer: {
      //   flex: 1,
      //   textAlignVertical: 'center',
      //   justifyContent: 'center',
      // },
      btnText: {
        flex: this.props.btnTextFlex ? this.props.btnTextFlex : 0,
        fontSize: this.props.fontsize ? this.props.fontsize : theme.scale * 16,
        color: this.props.textColor
          ? this.props.textColor
          : theme.color.buttonText,
        textAlign: this.props.textAlign ? this.props.textAlign : 'left',
        fontWeight: this.props.fontWeight ? this.props.fontWeight : '400',
      },
    });
    return style;
  }
  render() {
    let IconImg = Icon1;
    if (this.props.iconSet === 2) IconImg = Icon2;
    else if (this.props.iconSet === 3) IconImg = Icon3;
    else if (this.props.iconSet === 4) IconImg = Icon4;
    else if (this.props.iconSet === 5) IconImg = Icon5;
    else if (this.props.iconSet === 6) IconImg = Icon6;
    else if (this.props.iconSet === 7) IconImg = Icon7;
    else if (this.props.iconSet === 8) IconImg = Icon8;

    this.styles = this.createStyles(this.theme);
    if (this.props.hide == 'true') return null;

    return (
      <TouchableOpacity
        style={[this.styles.btnClickContain, this.props.style]}
        underlayColor={
          this.props.underlayColor ? this.props.underlayColor : '#042417'
        }
        {...this.props}>
        <View style={this.styles.btnContainer}>
          <Text style={[this.styles.btnText, this.props.labelStyle]}>
            {this.props.title}
          </Text>

          {this.props.IconName && (
            <View style={this.props.iconContainerStyle}>
              <IconImg
                name={this.props.IconName ? this.props.IconName : 'sent'}
                size={
                  this.props.IconSize
                    ? this.props.IconSize
                    : this.theme.scale * 20
                }
                style={this.styles.btnIcon}
              />
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  }
}
