// authUtils.js
import supabase from '../supabaseClient';
import { getData } from './secureStoreUtils';

export const checkSession = async () => {
    const token = await getData('accessToken');
    if (token) {
        const { data: { session }, error } = await supabase.auth.setSession(token);
        if (error) {
            console.error('Error setting session:', error.message);
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
};

export const subscribeToAuthChanges = (setIsLoggedIn) => {
    const { subscription } = supabase.auth.onAuthStateChange((event, session) => {
        console.log('Auth state changed:', event, session);
        setIsLoggedIn(session ? true : false);
    });

    return subscription;
};
