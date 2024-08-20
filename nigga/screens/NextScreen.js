import React from "react";
import { View, StyleSheet, Button } from "react-native";
import UserEmailDisplay from "../components/UserEmailDisplay";
import LogoutButton from "../components/LogoutButton";

const NextScreen = ({ navigation }) => {
    return(
        <View style={styles.test}>
            <UserEmailDisplay />
            <LogoutButton navigation={navigation} />
            
        </View>
    );
};

const styles = StyleSheet.create({
    test: {
        flex: 1,
        backgroundColor: 'lightpink',
    },
});

export default NextScreen;
