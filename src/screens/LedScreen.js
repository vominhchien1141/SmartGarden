import Colors from '@/theme/Colors';
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StatusBar, StyleSheet } from 'react-native';
import SwitchComponent from './SwitchComponent'; // Import SwitchComponent
import { handleSendJson } from "@/src/utils";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LedScreen = () => {


    const currentDate = new Date();
    const [PlantingDate, setPlantingDate] = useState(null);
    const [daysPlanted, setDaysPlanted] = useState(0);

    
    const [autoControls, setAutoControls] = useState([
        { enable: false, startHour: 19, startMin: 10, repeat: 0 }, // Sáng
        { enable: false, startHour: 12, startMin: 0, repeat: 0 }, // Trưa
        { enable: false, startHour: 18, startMin: 0, repeat: 0 }, // Chiều
    ]);

    const getStoredPlantingDate = async () => {
        try {
            4
            const storedDate = await AsyncStorage.getItem('PlantingDate');
            if (storedDate) {
                const date = new Date(storedDate);
                setPlantingDate(date); // Chuyển chuỗi về đối tượng Date
            }
        } catch (error) {
            console.error('Error retrieving planting date', error);
        }
    };

    useEffect(() => {
        getStoredPlantingDate(); // Lấy ngày trồng đã lưu
    }, []);

    const updateAutoControl = (index, newSettings) => {

        const updatedControls = [...autoControls];
        updatedControls[index] = newSettings;
        setAutoControls(updatedControls);
        const PlantingDate = calculateDaysPlanted(currentDate); // Tính số ngày đã trồng
      
        setPlantingDate(currentDate); // Cập nhật lại plantingDate
        // Send updated state to the WebSocket
        handleSendJson({ autoControl: updatedControls, PlantingDate });
    };
    const calculateDaysPlanted = (startDate) => {
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate - startDate);
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Tính số ngày
    };
    const storePlantStartDate = async () => {
        try {
            const currentDate = new Date().toISOString(); // Lưu ngày dưới dạng ISO
            await AsyncStorage.setItem('plantStartDate', currentDate);     
        } catch (error) {
            console.error('Error saving plant start date', error);
        }
    };
    
    const getPlantStartDate = async () => {
        try {
            const storedDate = await AsyncStorage.getItem('plantStartDate');
            if (storedDate !== null) {
                return new Date(storedDate); // Chuyển chuỗi về đối tượng Date
            }
        } catch (error) {
            console.error('Error retrieving plant start date', error);
        }
        return null;
    };
    


    useEffect(() => {
        const fetchPlantStartDate = async () => {
            const startDate = await getPlantStartDate();
            if (startDate) {
                const days = calculateDaysPlanted(startDate);
                setDaysPlanted(days);
            }
        };
        fetchPlantStartDate();
    }, []);
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background} />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.txtHeader}>Tự động hóa</Text>
                </View>

                <View style={styles.footer}>
                    {autoControls.map((control, index) => (
                        <SwitchComponent
                            key={index}
                            title={index === 0 ? "Sáng" : index === 1 ? "Trưa" : "Chiều"}
                            autoControl={control}
                            onChange={(newSettings) => updateAutoControl(index, newSettings)}
                        />
                    ))}
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        width: '100%',
        height: '10%',
        justifyContent: 'center',
        paddingLeft: 20,
    },
    txtHeader: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
        marginTop: 10,
    },
    footer: {
        width: '100%',
        height: '40%',
        padding: 20,
        justifyContent: 'space-around',
    },
});

export default LedScreen;
