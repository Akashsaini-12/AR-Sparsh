import React, {} from 'react';
import {View, Text,StyleSheet,TouchableHighlight} from 'react-native';
import Icon1 from 'react-native-vector-icons/dist/FontAwesome';
import Icon2 from 'react-native-vector-icons/dist/Ionicons';
//import {Context} from '../theme/Theme.context';

export class SButton extends React.Component
{
     
    //static theme = Context;
    constructor(props)
    {
        super(props);

        this.state = {};
        this.props=props;
        this.theme = props.theme;
        
        //this.theme =  SetTheme();
        //this.styles = this.createStyles(this.theme)
    }
    createStyles(theme)
    {
      const style = StyleSheet.create({
          btnClickContain: {
            flexDirection: 'row',
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : theme.color.stdButton,
            borderRadius: this.props.borderRadius ? this.props.borderRadius : theme.scale*5,
            padding:theme.scale*5,
            margin:theme.scale*5,

            shadowColor:'black',
            shadowRadius:theme.scale*6,
            shadowOffset:{top:10, width:0,height:0},
            elevation:theme.scale*14, // this only works for android
            shadowOpacity:.4,
            alignSelf:"stretch", 
            //height:this.props.buttonHeight ? this.props.buttonHeight  : theme.scale*45,
            //width:this.props.buttonWidth ? this.props.buttonWidth  : "auto",
            margin:5,
            marginTop:5,
            marginBottom:5
          },
          btnContainer: {
            //flex: 1,
            flexDirection: 'row',
            width:"100%",
            justifyContent:"space-between",
            margin:5,
          },
          btnIcon: {
            color: this.props.IconColor ? this.props.IconColor : "white",
            paddingLeft:theme.scale*5,
            paddingRight:theme.scale*5,
            display:this.props.hideIcon ? "none" : "flex"
          },
          btnTextContainer :{
            flex:1,  
            textAlignVertical:"center",
            justifyContent:"center",
          },
          btnText: {
            fontSize: this.props.fontsize ? this.props.fontsize :  theme.scale*20,
            color: this.props.textColor ? this.props.textColor :  theme.color.stdButtonText,
            textAlign:this.props.textAlign ? this.props.textAlign : "right",
          }
      });
        return style;
    }
    render() 
    {

      var Icon=Icon1;
      if (this.props.iconSet==2)
          Icon = Icon2;

      this.styles = this.createStyles(this.theme)
      if(this.props.hide=='true')
        return null;

      return(
          <TouchableHighlight  style={[this.styles.btnClickContain,this.props.style]} underlayColor={this.props.underlayColor ? this.props.underlayColor :'#042417'  } {...this.props} >
              <View style={this.styles.btnContainer}>
                  <Icon name={this.props.IconName ? this.props.IconName : "sent"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*20} style={this.styles.btnIcon}/>
                  <View style={this.styles.btnTextContainer}>
                      <Text style={this.styles.btnText}>{this.props.title}</Text>
                  </View>
              </View>
          </TouchableHighlight>
      );
    }
 }
