import React from "react";
import { View, StyleSheet } from "react-native";

const NextScreen = () => {
    return(
        <View style={styles.test} />
    );
};

const styles = StyleSheet.create({
    test: {
        flex: 1,
        backgroundColor: 'black',
    },
});

export default NextScreen;
