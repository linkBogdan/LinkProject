import React from "react";
import { View, Text, StyleSheet } from "react-native";
//

const CreateProfileScreen = () => {
    return (
        <View style={styles.container}>
            <Text>Hello World!</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'lightpink',

    },
});

export default CreateProfileScreen;