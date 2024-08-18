import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const ProfileInput = ({ label, value, onChangeText }) => {
    return (
        <View style={styles.inputContainer}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        width: '90%',
        marginBottom: 20,
        alignSelf: 'center',
        
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
        color: '#494949',
    },
    input: {
        height: 40,
        borderColor: 'grey',
        borderWidth: 1,
        paddingLeft: 8,
        width: '100%',
        backgroundColor: 'white',
        alignSelf: 'center',
        justifyContent: 'center',
    },
});

export default ProfileInput;
