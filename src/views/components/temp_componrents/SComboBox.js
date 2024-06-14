import React, {} from 'react';
import {TextInput, View, Text,StyleSheet,FlatList,TouchableHighlight,TouchableOpacity, SafeAreaView,Modal} from 'react-native';
import { blue100 } from 'react-native-paper/lib/typescript/styles/colors';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import {SLabel} from './SLabel';



export class SComboBox extends React.Component
{
    constructor(props)
    {
        
        super(props);

        this.props=props;
        this.theme = props.theme;
        this.styles = this.createStyles(this.theme)

        this.state = {};
        this.values=[];
        this.state.compiledValues=(<Text style= {this.styles.inputStyle}> </Text>);
        this.state.isVisible=false;

        if(this.props.showListByDefault)// if list is to de displayed by default
            this.state.data=this.props.data;        
        


    }

    createStyles(theme)
    {
        const styles = StyleSheet.create({
            inputStyle:{
                color: theme.color.text,
                fontSize: theme.scale*20,
                fontFamily: 'System',
                width:"100%",
                padding:0,
            },
            inputStyleModel:{
                color: theme.color.text,
                fontSize: theme.scale*20,
                fontFamily: 'System',
                width:"92%",
                padding:0,
            },
            labelStyle:{
                fontSize: theme.scale*13,
                color: theme.color.labelInactive,
                paddingBottom: 3,
                fontFamily: 'System',
                position: 'relative',
            },
            modalHeader:{
                fontSize: theme.scale*18,
                fontWeight:"600",
                color: theme.color.buttonBack,
                paddingBottom: 3,
                fontFamily: 'System',
                //position: 'relative',
                marginTop:theme.scale*5,
                padding:theme.scale*5,
                alignSelf:"center",
            },

            containerStyle:{
                flexDirection: 'column',
                //flex:1,
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
                borderBottomColor: theme.color.primary,
                borderBottomWidth: 3,
            },
            itemContainer: {
                flexDirection: 'row',
                backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : theme.color.labelBack,
                borderRadius: this.props.borderRadius ? this.props.borderRadius : theme.scale*5,
                padding:theme.scale*5,
                margin:theme.scale*5,
                shadowColor:'black',
                shadowRadius:theme.scale*10,
                shadowOffset:{top:0, width:0,height:0},
                elevation:theme.scale*14, // this only works for android
                shadowOpacity:.2,
                alignSelf:"stretch", 
                margin:0,
                marginTop:1,
                marginBottom:1
              },
              selectedItem: {
                flexDirection: 'row',
                backgroundColor: this.props.backgroundColor ? this.props.backgroundColor : theme.color.labelBack,
                borderRadius: this.props.borderRadius ? this.props.borderRadius : theme.scale*5,
                padding:theme.scale*5,
                margin:theme.scale*5,
                shadowColor:'black',
                shadowRadius:theme.scale*10,
                shadowOffset:{top:0, width:0,height:0},
                elevation:theme.scale*14, // this only works for android
                shadowOpacity:.2,
                //alignSelf:"stretch", 
                margin:0,
                marginLeft:5,
                marginBottom:5,
              },
        });
        return styles;
    }

    onPress(e) {
        this.setState({isVisible:true});
    }
    onTextChange(text){
        var datas={};   
        if((text.trim().length > 0)) 
        {
            datas = this.props.data.filter(
                (item) =>
                    item.title.toLowerCase().indexOf(text.toLowerCase()) > -1 )
        }
        else if((text.trim().length <= 0) && this.props.showListByDefault) // if no details
            datas=this.props.data; // if list can be displayed by default then showlist when nothing is typer for filtering

        this.setState({data: datas});
    }

    onCloseIconClick(e) {
        this.setState({isVisible:false}); 
    }

    onItemCloseIconClick(data,index) {
        this.values.splice(index,1);
        this.valueList(this.values);
    }

    onItemSelect(item)
    {
        if (!this.props.multiSelect)
        {
            this.setState({isVisible:false});
            this.values=[];
        }  
        this.values.push(item);
        this.valueList(this.values);         
    }

    onKeyDown(e)
    {
        if (e.nativeEvent.key === 'Backspace' && this.state.text.length-1 < 0 ) 
            this.values.pop();

        this.valueList(this.values);
    }

    valueList(values) {
        var selectedList="";
        if (this.props.multiSelect)
        {
            selectedList= values.map((data,index) => {
            return (
                <View style={this.styles.selectedItem}>
                    <Text>{data[this.props.displayID]}</Text>
                    <Icon onPress={()=> this.onItemCloseIconClick(data,index)} name={"close"} size={18} style={this.styles.btnIcon}/> 
                </View>
            )
            })    
            selectedList = (
            <View
            style={{
                flexDirection:"row",
                flexWrap:"wrap",
                margin:0,
                padding:0,
            }}
            >{selectedList}</View>
            )
            this.setState({compiledValues:selectedList});  // change state
        }
        else
        {
            selectedList=(<Text style= {this.styles.inputStyle}>{values[0][this.props.displayID]}</Text>);
        }
        this.setState({compiledValues:selectedList}); // change state
    }



    render() 
    {

        const Item = ({ title,id }) => (
            <View>
              <Text >{title}</Text>
              <Text >{id}</Text>
            </View>
          );
        // remove this function from here
        //onPress={()=>this.onItemSelect(item)}
        const renderItem = ({ item }) => (
            <TouchableOpacity  onPress={()=>this.onItemSelect(item)} style={[this.styles.itemContainer,this.props.style]} underlayColor={this.props.underlayColor ? this.props.underlayColor :'#042417'  } {...this.props} >
                {/* <Item title={item.title} id={item.id}/>                 */}
                <View>
                <Text >{item.title}</Text>
                <Text >{item.id}</Text>
                </View>
            </TouchableOpacity>
          );

        if(this.props.hide=='true')
            return null;
        
        return(
               <View style = {[this.styles.containerStyle,this.props.style]} >
                    <TouchableOpacity onPress={(e)=>this.onPress(e)}>
                        <View style={{padding:0,margin:0}}>
                            <Text style={this.styles.labelStyle} >{this.props.label}</Text>
                            {this.state.compiledValues}
                        </View>
                    </TouchableOpacity>

                    
                    <Modal 
                    animationType = {"fade"}  
                    transparent = {false}  
                    visible = {this.state.isVisible}  
                    onRequestClose = {() =>{ console.log("Modal has been closed.") } }
                    
                    >  
                       <SafeAreaView style={{ flex: 1 }}>    
                            <Text style={this.styles.modalHeader} >{this.props.label}</Text>
                            <View style={{
                                flexDirection:"row",
                                flexWrap:"wrap",
                                margin:0,
                                padding:0,
                                borderBottomWidth:2,
                                borderBottomColor:this.theme.color.activeColor
                            }}> 
                                {this.state.compiledValues}
                                <TextInput 
                                    ref={(input) => { this.nameInput = input; }} 
                                    style={this.styles.inputStyleModel}
                                    autoCorrect={false}
                                    placeholder={this.props.placeholder}
                                    onChangeText={this.onTextChange.bind(this)}// this will call the onchange function set on location where the component is used
                                    value={this.state.text}
                                    {...this.props}
                                    />
                                <Icon onPress={(e)=>this.onCloseIconClick(e)} name={"close"} size={this.props.IconSize ? this.props.IconSize : this.theme.scale*25} style={this.styles.btnIcon}/>                             
                            </View>
                            <FlatList 
                                keyboardShouldPersistTaps={'handled'} // without this the list cannot be tapped when keyboard is visible
                                style = {{marginTop:this.theme.scale*3,padding:this.theme.scale*10}}
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




