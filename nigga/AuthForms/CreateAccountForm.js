import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import supabase from "../../supabaseClient";

const CreateAccountForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignUp = async () => {

        const emailRagex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRagex.test(email)) {
            Alert.alert(
                'Invalid Email!',
                'Please enter a valid email address'
            );
            return;
        }

        const passwordRagex = /^(?=.*[A-Z]).{8,}$/;
        if (!passwordRagex.test(password)) {
            Alert.alert(
                'Invalid Password!',
                'Password must be at least 8 characters long and include a capital letter'
            );
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert('Passwords Mismatch', 'Passwords do not match');
            return;
        }
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            Alert.alert('Could not Create Account', error.message);
        } else {
            Alert.alert('Successful SignUp', 'Account created successfully');
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
            <TextInput
             style={styles.input}
             placeholder="Confirm Password"
             secureTextEntry
             value={confirmPassword}
             onChangeText={setConfirmPassword}
            />
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '80%',
    },
    input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        backgroundColor: 'white',
    },
});

export default CreateAccountForm;