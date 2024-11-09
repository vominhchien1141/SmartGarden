import Colors from '@/theme/Colors';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable, Platform, StatusBar, ScrollView} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import {handleSendJson} from "@/src/utils";
import {useSelector} from "react-redux";
import {selectWebSocket} from "@/src/redux/webSocketSlice";
import {Switch} from "react-native-paper";

const BulbScreen = () => {
    const {lightControl, state} = useSelector(selectWebSocket);

    
    const [auto, setAuto] = useState(!!lightControl.enable);
    const [turnOnLed, setTurnOnLed] = useState(state);
    const [dateStart, setDateStart] = useState(() => {
        const now = new Date();
        now.setHours(lightControl.startHour);
        now.setMinutes(lightControl.startMin);
        return now;
    });
    const [dateEnd, setDateEnd] = useState(() => {
        const now = new Date();
        now.setHours(lightControl.stopHour);
        now.setMinutes(lightControl.stopMin);
        return now;
    });
    const [mode, setMode] = useState(lightControl.repeat);
    const [showStart, setShowStart] = useState(false);
    const [showEnd, setShowEnd] = useState(false);
    const [isChange, setIsChange] = useState(false);

    useEffect(() => {
        setTurnOnLed(state);
        setDateStart(() => {
            const now = new Date();
            now.setHours(lightControl.startHour);
            now.setMinutes(lightControl.startMin);
            return now;
        });
        setDateEnd(() => {
            const now = new Date();
            now.setHours(lightControl.stopHour);
            now.setMinutes(lightControl.stopMin);
            return now;
        });
        setMode(lightControl.repeat);
    }, [lightControl, state]);

    const onChangeStart = (event, selectedDate) => {
        const currentDate = selectedDate || dateStart;
        setDateStart(currentDate);
        setDateEnd(currentDate);
    }
    const onChangeEnd = (event, selectedDate) => {
        const currentDate = selectedDate || dateEnd;
        setDateEnd(currentDate);
    }

    const handlleStart = () => {
        if (isChange) {
            const data = {
                "lightControl": {
                    "startHour": dateStart.getHours(),
                    "startMin": dateStart.getMinutes(),
                    "stopHour": dateEnd.getHours(),
                    "stopMin": dateEnd.getMinutes(),
                    "repeat": mode
                }
            };

            handleSendJson(data);
            setIsChange(false);
        } else {
            setIsChange(true);
        }
    }

    const handleMode = (currentMode) => {
        setMode(currentMode);
    }

    const handleChangeAuto = () => {
        setAuto(!auto);
        const data = {
            "lightControl": {
                "enable": auto ? 0 : 1
            }
        }
        handleSendJson(data);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background}/>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.header}>
                    <Text style={styles.txtHeader}>Đèn chiếu sáng</Text>
                </View>
                <View style={styles.imgBody}>
                    <Pressable
                        style={turnOnLed ? {
                            borderColor: "rgba(0, 196, 82, 1)",
                            ...styles.circleImg
                        } : {
                            borderColor: "rgba(0, 0, 0, 0.06)",
                            ...styles.circleImg
                        }}
                        onPress={() => {
                            handleSendJson({"State": !turnOnLed});
                            setTurnOnLed(!turnOnLed);
                        }}
                    >
                        <Image source={require('../../assets/images/bulbImg.png')} style={{width: 100, height: 100}}/>
                    </Pressable>
                </View>
                <View style={styles.footer}>
                    
                    <View style={{width: "100%", height: 160, backgroundColor: Colors.icon, borderRadius: 20, padding: 10, marginTop:'10px'}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={{color: 'black', fontSize: 20, fontWeight: 'bold'}}>Hẹn giờ kiểm tra</Text>
                            <Switch color={Colors.primary} value={auto} onValueChange={handleChangeAuto}/>
                        </View>
                        <View style={{marginVertical: 10, flexDirection: 'row', alignItems: 'center'}}>
                            <Text style={{color: 'black', fontSize: 18}}>Giờ</Text>
                            {Platform.OS === 'ios' ?
                                <DateTimePicker
                                    style={{width: '90%'}}
                                    value={dateStart}
                                    mode='time'
                                    is24Hour={true}
                                    locale="vi"
                                    onChange={(event, selectedDate) => onChangeStart(event, selectedDate)}
                                    disabled={!isChange}
                                /> :
                                <Pressable onPress={() => setShowStart(true)}
                                           style={{
                                               width: '20%',
                                               height: 35,
                                               backgroundColor: isChange ? 'gray' : 'lightgray',
                                               borderRadius: 10,
                                               justifyContent: 'center',
                                               alignItems: 'center',
                                               position: 'absolute',
                                               left: '80%',
                                               bottom: -5
                                           }}
                                           disabled={!isChange}
                                >
                                    <Text style={{color: 'white'}}>
                                        {dateStart.getHours()}:{dateStart.getMinutes() < 10 ? '0' + dateStart.getMinutes() : dateStart.getMinutes()}
                                    </Text>
                                </Pressable>
                            }
                            {Platform.OS !== 'ios' && showStart &&
                                <DateTimePicker
                                    style={{width: '90%'}}
                                    value={dateStart}
                                    mode='time'
                                    display='spinner'
                                    is24Hour={true}
                                    locale="vi"
                                    onChange={(event, selectedDate) => {
                                        onChangeStart(event, selectedDate);
                                        setShowStart(false);
                                    }}
                                />
                            }
                        </View>
                        
                        
                        <View style={[{flexDirection: 'row', justifyContent: 'space-between'},
                            Platform.OS === 'ios' ? {marginVertical: 15} : {marginVertical: 30}
                        ]}>
                            <Text style={{color: 'black', fontSize: 18}}>Lặp lại</Text>
                            <RNPickerSelect
                                useNativeAndroidPickerStyle={false}
                                onValueChange={(value) => {
                                    handleMode(value);
                                }}
                                items={options}
                                value={mode}
                                disabled={!isChange}
                            />
                        </View>
                    </View>
                    <Pressable
                        onPress={handlleStart}
                        style={{
                            width: '100%',
                            height: 50,
                            backgroundColor: Colors.primary,
                            borderRadius: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: 20
                        }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 20,
                            fontWeight: 'bold'
                        }}>{isChange ? "Lưu" : "Thay đổi"}</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

const options = [
    {label: 'Hằng ngày', value: 0},
    {label: 'Mỗi chủ nhật', value: 1},
    {label: 'Mỗi thứ hai', value: 2},
    {label: 'Mỗi thứ ba', value: 3},
    {label: 'Mỗi thứ tư', value: 4},
    {label: 'Mỗi thứ năm', value: 5},
    {label: 'Mỗi thứ sáu', value: 6},
    {label: 'Mỗi thứ bảy', value: 7},
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 20, // add some padding if necessary
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
    circleImg: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgBody: {
        width: '100%',
        height: '40%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        width: '100%',
        height: '40%',
        padding: 20,
        justifyContent: 'space-around'
    }
});

export default BulbScreen;
