import React from 'react';
import { Button, Alert } from 'react-native';
import supabase from '../../supabaseClient';
import { storeData } from '../../utils/secureStoreUtils';

const LogoutButton = ({ navigation }) => {
    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();

            if (error) {
                Alert.alert('Logout Error', error.message);
            } else {
                console.log('Logout successful');
                
                // Clear the access token from secure storage
                await storeData('accessToken', '');

                // Navigate to the Login screen
                navigation.navigate('Login');
            }
        } catch (error) {
            Alert.alert('Unexpected Error', error.message);
        }
    };

    return (
        <Button title="Logout" onPress={handleLogout} />
    );
};

export default LogoutButton;
