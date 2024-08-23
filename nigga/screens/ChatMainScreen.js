import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import supabase from '../../supabaseClient'; // Ensure this path is correct

const ChatMainScreen = ({ navigation }) => {
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        const fetchCurrentUserId = async () => {
            try {
                const { data: { session }, error } = await supabase.auth.getSession();
                
                if (error) {
                    console.error('Error fetching session:', error.message);
                    setError('Error fetching session.');
                    setLoading(false);
                    return;
                }
                
                if (session && session.user) {
                    console.log(session.user.id); // Log the user ID
                    setCurrentUserId(session.user.id);
                } else {
                    console.error('No user is logged in.');
                    setError('No user is logged in.');
                    setLoading(false);
                }
            } catch (e) {
                console.error('Unexpected error:', e);
                setError('Unexpected error occurred.');
                setLoading(false);
            }
        };

        fetchCurrentUserId();
    }, []);

    useEffect(() => {
        const getPeople = async () => {
            if (currentUserId) {
                try {
                    const { data, error } = await supabase
                        .from('profile')
                        .select('*');

                    if (error) {
                        console.error('Error fetching people:', error);
                        setError('Error fetching data.');
                    } else {
                        // Filter out the current user
                        const filteredData = data.filter(person => person.id !== currentUserId);
                        setPeople(filteredData);
                    }
                } catch (e) {
                    console.error('Unexpected error:', e);
                    setError('Unexpected error occurred.');
                }

                setLoading(false);
            }
        };

        getPeople();
    }, [currentUserId]);

    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>{error}</Text>;

    return (
        <View style={styles.container}>
            <ScrollView>
                {people.map(person => (
                    <TouchableOpacity
                        key={person.id}
                        style={styles.personContainer}
                        onPress={() => navigation.navigate('Chat Detail', { chatId: person.id, name: person.display_name })}
                    >
                        <Text style={styles.personName}>{person.display_name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 10,
    },
    personContainer: {
        backgroundColor: '#ffffff',
        padding: 15,
        marginVertical: 8,
        borderRadius: 10,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    personName: {
        fontSize: 18,
        color: '#333',
    },
});

export default ChatMainScreen;
