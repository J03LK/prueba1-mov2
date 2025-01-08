import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ref, set } from 'firebase/database';
import { database } from '../config/firebase';

export default function Screen1() {
    const [id, setId] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [año, setAño] = useState('');
    const [precio, setPrecio] = useState('');

    const generarIdUnico = () => {
        const limpiarCampos = () => {
            setId('');
            setMarca('');
            setModelo('');
            setAño('');
            setPrecio('');

        };
    };

    const limpiarCampos = () => {
        setMarca('');
        setModelo('');
        setAño('');
        setPrecio('');
    };

    const agregarAuto = async () => {
        if (!id) {
            Alert.alert('Error', 'Por favor ingrese un ID');
            return;
        }

        try {
            const autoRef = ref(database, `autos/${id}`);
            await set(autoRef, {
                id,
                marca,
                modelo,
                año: parseInt(año),
                precio: parseFloat(precio),
            });

            Alert.alert('Éxito', `Auto registrado correctamente `);
            limpiarCampos();
        } catch (error) {
            console.error('Error al registrar:', error);
            Alert.alert('Error', 'No se pudo registrar el auto');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Registrar Nuevo Auto</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresar ID"
                value={id}
                onChangeText={setId}
            />

            <TextInput
                style={styles.input}
                placeholder="Marca"
                value={marca}
                onChangeText={setMarca}
            />
            <TextInput
                style={styles.input}
                placeholder="Modelo"
                value={modelo}
                onChangeText={setModelo}
            />
            <TextInput
                style={styles.input}
                placeholder="Año"
                value={año}
                onChangeText={setAño}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Precio"
                value={precio}
                onChangeText={setPrecio}
                keyboardType="decimal-pad"
            />
            <TouchableOpacity style={styles.button} onPress={agregarAuto}>
                <Text style={styles.buttonText}>Registrar Auto</Text>
            </TouchableOpacity>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#007bff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
