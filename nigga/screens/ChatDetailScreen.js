import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import supabase from '../../supabaseClient'; // Ensure this path is correct

const ChatDetailScreen = ({ route }) => {
    const { chatId, name } = route.params;
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        const getMessages = async () => {
            console.log('Fetching messages');
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .eq('chat_id', chatId)
                .order('created_at', { ascending: true });

            if (error) {
                console.error('Error fetching messages:', error);
            } else {
                setMessages(data);
            }
        };

        getMessages();
    }, [chatId]);

    const sendMessage = async () => {
        console.log('Send button pressed');
        if (newMessage.trim()) {
            const user = supabase.auth.user();
            console.log('Current user:', user);
    
            if (!user) {
                console.error('User not authenticated.');
                return;
            }
    
            // Ensure recipientId is set correctly
            const recipientId = 'recipient-id'; // Replace with the actual recipient ID
    
            const { data, error } = await supabase
                .from('messages')
                .insert([{ 
                    sender_id: user.id,
                    recipient_id: recipientId,
                    chat_id: chatId,
                    message_text: newMessage
                }]);
    
            if (error) {
                console.error('Error sending message:', error);
            } else {
                console.log('Message sent successfully:', data);
                setMessages(prevMessages => [
                    ...prevMessages,
                    {
                        id: data[0].id, // Assuming the response contains the new message ID
                        sender_id: user.id,
                        message_text: newMessage,
                        chat_id: chatId,
                        created_at: new Date() // Use current date for new message
                    }
                ]);
                setNewMessage('');
            }
        }
    };

    const renderItem = ({ item }) => {
        console.log('Rendering item:', item);
        return (
            <View style={[styles.messageContainer, item.sender_id === supabase.auth.user().id ? styles.selfMessage : styles.otherMessage]}>
                <Text style={styles.messageText}>{item.message_text}</Text>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={90}
        >
            <FlatList
                data={messages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.chatArea}
                contentContainerStyle={{ padding: 10 }}
                inverted
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Type a message..."
                    value={newMessage}
                    onChangeText={setNewMessage}
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    chatArea: {
        flex: 1,
    },
    messageContainer: {
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        maxWidth: '70%',
    },
    selfMessage: {
        backgroundColor: '#dcf8c6',
        alignSelf: 'flex-end',
    },
    otherMessage: {
        backgroundColor: '#ffffff',
        alignSelf: 'flex-start',
    },
    messageText: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        backgroundColor: '#ffffff',
    },
    input: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 10,
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    sendButtonText: {
        color: '#ffffff',
        fontSize: 16,
    },
});

export default ChatDetailScreen;
