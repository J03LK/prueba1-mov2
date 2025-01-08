import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { ref, get } from 'firebase/database';
import { database } from '../config/firebase';
import { Auto } from '../types/types';
import Informacion from '../components/Informacion';

const Screen2: React.FC = () => {
    const [id, setId] = useState<string>('');
    const [auto, setAuto] = useState<Auto | null>(null);
    const [autos, setAutos] = useState<Auto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const buscarPorId = async (): Promise<void> => {
        if (!id.trim()) {
            Alert.alert('Error', 'Por favor ingrese un ID');
            return;
        }

        setLoading(true);
        try {
            const autoRef = ref(database, `autos/${id}`);
            const snapshot = await get(autoRef);
            
            if (snapshot.exists()) {
                const autoData = snapshot.val();
                setAuto({
                    id,
                    ...autoData
                } as Auto);
            } else {
                Alert.alert('Error', 'No se encontró el auto');
                setAuto(null);
            }
        } catch (error) {
            console.error('Error al buscar:', error);
            Alert.alert('Error', 'Error al buscar el auto');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const cargarAutos = async () => {
            setLoading(true);
            try {
                const autosRef = ref(database, 'autos');
                const snapshot = await get(autosRef);
                
                if (snapshot.exists()) {
                    const autosData = snapshot.val();
                    const autosArray: Auto[] = Object.keys(autosData).map(key => ({
                        id: key,
                        ...autosData[key]
                    }));
                    setAutos(autosArray);
                } else {
                    setAutos([]);
                }
            } catch (error) {
                console.error('Error al cargar autos:', error);
                Alert.alert('Error', 'Error al cargar la lista de autos');
            } finally {
                setLoading(false);
            }
        };

        cargarAutos();
    }, []);

    const renderItem = ({ item }: { item: Auto }) => (
        <Informacion
            item={item}
            onPress={() => Alert.alert(
                'Detalles del Auto',
                `Marca: ${item.marca}\nModelo: ${item.modelo}\nAño: ${item.año}\nPrecio: $${item.precio.toLocaleString()}`
            )}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    value={id}
                    onChangeText={setId}
                    placeholder="ID del auto"
                    placeholderTextColor="#999"
                />
                <TouchableOpacity 
                    style={styles.searchButton} 
                    onPress={buscarPorId}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#ffffff" />
                    ) : (
                        <Text style={styles.buttonText}>Buscar</Text>
                    )}
                </TouchableOpacity>
            </View>

            {auto && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Resultado de la búsqueda:</Text>
                    <View style={styles.resultCard}>
                        <Text style={styles.resultText}>Marca: {auto.marca}</Text>
                        <Text style={styles.resultText}>Modelo: {auto.modelo}</Text>
                        <Text style={styles.resultText}>Año: {auto.año}</Text>
                        <Text style={styles.resultText}>Precio: ${auto.precio.toLocaleString()}</Text>
                    </View>
                </View>
            )}

            <View style={styles.listContainer}>
                <Text style={styles.listTitle}>Lista de Autos</Text>
                {loading ? (
                    <ActivityIndicator size="large" color="#2196F3" style={styles.loader} />
                ) : (
                    <FlatList
                        data={autos}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        ListEmptyComponent={() => (
                            <Text style={styles.emptyText}>No hay autos disponibles</Text>
                        )}
                    />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    searchContainer: {
        padding: 16,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
        backgroundColor: 'white',
    },
    searchButton: {
        backgroundColor: '#2196F3',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    resultContainer: {
        padding: 16,
        backgroundColor: 'white',
        marginTop: 16,
    },
    resultTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    resultCard: {
        backgroundColor: '#f8f9fa',
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    resultText: {
        fontSize: 16,
        marginBottom: 4,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
    listTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loader: {
        marginTop: 20,
    },
    emptyText: {
        textAlign: 'center',
        color: '#666',
        marginTop: 20,
    },
});

export default Screen2;
