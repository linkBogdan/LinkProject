import React, { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import ProfileInput from "../components/ProfileInput"; 
import UserEmailDisplay from "../components/UserEmailDisplay";
import DatePicker from "../components/DatePicker";
import GenderSelector from "../components/GenderPicker";
import SubmitButton from "../components/SubmitButton";
import supabase from "../../supabaseClient"; 
import { calculateAge } from "../components/calculateAge";

const CreateProfileScreen = ({ navigation }) => {
    const [displayName, setDisplayName] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    const [birthdate, setBirthdate] = useState(new Date());
    const [age, setAge] = useState(null);

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        console.log('Selected Gender:', gender);
    };

    const handleDateChange = (date) => {
        const calculatedAge = calculateAge(date);
        setBirthdate(date);
        setAge(calculatedAge);
        console.log('Calculated Age:', calculatedAge);

        if (calculatedAge < 18) {
            Alert.alert('Age Restriction', 'You must be at least 18 years old.');
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
            <SubmitButton 
                displayName={displayName}
                selectedGender={selectedGender}
                age={age}
                navigation={navigation}
                supabase={supabase}
            /> 
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
        paddingBottom: 20, 
    },
});

export default CreateProfileScreen;
