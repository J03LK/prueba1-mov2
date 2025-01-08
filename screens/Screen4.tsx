import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import datos from '../assets/data/series.json'; 
import Tarjeta2 from '../components/tarjeta'; 
export default function Screen4() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Series</Text>
            <FlatList
                data={datos.series}
                renderItem={({ item }) => <Tarjeta2 informacion={item} />}
                keyExtractor={(item) => item.titulo}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});
