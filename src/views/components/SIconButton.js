import React, {} from 'react';
import {View, Text,StyleSheet,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// check for props for parameters to be sent as property
export class SIconButton extends React.Component
{
  constructor(props)
  {
      super(props);

      this.state = {};
      this.props=props;
      this.theme = props.theme;
      this.styles = this.createStyles(this.theme,this.props)
      //this.state.focusStyle={};
      //this.state.hideStyle={};
  }

  createStyles(theme,props)
  {
    const style = StyleSheet.create({
        btnClickContain: {
          borderRadius: props.borderRadius ? props.borderRadius : theme.scale*15,
          flexDirection: 'column',
        },
        btnContainer: {
          //justifyContent:"space-between",
        },
        btnIconContainer:{
          borderRadius: props.borderRadius ? props.borderRadius : theme.scale*15,
          padding:theme.scale*5,
          margin:theme.scale*5,
          flexDirection: 'column',
          backgroundColor: props.backgroundColor ? props.backgroundColor : '#009D6E',
          elevation:10, // this only works for android
          
          shadowColor:'black',
          shadowRadius:theme.scale*5,
          shadowOffset:{top:0, width:0,height:0},
          shadowOpacity:.5,
          height:props.BoxSize ? props.BoxSize : theme.scale*85,
          width:props.BoxSize ? props.BoxSize : theme.scale*85,
          //alignContent:"center",
          alignItems:"center",
          justifyContent:"center",
        },
        btnIcon: {
          backgroundColor: "transparent",
          color: props.IconColor ? props.IconColor : "white",
          display:props.hideIcon ? "none" : "flex",
          textAlign:"center",
          textAlignVertical:"center",
        },
        btnIcon2: {
          position:"absolute",
          backgroundColor: "transparent",
          color: "rgba(226,231,236,0.30)",
          display:props.hideIcon ? "none" : "flex",
          textAlign:"center",
          textAlignVertical:"center",
        },
        btnText: {
          fontSize: theme.scale*10,
          color: props.textColor ? props.textColor : '#000',
          textAlign:props.textAlign ? props.textAlign : "right",
          textAlignVertical:"center",
          textAlign:"center",
          width:"100%",
        }
    });
      return style;
  };

  render() 
  {
    return(
        <TouchableHighlight  style={this.styles.btnClickContain} underlayColor={this.props.underlayColor ? this.props.underlayColor :'#0e4f93'} {...this.props}>
            <View style={this.styles.btnContainer} >
              <View style={[this.styles.btnIconContainer,this.props.style]}>
                  <Icon name={this.props.IconName ? this.props.IconName : "sent"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*70} style={this.styles.btnIcon}/>
                  <Icon name={this.props.IconName2 ? this.props.IconName2 : "gear"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*70} style={[this.styles.btnIcon2]}/>                
              </View>
              <Text style={this.styles.btnText}>{this.props.title}</Text>
            </View>
        </TouchableHighlight>
    );
  }
}
