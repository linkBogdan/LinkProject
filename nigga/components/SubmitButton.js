import React from 'react';
import { Button, StyleSheet, View, Alert } from 'react-native';

const SubmitButton = ({ displayName, selectedGender, age, navigation, supabase }) => {
    const handleSubmit = async () => {
        try {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError || !session) {
                Alert.alert('Error', 'No user is logged in.');
                return;
            }

            const user = session.user; // Get current user
             // Log the values to be upserted
             console.log('Submitting profile with:', {
                id: user.id,
                display_name: displayName,
                gender: selectedGender,
                age: age,
            });

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
                navigation.navigate('Home Screen'); // Replace with your target screen
            }
        } catch (error) {
            console.error('Unexpected error:', error.message);
            Alert.alert('Unexpected Error', 'An unexpected error occurred.');
        }
    };

    return (
        <View style={styles.buttonContainer}>
            <Button title="Submit" onPress={handleSubmit} color='#007AFF' />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginVertical: 20,
        width: '100%',
    },
});

export default SubmitButton;
