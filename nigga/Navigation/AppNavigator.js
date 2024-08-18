import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import CreateProfileScreen from "../screens/CreateProfileScreen";
import supabase from "../../supabaseClient";
import { getData } from '../../utils/secureStoreUtils';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            // Try to get the token from SecureStore
            const token = await getData('accessToken');

            if (token) {
                // Authenticate using the token
                const { data: { session }, error } = await supabase.auth.setSession(token);

                if (error) {
                    console.error('Error setting session:', error.message);
                    setIsLoggedIn(false);
                } else {
                    setIsLoggedIn(true);
                }
            } else {
                setIsLoggedIn(false);
            }
        };

        checkSession();

        // Subscribe to auth state changes
        const { subscription } = supabase.auth.onAuthStateChange((event, session) => {
            console.log('Auth state changed:', event, session);
            setIsLoggedIn(session ? true : false);
        });

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
            <Stack.Navigator initialRouteName={isLoggedIn ? "Create Profile" : "Login"}>
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen name="Login" component={LoginScreen} />
                        <Stack.Screen name="Create Account" component={CreateAccountScreen} />
                    </>
                ) : (
                    <Stack.Screen name="Create Profile" component={CreateProfileScreen} />
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
