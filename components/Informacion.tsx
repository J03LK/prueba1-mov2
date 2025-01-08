// components/Informacion.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Auto } from '../types/types';

interface InformacionProps {
    item: Auto;
    onPress: () => void;
}

const Informacion: React.FC<InformacionProps> = ({ item, onPress }) => {
    return (
        <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
            <View>
                <Text style={styles.titleText}>{item.marca} - {item.modelo}</Text>
                <Text style={styles.detailText}>Año: {item.año}</Text>
                <Text style={styles.priceText}>Precio: ${item.precio.toLocaleString()}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    titleText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    detailText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 4,
    },
    priceText: {
        fontSize: 16,
        color: '#2196F3',
        fontWeight: 'bold',
    },
});

export default Informacion;
