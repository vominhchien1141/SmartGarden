import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, TextInput, Pressable, Platform, ActivityIndicator, StatusBar } from 'react-native';
import Colors from '../../theme/Colors';


const SplashScreen = () => {
    console.log('SplashScreen')
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background}/>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.txtHeader1}>Smart</Text>
                    <Text style={styles.txtHeader2}>Garden</Text>
                </View>
            </View>
            <View style={styles.body}>
                <ActivityIndicator size="large" color={Colors.primary} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        width: '100%',
        height: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    txtHeader1: {
        fontSize: 40,
        fontWeight: 'bold',
        color: Colors.primary,
    },
    txtHeader2: {
        fontSize: 40,
        fontWeight: 'bold',
    },
    txtHeader3: {
        fontSize: 32,
        fontWeight: 'bold',
    },
    body: {
        width: '100%',
        height: '30%',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    input: {
        width: '80%',
        height: 50,
        backgroundColor: Colors.input,
        borderRadius: 10,
        paddingLeft: 20,
        fontSize: 16,
        color: 'black',
    },
    login: {
        height: '40%',
        justifyContent: 'space-around',
        alignItems: 'center',
    }

})


export default SplashScreen;
