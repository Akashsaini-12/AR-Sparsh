import React, {} from 'react';
import {TextInput, View, Text,StyleSheet} from 'react-native';


export class STextInput extends React.Component
{
    constructor(props)
    { 
        super(props);

        this.state = {};
        this.props=props;
        this.theme = props.theme;
        this.styles = this.createStyles(this.theme)
    }

    createStyles(theme)
    {
        const styles = StyleSheet.create({
            inputStyle:{
                color: theme.color.text,
                fontSize: theme.scale*20,
                fontFamily: 'System',
                width:'100%',
                padding:0,
            },
            labelStyle:{
                fontSize: theme.scale*13,
                color: theme.color.labelInactive,
                paddingBottom: 3,
                fontFamily: 'System',
                position: 'relative',
            },
            containerStyle:{
                flexDirection: 'column',
                alignSelf:'stretch',
                padding:10,
                backgroundColor:theme.color.textBack,
                borderWidth:0.5,
                borderRadius:5,
                borderColor:'lightgrey',
                shadowColor:'black',
                shadowRadius:4,
                shadowOffset:{top:0, width:0,height:0},
                elevation:8,
                shadowOpacity:.2,
                margin:5,
                borderBottomColor: this.theme.color.inactiveColor,
                borderBottomWidth: 3,
            },
        });
        return styles;
    }

    onFocusView(e) {
        this.setState({focusStyle:{borderBottomColor:this.theme.color.activeColor}})
    }
    onBlurView(e) {
        this.setState({focusStyle:{}})
    }
    onClickView(e) {
        this.nameInput.focus();
    }
    render() 
    {
        if(this.props.hide=='true')
            return null;
        
        return(
            <View style = {[this.styles.containerStyle,this.props.style, this.state.focusStyle,this.state.hideStyle]} onFocus={this.onFocusView.bind(this)} onBlur={this.onBlurView.bind(this)} onTouchStart={this.onClickView.bind(this)}>
                <Text style={this.styles.labelStyle} >{this.props.label}</Text>
                <TextInput 
                   ref={(input) => { this.nameInput = input; }} 
                   //ref={ref_input} // this is to access this control in code
                   autoCorrect={false}
                   placeholder={this.props.placeholder}
                   style= {this.styles.inputStyle}
                   onChangeText={(text) => this.props.onChange(text)} // this will call the onchange function set on location where the component is used
                   {...this.props}
                />
            </View>
        );
    }








 }
