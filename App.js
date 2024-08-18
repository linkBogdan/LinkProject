import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import AppNavigator from './nigga/Navigation/AppNavigator';
import { getData } from './utils/secureStoreUtils';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useState(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await getData('accessToken');
        if (token) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(flase);
        }
      } catch (error) {
        console.error('Error checking authentication status:', error);
        setIsAuthenticated(false);
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <>
      <AppNavigator isAuthenticated={isAuthenticated} />
      <StatusBar style="auto" />
      </>
  );
};
