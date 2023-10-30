import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, StyleSheet, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => (
  <View style={styles.headerContainer}>
    <View style={styles.profilePicture} />
    <Text style={styles.headerText}>Test</Text>
  </View>
);

const ChatScreen = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    { text: 'Hello', incoming: true, time: '10:00 AM' },
    { text: 'Test incoming message', incoming: true, time: '10:01 AM' },
  ]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const currentTime = getCurrentTime();
      setMessages(prevMessages => [...prevMessages, { text: message, incoming: false, time: currentTime }]);
      setMessage('');
    }
  };

  const getCurrentTime = () => {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const renderMessage = ({ item, index }) => {
    const isLastMessage = index === messages.length - 1;
    const showTime = isLastMessage || item.time !== messages[index + 1]?.time;

    return (
      <View style={[styles.messageContainer, item.incoming ? styles.incomingMessageContainer : styles.outgoingMessageContainer]}>
        <View style={[styles.messageBubble, item.incoming ? styles.incomingMessageBubble : styles.outgoingMessageBubble]}>
          <Text style={styles.messageText}>{item.text}</Text>
        </View>
        {showTime && <Text style={[styles.messageTime, !item.incoming && styles.outgoingMessageTime]}>{item.time}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
      />
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
        <TextInput
          value={message}
          onChangeText={text => setMessage(text)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f2f2f2',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    backgroundColor: 'red', // Placeholder red color
    borderRadius: 20,
    marginRight: 8,
  },
  messageList: {
    flex: 1,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    marginRight: 8,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  messageContainer: {
    alignItems: 'flex-end',
  },
  incomingMessageContainer: {
    alignItems: 'flex-start',
  },
  outgoingMessageContainer: {
    alignItems: 'flex-end',
  },
  messageBubble: {
    borderRadius: 16,
    padding: 8,
    marginBottom: 8,
  },
  incomingMessageBubble: {
    backgroundColor: 'blue',
  },
  outgoingMessageBubble: {
    backgroundColor: '#5dbb63',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
  },
  messageTime: {
    color: 'black',
    marginBottom: 4,
  },
  outgoingMessageTime: {
    color: 'black',
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 4,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ChatScreen;
