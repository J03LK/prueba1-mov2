// screens/Screen3.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { ref, update, remove } from 'firebase/database';
import { database } from '../config/firebase';


export default function Screen3() {
    const [id, setId] = useState('');
    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [año, setAño] = useState('');
    const [precio, setPrecio] = useState('');

    const editarAuto = async () => {
        try {
            const autoRef = ref(database, `autos/${id}`);
            await update(autoRef, {
                marca,
                modelo,
                año: parseInt(año),
                precio: parseFloat(precio),
            });
            Alert.alert('Éxito', 'Auto actualizado correctamente');
        } catch (error) {
            Alert.alert('Error', 'No se pudo actualizar el auto');
        }
    };

    const eliminarAuto = async () => {
        Alert.alert(
            'Confirmar eliminación',
            '¿Está seguro que desea eliminar este auto?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Eliminar',
                    onPress: async () => {
                        try {
                            const autoRef = ref(database, `autos/${id}`);
                            await remove(autoRef);
                            Alert.alert('Éxito', 'Auto eliminado correctamente');
                            setId('');
                            setMarca('');
                            setModelo('');
                            setAño('');
                            setPrecio('');
                        } catch (error) {
                            Alert.alert('Error', 'No se pudo eliminar el auto');
                        }
                    },
                },
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Editar/Eliminar Auto</Text>
            <TextInput
                style={styles.input}
                placeholder="ID del auto"
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
            <TouchableOpacity style={styles.buttonEdit} onPress={editarAuto}>
                <Text style={styles.buttonText}>Editar Auto</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={eliminarAuto}>
                <Text style={styles.buttonText}>Eliminar Auto</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#333',
    },
    input: {
        height: 50,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    buttonEdit: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonDelete: {
        backgroundColor: '#dc3545',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
