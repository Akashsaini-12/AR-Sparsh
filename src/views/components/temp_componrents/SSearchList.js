import React, {} from 'react';
import { View,FlatList} from 'react-native';
import {STextInput} from './STextInput';
import {SIconTextInput} from './SIconTextInput';
export class SSearchList extends React.Component
{
    constructor(props)
    {
        super(props);
        this.props=props;
        this.theme = props.theme;
        this.state = {};
        this.state.data =  this.props.data ? this.props.data : [];        
    }

    onTextChange(text){
        var datas={};   
        if((text.trim().length > 0)) 
        {
            datas = this.props.data.filter(
                (item) =>
                JSON.stringify(item).toLowerCase().indexOf(text.toLowerCase()) > -1 )
        }
        else // if no details
            datas=this.props.data; // if list can be displayed by default then showlist when nothing is typer for filtering

        this.setState({data: datas});
    }


    onItemSelect(item)
    {
        this.props.onItemSelect(item);       
    }

    render() 
    {

        const ItemTemplate=this.props.listItemTemplate;
        const renderItem = ({ item }) => (
            <ItemTemplate item={item}/>
          );

        if(this.props.hide=='true')
            return null;
        
        return(

            <View  style={{ flex: 1, alignItems: 'stretch', justifyContent: 'center',width:"100%" }}>
            <SIconTextInput hide={this.props.data.length>10 ? "false" : "true"} label="Search" theme={this.theme} onChangeText={this.onTextChange.bind(this)}/>                        
            <FlatList
                    keyboardShouldPersistTaps={'handled'} // without this the list cannot be tapped when keyboard is visible
                    style = {{marginTop:this.theme.scale*2,padding:this.theme.scale*5}}
                    data={this.state.data}
                    renderItem={renderItem}
            />         
            </View>  
             
        );
    }

 }




