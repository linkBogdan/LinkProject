import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import supabase from "../../supabaseClient"; // Ensure this path matches your project structure

const UserEmailDisplay = () => {
    const [email, setEmail] = useState('');

    useEffect(() => {
        const fetchUserEmail = async () => {
            const { data: { user }, error } = await supabase.auth.getUser();

            if (error) {
                console.error("Error fetching user:", error.message);
            } else if (user) {
                setEmail(user.email);
            }
        };

        fetchUserEmail();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Logged in as:</Text>
            <Text style={styles.email}>{email}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        marginLeft: 10,
    },
    label: {
        fontSize: 16,
        color: '#494949',
    },
    email: {
        fontSize: 18,
        color: '#333',
        fontWeight: 'bold',
    },
});

export default UserEmailDisplay;
