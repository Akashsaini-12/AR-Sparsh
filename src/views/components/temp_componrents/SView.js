import React, {} from 'react';
import {View,StyleSheet} from 'react-native';

export class SView extends React.Component
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
      const style = StyleSheet.create({
          viewStyle: {
            width:"100%",
            alignItems:"center",
            justifyContent:"center",
          },

      });
        return style;
    }

    render() 
    {
      if(this.props.hide=='true')
        return null;

      return(
              <View style={this.styles.viewStyle}>
                 {this.props.children}
              </View>
      );
    }
 }
