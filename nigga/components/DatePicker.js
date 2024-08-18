import React, { useState } from 'react';
import { View, Button, Platform, Alert, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { calculateAge } from './calculateAge'; // Adjust the path as needed

const DatePicker = ({ onDateChange }) => { // Accept onDateChange as a prop
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        
        const age = calculateAge(currentDate);
        console.log('Selected Age:', age);

        if (age < 18) {
            // Handle the case when age is under 18
            Alert.alert('Age Restriction', 'You must be at least 18 years old.');
            // Implement logout logic here if needed
        } else if (onDateChange) {
            // Call onDateChange if it's provided
            onDateChange(currentDate);
        }
    };

    return (
        <View style={styles.pula}>
            <Button onPress={() => setShow(true)} title="Select Age" color='#007AFF' />
            {show && (
                <DateTimePicker
                    value={date}
                    mode="date"
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    pula: {
        justifyContent: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: 15,
    },
});

export default DatePicker;
