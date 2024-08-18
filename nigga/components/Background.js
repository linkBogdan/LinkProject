import React from "react";
import { View, StyleSheet } from "react-native";

const BackgroundSetter = ({children}) => {
   return (
    <View style={styles.backgroundSetter}>
                {children}
    </View>
   );
};

const styles = StyleSheet.create({
    backgroundSetter:{
        flex: 1,
        width: '100%', 
        backgroundColor: '#ffcc00', 
        justifyContent: 'center', 
        alignItems: 'center', 
        padding: 20, 
    },
});

export default BackgroundSetter;