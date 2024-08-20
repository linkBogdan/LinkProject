// AppNavigator.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import CreateProfileScreen from '../screens/CreateProfileScreen';
import NextScreen from '../screens/NextScreen';
import { checkSession, subscribeToAuthChanges } from '../../utils/authUtils';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const initializeSession = async () => {
            const sessionExists = await checkSession();
            setIsLoggedIn(sessionExists);
        };

        initializeSession();

        const subscription = subscribeToAuthChanges(setIsLoggedIn);

        return () => {
            subscription?.unsubscribe();
        };
    }, []);

    if (isLoggedIn === null) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={isLoggedIn ? 'NextScreen' : 'Login' }>
                {!isLoggedIn ? (
                    <>
                        
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Create Account" component={CreateAccountScreen} />
                    </>
                ) : (
                    <>
                    <Stack.Screen name="Create Profile" component={CreateProfileScreen} />
                    <Stack.Screen name="NextScreen" component={NextScreen} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppNavigator;
