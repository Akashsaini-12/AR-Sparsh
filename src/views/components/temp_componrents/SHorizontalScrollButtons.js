import React, {} from 'react';
import {View, Text,StyleSheet,TouchableHighlight,FlatList} from 'react-native';
import { SIconButton } from './SIconButton';
import { SImageButton } from './SImageButton';
export class SHorizontalScrollButtons extends React.Component
{
    constructor(props)
    {
        super(props);

        this.state = {};
        this.props=props;
        this.theme = props.theme;
      
        //this.styles = this.createStyles(this.theme)
    }
    createStyles(theme)
    {
      const style = StyleSheet.create({
          btnClickContain: {
            flexDirection: 'row',
            backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : theme.color.buttonBack,
            borderRadius: this.props.borderRadius ? this.props.borderRadius : theme.scale*5,
            padding:theme.scale*5,
            margin:theme.scale*5,
            shadowColor:'black',
            shadowRadius:theme.scale*10,
            shadowOffset:{top:0, width:0,height:0},
            elevation:theme.scale*14, // this only works for android
            shadowOpacity:.2,
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
            color: this.props.textColor ? this.props.textColor :  theme.color.buttonText,
            textAlign:this.props.textAlign ? this.props.textAlign : "right",
          }
      });
        return style;
    }




    render() 
    {

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
      const renderItem = ({ item }) => {
        if (item.isImageButton)
            return (<SImageButton 
              theme={this.theme}
              IconName={item.IconName1}
              IconName2={item.IconName2}
              backgroundColor= {item.backgroundColor}
              IconSize={item.IconSize}
              BoxSize={item.BoxSize}
              borderRadius={item.borderRadius}
              title={item.title}
            />)
        else
           return (<SIconButton 
            theme={this.theme}
            IconName={item.IconName1}
            IconName2={item.IconName2}
            backgroundColor= {item.backgroundColor}
            IconSize={item.IconSize}
            BoxSize={item.BoxSize}
            borderRadius={item.borderRadius}
            title={item.title}
           />)


        //<SIconButton theme={this.theme}/>
        //<SImageButton theme={this.theme} />
      };


      this.styles = this.createStyles(this.theme)
      if(this.props.hide=='true')
        return null;

      return(
                  <FlatList
                        horizontal
                        
                        keyboardShouldPersistTaps={'handled'} // without this the list cannot be tapped when keyboard is visible
                        style = {{ padding:this.theme.scale*5,marginRight:this.theme.scale*5,flexGrow: 0}}
                        data={this.props.data}
                        renderItem={renderItem}
                  />   
      );
    }
 }
