import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

interface series {
    titulo: string;
    anio: number;
    descripcion: string;
    info: {
        url: string;
        trailer: string;
        imagen: string;
    };
    metadata: {
        temporadas: number;
        creador: string;
    };
}

export default function Tarjeta2({ informacion }: { informacion: series }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{informacion.titulo}</Text>
            <View style={styles.fila}>
                <Image
                    style={styles.img}
                    source={{ uri: informacion.info.imagen }}
                />
                <View style={styles.mediaInfo}>
                    <Text style={styles.label}>Trailer: <Text style={styles.value}>{informacion.info.trailer}</Text></Text>
                </View>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Descripción: <Text style={styles.value}>{informacion.descripcion}</Text></Text>
                <Text style={styles.label}>Año: <Text style={styles.value}>{informacion.anio}</Text></Text>
                <Text style={styles.label}>Temporadas: <Text style={styles.value}>{informacion.metadata.temporadas}</Text></Text>
                <Text style={styles.label}>Creador: <Text style={styles.value}>{informacion.metadata.creador}</Text></Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#d3d3d3', // Fondo más claro
        margin: 10,
        borderRadius: 20,
        padding: 15,
        shadowColor: 'red', // Color de sombra rojo
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.5,
        shadowRadius: 10,
        elevation: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center', // Título centrado
    },
    img: {
        height: 150,
        width: 150,
        resizeMode: 'contain',
        borderRadius: 10,
    },
    fila: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    mediaInfo: {
        flex: 1,
        marginLeft: 10,
    },
    label: {
        fontSize: 14,
        fontWeight: 'bold', // Texto más oscuro
        color: '#333',
    },
    value: {
        fontSize: 14,
        color: '#666', // Texto más claro
    },
    infoContainer: {
        marginTop: 10,
    },
});

