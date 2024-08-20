import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import AppNavigator from './nigga/Navigation/AppNavigator';
import { getData, storeData } from './utils/secureStoreUtils';
import supabase from './supabaseClient';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getData('accessToken');
        const refreshToken = await getData('refreshToken');

        if (token) {
          // Attempt to set session with the stored access token
          const { data: { session }, error } = await supabase.auth.setSession({ access_token: token, refresh_token: refreshToken });
          
          if (session) {
            setIsAuthenticated(true);
          } else if (refreshToken && error) {
            // If the access token is invalid but we have a refresh token, try refreshing the session
            const { data: { session: refreshedSession }, error: refreshError } = await supabase.auth.refreshSession(refreshToken);
            
            if (refreshedSession) {
              await storeData('accessToken', refreshedSession.access_token);
              setIsAuthenticated(true);
            } else {
              console.error('Error refreshing session:', refreshError?.message);
              setIsAuthenticated(false);
            }
          } else {
            console.error('Error setting session:', error?.message);
            setIsAuthenticated(false);
          }
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error.message);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <AppNavigator isAuthenticated={isAuthenticated} />
      <StatusBar style="auto" />
    </>
  );
}
