import React from "react";
import { View, StyleSheet, Button } from "react-native";
import UserEmailDisplay from "../components/UserEmailDisplay";
import HomeScreenComponent from "../../src_comp/HomeScreenComponent";

const HomeScreen = ({ navigation }) => {
    return(
        <View style={styles.test}>
            
            
            <HomeScreenComponent navigation={navigation} />
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
        backgroundColor: 'lightyellow',
    },
});

export default HomeScreen;
