import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const DataResult = () => {
    // Sample data
    const data = [12, 19];

    return (
        <View style={styles.container}>
            <View style={styles.chart}>
                <Text style={styles.title}>结果</Text>
                <View style={styles.chartContainer}>
                    {data.map((value, index) => (
                        <View key={index}>
                            <Text style={[styles.barText, { textAlign: 'center' }]}>{value}%</Text>
                            <View style={[styles.bar, { height: value * 10 }]}>
                            </View>
                            <Text style={[styles.barText, { textAlign: 'center' }]}>开心</Text>
                        </View>
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
        backgroundColor: '#b0fbf9',
        top:10,
        marginBottom:10
    },
    title: {
        fontSize: 20,
        marginBottom: 20,
    },
    chart:{
        alignItems: 'center',
        justifyContent: 'center',
    },
    chartContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#93f2f8',
        height: Dimensions.get("screen").height * 0.5
    },
    bar: {
        width: 30,
        backgroundColor: 'blue',
        marginHorizontal: 15,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    barText: {
        color: 'black',
        marginBottom: 5
    },
});

export default DataResult;
