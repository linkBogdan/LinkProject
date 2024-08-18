import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import LoginForm from "../AuthForms/LoginForm";
import BoxContainer from "../components/Box";
import BackgroundSetter from "../components/Background";

const LoginScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <BackgroundSetter>
            <BoxContainer >
            <LoginForm navigation={navigation} />
            </BoxContainer>
            </BackgroundSetter>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LoginScreen;