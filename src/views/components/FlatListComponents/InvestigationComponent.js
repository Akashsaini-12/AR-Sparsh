import {STextInput} from 'medskey_ui_components';
import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

class InvestigationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      itemName: this.props.item.name,
      itemInstruction: this.props.item.instruction,
    };
  }

  // handleUpdateItem = () => {
  //   const {item} = this.props;
  //   const {itemName, itemInstruction} = this.state;
  //   this.props.editItem(item._inv_id, {
  //     name: itemName,
  //     instruction: itemInstruction,
  //   });
  //   this.setState({modalVisible: false});
  // };

  render() {
    const {item, deleteItem, editItem} = this.props;
    const {modalVisible, itemName, itemInstruction} = this.state;
    // const {modalVisible, itemName, itemInstruction, editItem} = this.state;

    return (
      <>
        <SwipeListView
          data={[item]}
          renderItem={(rowData, rowMap) => (
            <View
              style={{
                bottom: 5,
                shadowColor: 'black',
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.3,
                shadowRadius: 3,
              }}>
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#fff',
                  elevation: 4,
                  marginVertical: 4,
                  marginHorizontal: 10,
                  padding: 12,
                  borderRadius: 6,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#222',
                    flex: 1,
                  }}>
                  Test : {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '600',
                    color: '#222',
                    flex: 1,
                  }}>
                  Instruction : {item.instruction}
                </Text>
                {/* Other item details */}
              </View>
            </View>
          )}
          renderHiddenItem={(data, rowMap) => (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                marginHorizontal: 11,
                padding: 4,
                bottom: 5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.setState({modalVisible: true});
                  // editItem(item);
                }}
                style={{
                  flex: 1,
                  backgroundColor: 'green',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                }}>
                <Text
                  style={{
                    color: '#fff',
                    textAlign: 'center',
                    marginStart: 10,
                    fontWeight: 'bold',
                  }}>
                  Edit
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => deleteItem(item._inv_id)}
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                }}>
                <Text
                  style={{color: '#fff', marginEnd: 10, fontWeight: 'bold'}}>
                  Delete
                </Text>
              </TouchableOpacity>
            </View>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => this.setState({modalVisible: false})}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.4)', // Light transparent background
            }}>
            <View
              style={{
                height: '80%',
                width: '80%',
                backgroundColor: '#fff',
                borderRadius: 10,
                padding: 20,
              }}>
              <Text style={{fontWeight: 'bold'}}>Edit Investigation</Text>

              <STextInput
                label="Investigation Name"
                inputContainerStyle={{
                  height: 70,
                }}
                value={itemName}
                onChangeText={text => this.setState({itemName: text})}
              />
              <STextInput
                label="Instruction"
                inputContainerStyle={{
                  height: 70,
                }}
                value={itemInstruction}
                onChangeText={text => this.setState({itemInstruction: text})}
              />

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  marginTop: 40,
                }}>
                <TouchableOpacity
                  style={{
                    // backgroundColor: '#023C66',
                    padding: 10,
                    borderRadius: 20,
                    width: '48%',
                    borderWidth: 1,
                    borderColor: '#023C66',
                  }}
                  onPress={() => this.setState({modalVisible: false})}>
                  <Text style={{color: '#023C66', textAlign: 'center'}}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: '#023C66',
                    padding: 10,
                    borderRadius: 20,
                    width: '48%',
                  }}
                  onPress={() => editItem(item._inv_id)}>
                  <Text style={{color: '#fff', textAlign: 'center'}}>
                    Update
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </>
    );
  }
}

export default InvestigationComponent;
