import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Image, PanResponder, Animated, Button, Text } from "react-native";
import LogoutButton from "../nigga/components/LogoutButton";

const HomeScreenComponent = ({ navigation }) => {
    const [showContainer, setShowContainer] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    
    const pan = useRef(new Animated.ValueXY()).current;
    const fadeAnim = useRef(new Animated.Value(0)).current; 
    const translateAnim = useRef(new Animated.Value(-200)).current; 

    useEffect(() => {
        if (showContainer) {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.timing(translateAnim, {
                    toValue: -200,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [showContainer]);

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (_, gestureState) => {
                return Math.abs(gestureState.dx) > 20;
            },
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dx > 50) {
                    setShowContainer(true);
                    setShowButton(true);
                } else if (gestureState.dx < -50) {
                    setShowContainer(false);
                    setShowButton(false);
                    setShowButtons(false);
                }
            },
            onPanResponderRelease: () => {
                
            },
        })
    ).current;

    const toggleButtonsVisibility = () => {
        setShowButtons(!showButtons);
    };

    return (
        <View style={styles.mainContainer} {...panResponder.panHandlers}>
            <Button title="Go to chat" onPress={() => navigation.navigate('Chat Screen')} />
            <Animated.View style={[
                styles.sideContainer, 
                {
                    opacity: fadeAnim,
                    transform: [{ translateX: translateAnim }],
                }
            ]}>
                {showButton && (
                    <TouchableOpacity style={styles.toggleButton} onPress={toggleButtonsVisibility}>
                        <Image 
                            source={require('../assets/3lines.png')} 
                            style={styles.toggleButtonImage}
                        />
                    </TouchableOpacity>
                )}

                {showButtons && (
                    <View style={styles.hiddenButtons}>
                        <Button
                            onPress={() => navigation.navigate('Create Profile')} 
                            title="Customise Profile"
                        />
                        <LogoutButton navigation={navigation} />
                    </View>
                )}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    sideContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: 200,  
        backgroundColor: 'rgba(211, 211, 211, 0.7)',
        borderColor: 'darkgrey',
        borderWidth: 1,
        padding: 10,
        borderTopRightRadius: 15,
        borderBottomEndRadius: 15,
        
        },
    toggleButton: {
        padding: 10,
        borderRadius: 5,
    },
    toggleButtonImage: {
        width: 24,
        height: 24,
        tintColor: 'black',
    },
    hiddenButtons: {
        marginTop: 10,
        alignItems: 'flex-start',
    },
});

export default HomeScreenComponent;
