import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import CreateAccountForm from "../AuthForms/CreateAccountForm";
import BackgroundSetter from "../components/Background";
import BoxContainer from "../components/Box";

const CreateAccountScreen = ({ navigation }) => {
    return (
        <View style={styles.containerCreateAccount}>
            <BackgroundSetter>
            <BoxContainer>
            <CreateAccountForm />
            </BoxContainer >
            </BackgroundSetter>
        </View>
    );
};

const styles = StyleSheet.create({
    containerCreateAccount: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CreateAccountScreen;