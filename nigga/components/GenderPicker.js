import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

const GenderSelector = ({ onGenderChange }) => {
    const [showOptions, setShowOptions] = useState(false);
    const [selectedGender, setSelectedGender] = useState('');
    const [otherGender, setOtherGender] = useState('');

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        if (gender !== 'Other') {
            setOtherGender('');
        }
        onGenderChange(gender === 'Other' ? otherGender : gender);
        setShowOptions(false);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => setShowOptions(!showOptions)}>
                <Text style={styles.buttonText}>{selectedGender || 'Select Gender'}</Text>
            </TouchableOpacity>
            
            {showOptions && (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity onPress={() => handleGenderChange('Male')} style={styles.option}>
                        <Text style={styles.optionText}>Male</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGenderChange('Female')} style={styles.option}>
                        <Text style={styles.optionText}>Female</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGenderChange('Non-binary')} style={styles.option}>
                        <Text style={styles.optionText}>Non-binary</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => handleGenderChange('Other')} style={styles.option}>
                        <Text style={styles.optionText}>Other</Text>
                    </TouchableOpacity>
                </View>
            )}

            {selectedGender === 'Other' && (
                <TextInput
                    style={styles.input}
                    placeholder="Specify gender"
                    value={otherGender}
                    onChangeText={setOtherGender}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        right: 7,
        
        
    },
    button: {
        padding: 10,
        borderRadius: 5,
        marginBottom: 10,
        
    },
    buttonText: {
        fontSize: 18,
        color: '#007AFF',
    },
    optionsContainer: {
        marginBottom: 10,
        width: 'auto'
    },
    option: {
        padding: 10,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
        marginBottom: 5,
    },
    optionText: {
        fontSize: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 8,
        backgroundColor: 'white',
        width: 330,
    },
});

export default GenderSelector;
