// authUtils.js
import supabase from '../supabaseClient';

export const checkSession = async () => {
    const token = await getData('accessToken');
    const refreshToken = await getData('refreshToken');
    if (token && refreshToken) {
        const { data, error } = await supabase.auth.setSession({
            access_token: token,
            refresh_token: refreshToken
        });

        if (error) {
           // console.error('Error setting session:', error.message);
            return false;
        } else {
          //  console.log('Session restored:', data);
            return true;
        }
    } else {
        console.warn('No session token found');
        return false;
    }
};

export const subscribeToAuthChanges = (setIsLoggedIn) => {
    const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
        
        setIsLoggedIn(session ? true : false);
    });

    return subscription;
};
