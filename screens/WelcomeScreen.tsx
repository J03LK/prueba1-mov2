import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
    navigation: StackNavigationProp<any>;
};

export default function WelcomeScreen({ navigation }: Props) {
    return (
        <ImageBackground 
            source={{ uri: 'https://i.pinimg.com/236x/3f/8e/f5/3f8ef54751a02a50d6bb8f9a453860ca.jpg' }} 
            style={styles.backgroundImage}
        >
            <View style={styles.overlay}>
                <Text style={styles.name}>Kevin Lasluisa</Text>
                <Text style={styles.title}>Bienvenido a Car Manager</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('MainApp')}
                >
                    <Text style={styles.buttonText}>Comenzar</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // Asegura que la imagen se escale correctamente
        justifyContent: 'center',
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Oscurece la imagen de fondo
    },
    name: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});
