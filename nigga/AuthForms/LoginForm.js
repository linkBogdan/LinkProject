import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from "react-native";
import supabase from '../../supabaseClient';
import { storeData, getData } from '../../utils/secureStoreUtils';

const LoginForm = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        console.log('Attempting login with:', email, password);
        try {
            const { data: { session }, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });
    
            if (error) {
                console.log('Login Error:', error.message);
                Alert.alert('Login Error', error.message);
                setPassword('');  // Clear password field on error
                return;
            }
    
            console.log('Login successful');
            // Store both access and refresh tokens
            await storeData('accessToken', session.access_token);
            await storeData('refreshToken', session.refresh_token);
    
            // Verify the stored tokens and navigate accordingly
            const token = await getData('accessToken');
            if (token) {
                navigation.navigate('Create Profile');
            } else {
                console.log('Error: Token not found after login');
                Alert.alert('Error', 'Unable to retrieve session token.');
            }
        } catch (error) {
            console.log('Unexpected Error:', error.message);
            Alert.alert('Unexpected Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
            <Button title="Create Account" onPress={() => {
                navigation.navigate('Create Account');
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
        margin: 20,
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        width: '100%',
        backgroundColor: 'white',
    },
});

export default LoginForm;
