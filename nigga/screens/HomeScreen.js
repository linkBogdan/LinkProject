import React from "react";
import { View, StyleSheet, Button } from "react-native";
import UserEmailDisplay from "../components/UserEmailDisplay";
import LogoutButton from "../components/LogoutButton";
import HomeScreenComponent from "../../src_comp/HomeScreenComponent";

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.test}>
            <UserEmailDisplay />
            <View style={styles.bogdi}>
            <HomeScreenComponent navigation={navigation} />
        </View>
            <LogoutButton navigation={navigation} />


            
        </View>
    
        
    );
};

const styles = StyleSheet.create({

    bogdi: {
        width: '100%',
        height: '30%',
        marginTop: 30,
    },
    test: {
        flex: 1,
        backgroundColor: 'lightpink',
    },
});

export default HomeScreen;
