import React from "react";
import { View, StyleSheet, Text, Button} from "react-native";
import supabase from "../supabaseClient";
import AppNavigator from "../nigga/Navigation/AppNavigator";


const HomeScreenComponent = ({navigation}) => {
    
    return (
    <View style={styles.container} >
        <Text style={styles.text}>  pula de fier</Text>
        <Button title='Customise Profile' onPress={() => {
                navigation.navigate('Create Profile');
            }} />
    </View>
    );
};

const styles = StyleSheet.create ({
    container: {
        
        alignSelf: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 30,
    },
});

export default HomeScreenComponent;