 // App.js
import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const messages = [
  {
    id: '1',
    sender: 'Akash Saini',
    text: 'Hii',
    avatar: 'https://via.placeholder.com/40',
    isCurrentUser: true,
  },
  {
    id: '2',
    sender: 'ChatGPT',
    text: 'Hello! How can I assist you today?',
    avatar: 'https://via.placeholder.com/40',
    isCurrentUser: false,
  },
  {
    id: '3',
    sender: 'Akash Saini',
    text: 'If you have any questions or comments, please post them in the comments section.',
    avatar: 'https://via.placeholder.com/40',
    isCurrentUser: true,
  },
  {
    id: '4',
    sender: 'ChatGPT',
    text: 'Got it! Are you working on a blog or a website?',
    avatar: 'https://via.placeholder.com/40',
    isCurrentUser: false,
  },
];

const Chatgpt = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View
            style={[
              styles.messageContainer,
              item.isCurrentUser ? styles.currentUser : styles.otherUser,
            ]}>
            <Image source={{uri: item.avatar}} style={styles.avatar} />
            <View style={styles.messageContent}>
              <Text style={styles.sender}>{item.sender}</Text>
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <Icon name="plus" size={24} color="#000" />
        <TextInput style={styles.input} placeholder="Message" />
        <Icon name="microphone" size={24} color="#000" />
      </View>
    </View>
  );
};

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  messageList: {
    paddingVertical: 10,
  },
  messageContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    maxWidth: '75%',
    minWidth: '25%',
  },
  currentUser: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
  },
  otherUser: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFF',
  },
  avatar: {
    width: width * 0.1,
    height: width * 0.1,
    borderRadius: (width * 0.1) / 2,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  sender: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: width * 0.04,
  },
  messageText: {
    fontSize: width * 0.045,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 25,
    backgroundColor: '#fff',
    fontSize: width * 0.045,
  },
});

export default Chatgpt;
