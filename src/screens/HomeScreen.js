import Colors from '@/theme/Colors';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable, SafeAreaView, StatusBar } from 'react-native';
import { Switch } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { resetIp } from '../redux/authSlice';
import WebSocketManager from "@/app/WebSocketManager";
import store from '../redux/store';
import { selectWebSocket } from "@/src/redux/webSocketSlice";
import { handleSendJson } from "@/src/utils";
// import RNPickerSelect from 'react-native-picker-select';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';


const HomeScreen = () => {
    const dispatch = useDispatch();
    const ip = useSelector((state) => state.auth.ip);
    const { state, sprayState, fanState, pumpState, moisture, temperature, humidity, error } = useSelector(selectWebSocket);
    const states = useSelector(selectWebSocket);


    const [daysPlanted, setDaysPlanted] = useState(0);

    const debugFanState = useSelector((state) => state.webSocket.fanState);


    const [selectedValue, setSelectedValue] = useState('');
    const [PlantingDate, setPlantingDate] = useState(null);




    const handleStartPlanting = async () => {
        const currentDate = new Date();
        await AsyncStorage.setItem('PlantingDate', currentDate.toISOString()); // Lưu ngày trồng
        setPlantingDate(currentDate); // Cập nhật lại plantingDate
        const PlantingDate = calculateDaysPlanted(currentDate); // Tính số ngày đã trồng
        handleSendJson({ PlantingDate }); // Gửi số ngày đã trồng qua WebSocket
    };
    const handleResetPlanting = async () => {
        try {
            await AsyncStorage.removeItem('PlantingDate'); // Xóa ngày trồng trong AsyncStorage
            setPlantingDate(null); // Đặt lại ngày trồng về null
            setDaysPlanted(0); // Reset số ngày trồng về 0
        } catch (error) {
            console.error('Error resetting planting date', error);
        }
    };
    const calculateDaysPlanted = (startDate) => {
        const currentDate = new Date();
        const timeDiff = Math.abs(currentDate - startDate);
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Tính số ngày
    };

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
    useEffect(() => {
        WebSocketManager.shouldReconnect = true; // Ensure the flag is set to true when component mounts
        WebSocketManager.connect(`ws://${ip}:81`, store);
        console.log('Connect to WebSocket', ip);

        return () => {
            WebSocketManager.shouldReconnect = false; // Prevent further reconnection attempts
            WebSocketManager.close();
            console.log('WebSocket closed');
        };
    }, [ip]);



    useEffect(() => {
        console.log("Websocket changed")
    }, [state, sprayState, fanState, pumpState, moisture, temperature, humidity, error]);

    const onChangeSwitch = (checked, num) => {
        console.log("Switch changed:", checked, num);  // Kiểm tra xem switch đã nhận sự kiện chưa
        if (num === 1) {
            handleSendJson({ "State": checked });
        } else if (num === 2) {
            handleSendJson({ "FanState": checked })
        } else if (num === 3) {
            handleSendJson({ "SprayState": checked })
        } else if (num === 4) {
            handleSendJson({ "PumpState": checked })
        }
    };

    const date = new Date();
    const dayOfWeek = date.getDay();
    const daysOfWeek = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
    const dayName = daysOfWeek[dayOfWeek];
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatDate = `${dayName}, ${dayOfMonth}/${month}/${year}`;


    const handleLogout = () => {
        dispatch(resetIp());
        WebSocketManager.shouldReconnect = false; // Ensure the flag is set to false
        WebSocketManager.close();
        console.log('Logged out and WebSocket closed');
    };


    const storePlantStartDate = async () => {
        try {
            const currentDate = new Date().toString(); // Lưu ngày hiện tại
            await AsyncStorage.setItem('plantStartDate', currentDate);
        } catch (error) {
            console.error('Error saving plant start date', error);
        }
    };

    const getPlantStartDate = async () => {
        try {
            const storedDate = await AsyncStorage.getItem('plantStartDate');
            if (storedDate !== null) {
                return new Date(storedDate);
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
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'space-between' }}>
                    <View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>SmartGarden</Text>
                        <Text style={{ fontSize: 14 }}>{formatDate}</Text>
                    </View>
                </View>
                <Pressable onPress={handleLogout}>
                    <Image source={require('../../assets/images/logout.png')} style={{ width: 50, height: 50 }} />
                </Pressable>
            </View>
            <View style={styles.content}>
                <View style={styles.weather}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>{temperature}°C</Text>
                            <Text style={{ fontSize: 10, color: 'white', marginTop: -5 }}> Nhiệt độ</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{
                            }}>
                                <Picker
                                    selectedValue={selectedValue}
                                    onValueChange={(itemValue) => setSelectedValue(itemValue)}
                                    style={{ width: 150, height: 40, borderRadius: 10, padding: 10 }}
                                >
                                    <Picker.Item label="Chọn loại cây" value="" />
                                    <Picker.Item label="Xà lách" value="xalach" />
                                    <Picker.Item label="Cà chua" value="cachua" />
                                    <Picker.Item label="Cải mầm" value="caimam" />
                                </Picker>
                            </View>
                            <View style={{
                                width: 40,
                                height: 40,
                                marginLeft: 5,
                                borderRadius: 10,
                                backgroundColor: 'white',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/icons/plus.png')} style={{ width: 16, height: 16 }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ height: 0.5, borderWidth: 1, borderColor: "black", borderStyle: 'solid' }} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View>
                            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>{humidity}%</Text>
                            <Text style={{ fontSize: 10, color: 'white', marginTop: 5 }}>Độ ẩm</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>{moisture}%</Text>
                            <Text style={{ fontSize: 10, color: 'white', marginTop: 5 }}>Độ ẩm đất</Text>
                        </View>

                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Pressable onPress={handleStartPlanting} style={{ width: 100, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Bắt đầu</Text>
                        </Pressable>
                        <Pressable onPress={handleResetPlanting} style={{ width: 100, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', borderRadius: 10, marginLeft: -20 }}>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Xóa ngày</Text>
                        </Pressable>
                        <View>
                            <Text style={{ fontSize: 26, fontWeight: 'bold', color: 'white' }}>
                                {PlantingDate ? calculateDaysPlanted(PlantingDate) : 0} ngày
                            </Text>
                            <Text style={{ fontSize: 10, color: 'white', marginTop: 5 }}>Số ngày đã trồng</Text>
                        </View>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.action}>
                <View style={[styles.itemAction, {
                    backgroundColor: state ? Colors.weatherActive : Colors.weather

                }]}>
                    <View>
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: Colors.iconActive,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../../assets/images/denRoi.png')} style={{ width: 28, height: 28 }} />
                        </View>
                        <Text style={{ color: state ? 'white' : 'black', fontSize: 16, fontWeight: 'bold' }}>Ánh
                            sáng</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ color: state ? 'white' : 'black', fontSize: 12, fontWeight: 'bold' }}>
                            {state ? 'Tắt' : 'Bật'}
                        </Text>
                        <Switch color={Colors.primary} value={state} onValueChange={
                            (checked) => onChangeSwitch(checked, 1)
                        } />
                    </View>
                </View>
                <View style={[styles.itemAction, {
                    backgroundColor: fanState ? Colors.weatherActive : Colors.weather

                }]}>
                    <View>
                        <View style={{
                            width: 50,
                            height: 50,
                            backgroundColor: Colors.iconActive,
                            borderRadius: 25,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Image source={require('../../assets/images/khoi.png')} style={{ width: 28, height: 28 }} />
                        </View>
                        <Text style={{
                            color: fanState ? 'white' : 'black',
                            fontSize: 16,
                            fontWeight: 'bold'
                        }}>Quạt</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ color: fanState ? 'white' : 'black', fontSize: 12, fontWeight: 'bold' }}>
                            {fanState ? 'Tắt' : 'Bật'}
                        </Text>
                        <Switch color={Colors.primary} value={fanState} onValueChange={
                            (checked) => onChangeSwitch(checked, 2)
                        } />
                    </View>
                </View>
                <View style={[styles.itemAction, {
                    backgroundColor: sprayState ? Colors.weatherActive : Colors.weather

                }]}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                backgroundColor: Colors.iconActive,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/images/phunSuong.png')}
                                    style={{ width: 28, height: 28 }} />
                            </View>
                            <Text style={{
                                color: sprayState ? 'white' : 'black',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>{humidity}%</Text>
                        </View>
                        <Text style={{ color: sprayState ? 'white' : 'black', fontSize: 16, fontWeight: 'bold' }}>Phun
                            sương</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ color: sprayState ? 'white' : 'black', fontSize: 12, fontWeight: 'bold' }}>
                            {sprayState ? 'Tắt' : 'Bật'}
                        </Text>
                        <Switch color={Colors.primary} value={sprayState} onValueChange={
                            (checked) => onChangeSwitch(checked, 3)
                        } />
                    </View>
                </View>
                <View style={[styles.itemAction, {
                    backgroundColor: pumpState ? Colors.weatherActive : Colors.weather

                }]}>
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{
                                width: 50,
                                height: 50,
                                backgroundColor: Colors.iconActive,
                                borderRadius: 25,
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Image source={require('../../assets/images/phunSuong.png')}
                                    style={{ width: 28, height: 28 }} />
                            </View>
                            <Text style={{
                                color: pumpState ? 'white' : 'black',
                                fontSize: 20,
                                fontWeight: 'bold'
                            }}>{moisture}%</Text>
                        </View>
                        <Text style={{ color: pumpState ? 'white' : 'black', fontSize: 16, fontWeight: 'bold' }}>Bơm</Text>
                    </View>
                    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ color: pumpState ? 'white' : 'black', fontSize: 12, fontWeight: 'bold' }}>
                            {pumpState ? 'Tắt' : 'Bật'}
                        </Text>
                        <Switch color={Colors.primary} value={pumpState} onValueChange={
                            (checked) => onChangeSwitch(checked, 4)
                        } />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const options = [
    { label: 'Hằng ngày', value: 0 },
    { label: 'Mỗi chủ nhật', value: 1 },
    { label: 'Mỗi thứ hai', value: 2 },

]
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background
    },
    header: {
        width: '100%',
        height: '10%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    content: {
        width: '100%',
        height: '50%',
        padding: 20
    },
    weather: {
        width: '100%',
        height: '100%',
        backgroundColor: Colors.primary,
        borderRadius: 15,
        padding: 15,
        justifyContent: 'space-between'
    },
    action: {
        width: '100%',
        height: 350,
        flexDirection: 'row',
        flexWrap: 'wrap',

    },
    itemAction: {
        width: "40%",
        height: 140,
        marginLeft: 25,
        marginBottom: 10,
        borderRadius: 15,
        padding: 10,
        justifyContent: 'space-between'
    }
});

export default HomeScreen;
