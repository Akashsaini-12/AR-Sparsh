import React, {} from 'react';
import {View, Text,StyleSheet,TouchableHighlight,Image} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

// check for props for parameters to be sent as property
export class SImageButton extends React.Component
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
      this.btnDefaultPic = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAwBQTFRF7c5J78kt+/Xm78lQ6stH5LI36bQh6rcf7sQp671G89ZZ8c9V8c5U9+u27MhJ/Pjv9txf8uCx57c937Ay5L1n58Nb67si8tVZ5sA68tJX/Pfr7dF58tBG9d5e8+Gc6chN6LM+7spN1pos6rYs6L8+47hE7cNG6bQc9uFj7sMn4rc17cMx3atG8duj+O7B686H7cAl7cEm7sRM26cq/vz5/v767NFY7tJM78Yq8s8y3agt9dte6sVD/vz15bY59Nlb8txY9+y86LpA5LxL67pE7L5H05Ai2Z4m58Vz89RI7dKr+/XY8Ms68dx/6sZE7sRCzIEN0YwZ67wi6rk27L4k9NZB4rAz7L0j5rM66bMb682a5sJG6LEm3asy3q0w3q026sqC8cxJ6bYd685U5a457cIn7MBJ8tZW7c1I7c5K7cQ18Msu/v3678tQ3aMq7tNe6chu6rgg79VN8tNH8c0w57Q83akq7dBb9Nld9d5g6cdC8dyb675F/v327NB6////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/LvB3QAAAMFJREFUeNpiqIcAbz0ogwFKm7GgCjgyZMihCLCkc0nkIAnIMVRw2UhDBGp5fcurGOyLfbhVtJwLdJkY8oscZCsFPBk5spiNaoTC4hnqk801Qi2zLQyD2NlcWWP5GepN5TOtSxg1QwrV01itpECG2kaLy3AYiCWxcRozQWyp9pNMDWePDI4QgVpbx5eo7a+mHFOqAxUQVeRhdrLjdFFQggqo5tqVeSS456UEQgWE4/RBboxyC4AKCEI9Wu9lUl8PEGAAV7NY4hyx8voAAAAASUVORK5CYII=';
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
          shadowOffset:{top:5*theme.scale, width:0,height:0},
          shadowOpacity:.4,

          height:props.BoxSize ? props.BoxSize : theme.scale*85,
          width:props.BoxSize ? props.BoxSize : theme.scale*85,
          //alignContent:"center",
          alignItems:"center",
          justifyContent:"center",
        },
        btnPic: {
          backgroundColor: "transparent",
          color: props.IconColor ? props.IconColor : "white",
          display:props.hideIcon ? "none" : "flex",
          textAlign:"center",
          textAlignVertical:"center",
          height :'100%' ,
          width:'100%', 
        },
        btnIcon: {
          backgroundColor: "transparent",
          color: props.IconColor ? props.IconColor : "white",
          display:props.hideIcon ? "none" : "flex",
          textAlign:"center",
          textAlignVertical:"center",

        },
        profilePic:{ 
          position:"absolute",
          top:5*theme.scale,
          left:10*theme.scale, 
          height :60*theme.scale ,
          width:60*theme.scale, 
          borderRadius: 30*theme.scale, 
          backgroundColor:"white",
          borderWidth:5*theme.scale,
          borderColor:"#1B152A",
          shadowColor:'black',
          shadowRadius:4*theme.scale,
          shadowOffset:{top:0, width:0,height:0},
          elevation:1*theme.scale,
          shadowOpacity:.2*theme.scale,
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
                  <Image source={{uri: this.btnDefaultPic}} style={this.styles.btnPic}/>
                  {/* <Icon name={this.props.IconName ? this.props.IconName : "sent"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*70} style={this.styles.btnIcon}/> */}
                  <Icon name={this.props.IconName2 ? this.props.IconName2 : "gear"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*70} style={[this.styles.btnIcon2]}/>                 
              </View>
              <Text style={this.styles.btnText}>{this.props.title}</Text>
            </View>
        </TouchableHighlight>
    );
  }
}
