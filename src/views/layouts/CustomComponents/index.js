/* eslint-disable react-native/no-inline-styles */
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
import DatePicker from 'react-native-modern-datepicker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import SelectDropdown from 'react-native-select-dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export class SButton extends React.Component {
  //static theme = Context;
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
  }
  createStyles(theme) {
    const style = StyleSheet.create({
      btnClickContain: {
        flexDirection: 'row',

        backgroundColor: this.props.backgroundColor
          ? this.props.backgroundColor
          : theme.color.stdButton,

        borderRadius: this.props.borderRadius
          ? this.props.borderRadius
          : theme.scale * 5,
        padding: theme.scale * 5,
        margin: theme.scale * 5,

        shadowColor: 'black',
        shadowRadius: theme.scale * 6,
        shadowOffset: {top: 10, width: 0, height: 0},
        elevation: theme.scale * 14, // this only works for android
        shadowOpacity: 0.4,
        alignSelf: 'stretch',
        //height:this.props.buttonHeight ? this.props.buttonHeight  : theme.scale*45,
        //width:this.props.buttonWidth ? this.props.buttonWidth  : "auto",

        marginTop: 5,
        marginBottom: 5,

        // alignSelf: 'center',
        // height: hp(9.5),
        // backgroundColor: '#fff',
        // width: wp(85),
        // // borderWidth: 0.7,
        // // borderColor: '#023C66',
        // borderRadius: wp(2),
        // elevation: 5,
        // padding: wp(3),
        // marginVertical: hp(1.5),
      },
      btnContainer: {
        //flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        margin: 5,
      },
      btnIcon: {
        color: this.props.IconColor ? this.props.IconColor : 'white',
        paddingLeft: theme.scale * 5,
        paddingRight: theme.scale * 5,
        display: this.props.hideIcon ? 'none' : 'flex',
      },
      btnTextContainer: {
        flex: 1,
        textAlignVertical: 'center',
        justifyContent: 'center',
      },
      btnText: {
        fontSize: this.props.fontsize ? this.props.fontsize : theme.scale * 16,
        color: this.props.textColor
          ? this.props.textColor
          : theme.color.stdButtonText,
        textAlign: this.props.textAlign ? this.props.textAlign : 'right',
        fontWeight: this.props.fontWeight ? this.props.fontWeight : '400',
      },
    });
    return style;
  }
  render() {
    var Icon = Icon1;
    if (this.props.iconSet == 2) Icon = Icon2;

    this.styles = this.createStyles(this.theme);
    if (this.props.hide == 'true') return null;

    return (
      <TouchableOpacity
        style={[this.styles.btnClickContain, this.props.style]}
        {...this.props}>
        <View style={this.styles.btnContainer}>
          <Icon
            name={this.props.IconName ? this.props.IconName : 'sent'}
            size={
              this.props.IconSize ? this.props.IconSize : this.theme.scale * 20
            }
            style={this.styles.btnIcon}
          />
          <View style={this.styles.btnTextContainer}>
            <Text style={this.styles.btnText}>{this.props.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

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

export class STextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme);
  }

  createStyles(theme) {
    const styles = StyleSheet.create({
      inputStyle: {
        color: theme.color.text,
        fontSize: theme.scale * 18,
        fontFamily: 'System',
        width: '100%',
        padding: 0,
        marginLeft: 5,
      },
      labelStyle: {
        fontSize: theme.scale * 14,
        color: theme.color.labelInactive,
        paddingBottom: 3,
        fontFamily: 'System',
        position: 'relative',
        fontWeight: '500',
      },
      containerStyle: {
        flex: 1,
        borderWidth: 8,
        // alignSelf: 'stretch',
        padding: 10,
        backgroundColor: theme.color.textBack,
        // borderWidth: 0.5,
        borderRadius: 10,
        borderColor: 'lightgrey',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: 8,
        shadowOpacity: 0.2,
        margin: 5,
        borderBottomColor: this.theme.color.inactiveColor,
        borderBottomWidth: 3,
      },
    });
    return styles;
  }

  onFocusView(e) {
    this.setState({
      focusStyle: {borderBottomColor: this.theme.color.activeColor},
    });
  }
  onBlurView(e) {
    this.setState({focusStyle: {}});
  }
  onClickView(e) {
    this.nameInput.focus();
  }
  render() {
    if (this.props.hide == 'true') return null;

    return (
      <View
        style={[
          this.styles.containerStyle,
          this.props.style,
          this.state.focusStyle,
          this.state.hideStyle,
        ]}
        onBlur={this.onBlurView.bind(this)}
        onTouchStart={this.onClickView.bind(this)}>
        <Text style={this.styles.labelStyle}>{this.props.label}</Text>
        <TextInput
          ref={input => {
            this.nameInput = input;
          }}
          autoCorrect={false}
          placeholder={this.props.placeholder}
          placeholderTextColor={this.props.placeholderTextColor}
          style={this.styles.inputStyle}
          onChangeText={text => this.props.onChange(text)} // this will call the onchange function set on location where the component is used
          {...this.props}
        />
      </View>
    );
  }
}

export class SView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme);
  }
  createStyles(theme) {
    const style = StyleSheet.create({
      viewStyle: {
        width: this.props.width ? this.props.width : '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },
    });
    return style;
  }

  render() {
    if (this.props.hide == 'true') return null;

    return <View style={this.styles.viewStyle}>{this.props.children}</View>;
  }
}

export class SIconButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme, this.props);
    //this.state.focusStyle={};
    //this.state.hideStyle={};
  }

  createStyles(theme, props) {
    const style = StyleSheet.create({
      btnClickContain: {
        borderRadius: props.borderRadius
          ? props.borderRadius
          : theme.scale * 15,
        flexDirection: 'column',
      },
      btnContainer: {
        //justifyContent:"space-between",
      },
      btnIconContainer: {
        borderRadius: props.borderRadius
          ? props.borderRadius
          : theme.scale * 15,
        padding: theme.scale * 5,
        margin: theme.scale * 5,
        flexDirection: 'column',
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : '#009D6E',

        elevation: 10, // this only works for android
        shadowColor: 'black',
        shadowRadius: theme.scale * 5,
        shadowOffset: {top: 5 * theme.scale, width: 0, height: 0},
        shadowOpacity: 0.4,

        height: props.BoxSize ? props.BoxSize : theme.scale * 85,
        width: props.BoxSize ? props.BoxSize : theme.scale * 85,
        //alignContent:"center",
        alignItems: 'center',
        justifyContent: 'center',
      },
      btnIcon: {
        backgroundColor: 'transparent',
        color: props.IconColor ? props.IconColor : 'white',
        display: props.hideIcon ? 'none' : 'flex',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      btnIcon2: {
        position: 'absolute',
        backgroundColor: 'transparent',
        color: 'rgba(226,231,236,0.30)',
        display: props.hideIcon ? 'none' : 'flex',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      btnText: {
        fontSize: theme.scale * 10,
        color: props.textColor ? props.textColor : '#000',
        textAlign: props.textAlign ? props.textAlign : 'right',
        textAlignVertical: 'center',
        width: '100%',
      },
    });
    return style;
  }

  render() {
    return (
      <TouchableHighlight
        style={this.styles.btnClickContain}
        underlayColor={
          this.props.underlayColor ? this.props.underlayColor : '#0e4f93'
        }
        {...this.props}>
        <View style={this.styles.btnContainer}>
          <View style={[this.styles.btnIconContainer, this.props.style]}>
            <Icon
              name={this.props.IconName ? this.props.IconName : 'sent'}
              size={
                this.props.IconSize
                  ? this.props.IconSize
                  : this.theme.scale * 50
              }
              style={this.styles.btnIcon}
            />
            <Icon
              name={this.props.IconName2 ? this.props.IconName2 : 'gear'}
              size={
                this.props.IconSize
                  ? this.props.IconSize
                  : this.theme.scale * 70
              }
              style={[this.styles.btnIcon2]}
            />
          </View>
          <Text style={this.styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export class SImageButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme, this.props);
    //this.state.focusStyle={};
    //this.state.hideStyle={};
    this.btnDefaultPic =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
  }

  createStyles(theme, props) {
    const style = StyleSheet.create({
      btnClickContain: {
        borderRadius: props.borderRadius
          ? props.borderRadius
          : theme.scale * 15,
        flexDirection: 'column',
      },
      btnContainer: {
        //justifyContent:"space-between",
      },
      btnIconContainer: {
        borderRadius: props.borderRadius
          ? props.borderRadius
          : theme.scale * 15,
        padding: theme.scale * 5,
        margin: theme.scale * 5,
        flexDirection: 'column',
        backgroundColor: props.backgroundColor
          ? props.backgroundColor
          : '#009D6E',

        elevation: 10, // this only works for android
        shadowColor: 'black',
        shadowRadius: theme.scale * 5,
        shadowOffset: {top: 5 * theme.scale, width: 0, height: 0},
        shadowOpacity: 0.4,

        height: props.BoxSize ? props.BoxSize : theme.scale * 85,
        width: props.BoxSize ? props.BoxSize : theme.scale * 85,
        //alignContent:"center",
        alignItems: 'center',
        justifyContent: 'center',
      },
      btnPic: {
        backgroundColor: 'transparent',
        color: props.IconColor ? props.IconColor : 'white',
        display: props.hideIcon ? 'none' : 'flex',
        textAlign: 'center',
        textAlignVertical: 'center',
        height: '100%',
        width: '100%',
      },
      btnIcon: {
        backgroundColor: 'transparent',
        color: props.IconColor ? props.IconColor : 'white',
        display: props.hideIcon ? 'none' : 'flex',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      profilePic: {
        position: 'absolute',
        top: 5 * theme.scale,
        left: 10 * theme.scale,
        height: 60 * theme.scale,
        width: 60 * theme.scale,
        borderRadius: 30 * theme.scale,
        backgroundColor: 'white',
        borderWidth: 5 * theme.scale,
        borderColor: '#1B152A',
        shadowColor: 'black',
        shadowRadius: 4 * theme.scale,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: 1 * theme.scale,
        shadowOpacity: 0.2 * theme.scale,
      },
      btnIcon2: {
        position: 'absolute',
        backgroundColor: 'transparent',
        color: 'rgba(226,231,236,0.30)',
        display: props.hideIcon ? 'none' : 'flex',
        textAlign: 'center',
        textAlignVertical: 'center',
      },
      btnText: {
        fontSize: theme.scale * 10,
        color: props.textColor ? props.textColor : '#000',
        textAlign: props.textAlign ? props.textAlign : 'right',
        textAlignVertical: 'center',

        width: '100%',
      },
    });
    return style;
  }

  render() {
    return (
      <TouchableHighlight
        style={this.styles.btnClickContain}
        underlayColor={
          this.props.underlayColor ? this.props.underlayColor : '#0e4f93'
        }
        {...this.props}>
        <View style={this.styles.btnContainer}>
          <View style={[this.styles.btnIconContainer, this.props.style]}>
            <Image
              source={{uri: this.btnDefaultPic}}
              style={this.styles.btnPic}
            />
            {/* <Icon name={this.props.IconName ? this.props.IconName : "sent"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*70} style={this.styles.btnIcon}/> */}
            <Icon
              name={this.props.IconName2 ? this.props.IconName2 : 'gear'}
              size={
                this.props.IconSize
                  ? this.props.IconSize
                  : this.theme.scale * 70
              }
              style={[this.styles.btnIcon2]}
            />
          </View>
          <Text style={this.styles.btnText}>{this.props.title}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export class SIconTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme, this.props);
  }

  createStyles(theme, props) {
    const styles = StyleSheet.create({
      textContainer: {
        flex: 1,
        textAlignVertical: 'center',
        justifyContent: 'center',
        //backgroundColor:"yellow",
        marginLeft: 15,
      },
      mainContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        //backgroundColor:"red",
        margin: 5,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: 'lightgrey',
        shadowColor: 'black',
        shadowRadius: 4,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: 8,
        shadowOpacity: 0.2,
        margin: 5,
        borderBottomColor: this.theme.color.stdButton,
        borderBottomWidth: 3,
        padding: 5,
      },
      inputStyle: {
        color: theme.color.stdText,
        fontSize: theme.scale * 20,
        fontFamily: 'System',
        width: '100%',
        padding: 0,
      },
      Icon: {
        color: this.props.IconColor ? this.props.IconColor : 'grey',
        paddingLeft: theme.scale * 5,
        paddingRight: theme.scale * 5,
        display: this.props.hideIcon ? 'none' : 'flex',
      },
    });
    return styles;
  }

  onFocusView(e) {
    this.setState({
      focusStyle: {borderBottomColor: this.theme.color.activeButton},
    });
  }
  onBlurView(e) {
    this.setState({focusStyle: {}});
  }
  onClickView(e) {
    this.nameInput.focus();
  }
  render() {
    if (this.props.hide == 'true') return null;

    return (
      <View
        style={[
          this.styles.mainContainer,
          this.props.style,
          this.state.focusStyle,
          this.state.hideStyle,
        ]}
        onFocus={this.onFocusView.bind(this)}
        onBlur={this.onBlurView.bind(this)}
        onTouchStart={this.onClickView.bind(this)}>
        <Icon
          name={this.props.IconName ? this.props.IconName : 'search'}
          size={
            this.props.IconSize ? this.props.IconSize : this.theme.scale * 20
          }
          style={this.styles.Icon}
        />
        <View style={this.styles.textContainer}>
          <TextInput
            ref={input => {
              this.nameInput = input;
            }}
            autoCorrect={false}
            placeholder={this.props.placeholder}
            style={this.styles.inputStyle}
            onChangeText={text => this.props.onChange(text)} // this will call the onchange function set on location where the component is used
            {...this.props}
          />
        </View>
      </View>
    );
  }
}

export class SComboBox extends React.Component {
  constructor(props) {
    super(props);

    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme);

    this.state = {};
    this.values = [];
    this.state.compiledValues = <Text style={this.styles.inputStyle}> </Text>;
    this.state.isVisible = false;

    if (this.props.showListByDefault)
      // if list is to de displayed by default
      this.state.data = this.props.data;
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
        color: theme.color.text,
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
        backgroundColor: theme.color.textBack,
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
  }

  onItemCloseIconClick(data, index) {
    this.values.splice(index, 1);
    this.valueList(this.values);
  }

  onItemSelect(item) {
    if (!this.props.multiSelect) {
      this.setState({isVisible: false});
      this.values = [];
    }
    this.values.push(item);
    this.valueList(this.values);
  }

  onKeyDown(e) {
    if (e.nativeEvent.key === 'Backspace' && this.state.text.length - 1 < 0)
      this.values.pop();

    this.valueList(this.values);
  }

  valueList(values) {
    var selectedList = '';
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
    const Item = ({title, id}) => (
      <View>
        <Text>{title}</Text>
        <Text>{id}</Text>
      </View>
    );
    // remove this function from here
    //onPress={()=>this.onItemSelect(item)}
    const renderItem = ({item}) => (
      <TouchableOpacity
        onPress={() => this.onItemSelect(item)}
        style={[this.styles.itemContainer, this.props.style]}
        underlayColor={
          this.props.underlayColor ? this.props.underlayColor : '#042417'
        }
        {...this.props}>
        {/* <Item title={item.title} id={item.id}/>                 */}
        <View>
          <Text>{item.title}</Text>
          <Text>{item.id}</Text>
        </View>
      </TouchableOpacity>
    );

    if (this.props.hide == 'true') return null;

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
                onChangeText={this.onTextChange.bind(this)} // this will call the onchange function set on location where the component is used
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
              keyboardShouldPersistTaps={'handled'} // without this the list cannot be tapped when keyboard is visible
              style={{
                marginTop: this.theme.scale * 3,
                padding: this.theme.scale * 10,
              }}
              data={this.state.data}
              renderItem={renderItem}
              //keyExtractor={item => item.id}
            />
          </SafeAreaView>
        </Modal>
      </View>
    );
  }
}

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

export class SDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.isVisible = false;
    let today = new Date();
    this.state.date = 'Select Date';
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

  hidePicker = () => {
    this.setState({
      isVisible: false,
    });
  };

  handlePickerConfirm = dateObj => {
    const date = dateObj.getDate();
    const dates = date.toString().length === 1 ? '0' + date : date;
    const month = dateObj.getMonth() + 1;
    const months = month.toString().length === 1 ? '0' + month : month;
    const year = dateObj.getFullYear();
    const selectedDate = `${year}-${months}-${dates}`;
    this.setState({date: selectedDate, isVisible: false});
    this.props.onChange(selectedDate);
  };

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

        <DateTimePickerModal
          isVisible={this.state.isVisible}
          mode="date"
          onConfirm={this.handlePickerConfirm}
          onCancel={this.hidePicker}
        />
      </View>
    );
  }
}

export class SHorizontalScrollButtons extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.props = props;
    this.theme = props.theme;
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
        margin: theme.scale * 5,
        shadowColor: 'black',
        shadowRadius: theme.scale * 10,
        shadowOffset: {top: 0, width: 0, height: 0},
        elevation: theme.scale * 14, // this only works for android
        shadowOpacity: 0.2,
        alignSelf: 'stretch',
        //height:this.props.buttonHeight ? this.props.buttonHeight  : theme.scale*45,
        //width:this.props.buttonWidth ? this.props.buttonWidth  : "auto",
        margin: 5,
        marginTop: 5,
        marginBottom: 5,
      },
      btnContainer: {
        //flex: 1,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        margin: 5,
      },
      btnIcon: {
        color: this.props.IconColor ? this.props.IconColor : 'white',
        paddingLeft: theme.scale * 5,
        paddingRight: theme.scale * 5,
        display: this.props.hideIcon ? 'none' : 'flex',
      },
      btnTextContainer: {
        flex: 1,
        textAlignVertical: 'center',
        justifyContent: 'center',
      },
      btnText: {
        fontSize: this.props.fontsize ? this.props.fontsize : theme.scale * 20,
        color: this.props.textColor
          ? this.props.textColor
          : theme.color.buttonText,
        textAlign: this.props.textAlign ? this.props.textAlign : 'right',
      },
    });
    return style;
  }

  onIconButtonClick(item) {
    alert(item.id);
  }

  render() {
    //id: '4',
    //title: 'Third Item',
    //backgroundColor:"red",
    //isImageButton:true,
    //image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=',
    //iconName1:"send",
    //iconName2:"gear",
    //IconSize:38*this.theme.scale,
    //BoxSize:50*this.theme.scale,
    //borderRadius:50*this.theme.scale

    //{/* <SIconButton  IconName="pencil" IconName2="gears" IconSize={38*this.theme.scale} BoxSize={50*this.theme.scale} borderRadius={25*this.theme.scale}  onPress={()=>alert("Hello")} backgroundColor="purple"/> */}
    const renderItem = ({item}) => {
      if (item.isImageButton)
        return (
          <SImageButton
            theme={this.theme}
            IconName={item.IconName1}
            IconName2={item.IconName2}
            backgroundColor={item.backgroundColor}
            IconSize={item.IconSize}
            BoxSize={item.BoxSize}
            borderRadius={item.borderRadius}
            title={item.title}
            // onPress={()=>{this.props.onPress(item)}}
          />
        );
      else
        return (
          <SIconButton
            theme={this.theme}
            IconName={item.IconName1}
            IconName2={item.IconName2}
            backgroundColor={item.backgroundColor}
            IconSize={item.IconSize}
            BoxSize={item.BoxSize}
            borderRadius={item.borderRadius}
            title={item.title}
            // onPress={()=>{this.props.onPress(item)}}
          />
        );
    };

    this.styles = this.createStyles(this.theme);
    if (this.props.hide == 'true') return null;

    return (
      <FlatList
        horizontal
        keyboardShouldPersistTaps={'handled'} // without this the list cannot be tapped when keyboard is visible
        style={{
          padding: this.theme.scale * 5,
          marginRight: this.theme.scale * 5,
          flexGrow: 0,
        }}
        data={this.props.data}
        renderItem={renderItem}
      />
    );
  }
}

export class SSearchList extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
    this.theme = props.theme;
    this.state = {};
    this.state.data = this.props.data ? this.props.data : [];
  }

  onTextChange(text) {
    var datas = {};
    if (text.trim().length > 0) {
      datas = this.props.data.filter(
        item =>
          JSON.stringify(item).toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
    } // if no details
    else datas = this.props.data; // if list can be displayed by default then showlist when nothing is typer for filtering

    this.setState({data: datas});
  }

  render() {
    const ItemTemplate = this.props.listItemTemplate;
    const renderItem = ({item}) => <ItemTemplate item={item} />;

    if (this.props.hide == 'true') return null;

    return (
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          width: '100%',
        }}>
        <SIconTextInput
          hide={this.props.data.length > 10 ? 'false' : 'true'}
          label="Search"
          theme={this.theme}
          onChangeText={this.onTextChange.bind(this)}
        />
        <FlatList
          keyboardShouldPersistTaps={'handled'} // without this the list cannot be tapped when keyboard is visible
          style={{
            marginTop: this.theme.scale * 2,
            padding: this.theme.scale * 5,
          }}
          data={this.state.data}
          renderItem={renderItem}
        />
      </View>
    );
  }
}

export class SDropDownPicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.gender = ['Male', 'Female'];
    this.props = props;
    this.theme = props.theme;
    this.styles = this.createStyles(this.theme);
  }

  createStyles(theme) {
    const styles = StyleSheet.create({
      labelStyle: {
        fontSize: theme.scale * 13,
        color: theme.color.labelInactive,
        paddingBottom: 3,
        fontFamily: 'System',
        position: 'relative',
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
      dropdown1BtnStyle: {
        width: wp(93),
        padding: 0,
        height: hp(4),
        backgroundColor: theme.color.textBack,
      },
      dropdown1BtnTxtStyle: {
        color: '#444',
        textAlign: 'left',
        fontSize: wp(4),
        marginLeft: wp(-2),
      },
    });
    return styles;
  }

  render() {
    if (this.props.hide == 'true') return null;

    return (
      <View style={[this.styles.containerStyle, this.props.style]}>
        <TouchableOpacity onPress={e => this.onPress(e)}>
          <View style={{padding: 0, margin: 0}}>
            <Text style={this.styles.labelStyle}>{this.props.label}</Text>

            <SelectDropdown
              defaultButtonText={'Select Gender'}
              buttonStyle={this.styles.dropdown1BtnStyle}
              buttonTextStyle={this.styles.dropdown1BtnTxtStyle}
              onSelect={(selectedItem, index) => this.props.onChange(index + 1)}
              {...this.state.prop}
              data={this.state.gender}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              rowTextForSelection={(item, index) => {
                return item;
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}
