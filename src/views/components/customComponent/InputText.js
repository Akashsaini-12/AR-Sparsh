import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import CustomIcon from '../../layouts/CustomIcon';
import Themes from '../../../Themes';

const colorTheme = Themes;

export class InputText extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      showPassword: false,
    };
    this.props = props;
    this.theme = colorTheme;
    this.styles = this.createStyles(this.theme);
  }

  createStyles(theme) {
    const styles = StyleSheet.create({
      textInputContainer: {
        alignSelf: 'center',
        height: theme.scale * 46,
        backgroundColor: theme.color.whitePrimary,
        width: '99%',
        borderRadius: theme.scale * 20,
        elevation: theme.scale * 5,
        // paddingTop: theme.scale * 0,
        paddingLeft: theme.scale * 10,
        marginTop: theme.scale * 20,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: theme.scale * 3 },
        shadowOpacity: 0.5,
        shadowRadius: theme.scale * 3,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        zIndex: -1
      },
      textInputStyle: {
        flex: 1,
        fontSize: theme.scale * 14,
        color: theme.color.text,
        // marginBottom: theme.scale * 5,
        // marginLeft: theme.scale * 2,
        marginTop: Platform.OS === 'ios' ? 20 : 0,
      },
      eyeIcon: {
        marginRight: theme.scale * 18,
      },
    });
    return styles;
  }

  togglePasswordVisibility = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  };

  render() {
    return (
      <View
        style={[
          this.styles.textInputContainer,
          this.props.inputContainerStyle,
          this.state.focusStyle,
        ]}>
        {this.props.iconName === 'eye' ? (
          <>
            <TextInput
              ref={input => {
                this.nameInput = input;
              }}
              autoCorrect={false}
              placeholder={this.props.placeholder}
              placeholderTextColor={this.props.placeholderTextColor}
              style={[this.styles.textInputStyle, this.props.inputStyle]}
              value={this.props.value}
              secureTextEntry={!this.state.showPassword}
              onChangeText={text => this.props.onChangeText(text)}
              {...this.props}
            />
            <TouchableOpacity
              style={this.styles.eyeIcon}
              onPress={this.togglePasswordVisibility}>
              <CustomIcon
                iconName={this.state.showPassword ? 'eye-slash' : 'eye'}
                iconSize={20}
                iconColor={'#f9be51'}
                iconType={this.props.iconType}
              />
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              ref={input => {
                this.nameInput = input;
              }}
              autoCorrect={false}
              placeholder={this.props.placeholder}
              placeholderTextColor={this.props.placeholderTextColor}
              style={[this.styles.textInputStyle, this.props.inputStyle]}
              value={this.props.value}
              onChangeText={text => this.props.onChangeText(text)}
              {...this.props}
            />
            <View style={this.styles.eyeIcon}>
              <CustomIcon
                iconName={this.props.iconName}
                iconSize={20}
                iconColor={'#f9be51'}
                iconType={this.props.iconType}
              />
            </View>
          </>
        )}
      </View>
    );
  }
}
