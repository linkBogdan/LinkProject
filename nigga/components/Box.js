// components/Box.js
import React from "react";
import { View, StyleSheet } from "react-native";

const BoxContainer = ({ children }) => {
    return (
        <View style={styles.box}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    box: {  
        height: '35%',
        width: '100%', 
        backgroundColor: '#2b2b2b', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20,
        borderRadius: 20,
    },
});

export default BoxContainer;
