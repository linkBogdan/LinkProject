import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import ProfileInput from "../components/ProfileInput"; // Import the child component
import UserEmailDisplay from "../components/UserEmailDisplay";
import DatePicker from "../components/DatePicker";
import GenderSelector from "../components/GenderPicker";
//import SubmitButton from "../components/SubmitButton";
import supabase from "../../supabaseClient"; // Import your Supabase client

const CreateProfileScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [age, setAge] = useState(null);

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        console.log('Selected Gender:', gender);
    };

    const handleDateChange = (date, calculatedAge) => {
        setBirthdate(date);
        setAge(calculatedAge);
        if (calculatedAge < 18) {
            Alert.alert('Age Restriction', 'You must be at least 18 years old.');
        }
    };

    const handleSubmit = async () => {
        try {
            const user = supabase.auth.user(); // Get current user
            
            if (user) {
                const { error } = await supabase
                    .from('profile')
                    .upsert({
                        id: user.id,
                        display_name: displayName,
                        gender: selectedGender,
                        age: age,
                    });

                if (error) {
                    console.error('Error updating profile:', error.message);
                    Alert.alert('Error', 'Failed to update profile.');
                } else {
                    console.log('Profile updated successfully');
                    Alert.alert('Success', 'Profile updated successfully.');
                    navigation.navigate('NextScreen'); // Replace with your target screen
                }
            } else {
                Alert.alert('Error', 'No user is logged in.');
            }
        } catch (error) {
            console.error('Unexpected error:', error.message);
            Alert.alert('Unexpected Error', 'An unexpected error occurred.');
        }
    };

    return (
        <View contentContainerStyle={styles.scrollContainer}>
            <UserEmailDisplay />
            <ProfileInput
                label="Display Name:"
                value={displayName}
                onChangeText={setDisplayName}
            />
            <DatePicker onDateChange={handleDateChange} />
            <GenderSelector onGenderChange={handleGenderChange} />
            
        </View>
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20, // Ensure there's padding at the bottom
    },
});

export default CreateProfileScreen;
