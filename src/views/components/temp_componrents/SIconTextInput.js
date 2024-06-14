import React, {} from 'react';
import {TextInput, View, Text,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';


export class SIconTextInput extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
        this.props=props;
        this.theme = props.theme;
        this.styles = this.createStyles(this.theme,this.props)
    }

    createStyles(theme,props)
    {
        const styles = StyleSheet.create({

            textContainer :{
                flex:1,  
                textAlignVertical:"center",
                justifyContent:"center",
                //backgroundColor:"yellow",
                marginLeft:15,
              },
              mainContainer: {
                flexDirection: 'row',
                justifyContent:"space-between",
                //backgroundColor:"red",
                margin:5,
                borderWidth:0.5,
                borderRadius:5,
                borderColor:'lightgrey',
                shadowColor:'black',
                shadowRadius:4,
                shadowOffset:{top:0, width:0,height:0},
                elevation:8,
                shadowOpacity:.2,
                margin:5,
                borderBottomColor: this.theme.color.stdButton,
                borderBottomWidth: 3,
                padding:5,
              },
            inputStyle:{
                color: theme.color.stdText,
                fontSize: theme.scale*20,
                fontFamily: 'System',
                width:'100%',
                padding:0,
            },
            Icon: {
                color: this.props.IconColor ? this.props.IconColor : "grey",
                paddingLeft:theme.scale*5,
                paddingRight:theme.scale*5,
                display:this.props.hideIcon ? "none" : "flex"
              },

        });
        return styles;
    }

    onFocusView(e) {
        this.setState({focusStyle:{borderBottomColor:this.theme.color.activeButton}})
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

            <View style={[this.styles.mainContainer,this.props.style, this.state.focusStyle,this.state.hideStyle]} onFocus={this.onFocusView.bind(this)} onBlur={this.onBlurView.bind(this)} onTouchStart={this.onClickView.bind(this)}>
                <Icon name={this.props.IconName ? this.props.IconName : "search"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*20} style={this.styles.Icon}/>
                <View style={this.styles.textContainer}>
                    <TextInput 
                    ref={(input) => { this.nameInput = input; }} 
                    autoCorrect={false}
                    placeholder={this.props.placeholder}
                    style= {this.styles.inputStyle}
                    onChangeText={(text) => this.props.onChange(text)} // this will call the onchange function set on location where the component is used
                    {...this.props}
                    />
                </View>
            </View>

            
        );
    }








 }
