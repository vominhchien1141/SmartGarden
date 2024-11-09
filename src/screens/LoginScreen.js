import React, {useEffect, useState} from "react";
import {View, Text, FlatList, StatusBar} from "react-native";
import {SafeAreaView, StyleSheet, TextInput, Pressable} from "react-native";
import Colors from "../../theme/Colors";
import {useDispatch} from "react-redux";
import {setIp} from "../redux/authSlice";
import {Alert} from "react-native";

const LoginScreen = ({navigation}) => {
    const [deviceSelected, setDeviceSelected] = useState(null);
    // const [ipInput, setIpInput] = useState('');
    const dispatch = useDispatch();
    const login = () => {
        dispatch(setIp(deviceSelected.ip));
    }
    const [devices, setDevices] = useState([]); 

    useEffect(() => {
        for (let i = 1; i <= 220; i++) {
            try {
                const socket = new WebSocket(`ws://192.168.100.${i}:81`);

                socket.onmessage = (event) => {
                    const json = JSON.parse(event.data);

                    if (json.Name) {
                        setDevices((prev) => {
                            if (!prev.find(device => device.ip === `192.168.100.${i}`)) {
                                return [...prev, {
                                    id: i,
                                    ip: `192.168.100.${i}`,
                                    name: json.Name
                                }];
                            }
                            return prev;
                        });
                    }
                }

                socket.onerror = (error) => {
                    console.log(error);

                    socket.close();
                }
            } catch (error) {
                console.log(error);
            }
        }

    }, [])

    // const handleIpSubmit = () => {
    //     // Validate the IP address (optional)
    //     if (ipInput.trim() !== '') {
    //         console.log(ipInput)
    //         dispatch(setIp(ipInput));
    //     } else {
    //         Alert.alert('Thông báo', 'Vui lòng nhập địa chỉ IP');
    //     }
    // }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background}/>
            <View style={styles.header}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.txtHeader1}>Smart</Text>
                    <Text style={styles.txtHeader2}>Garden</Text>
                </View>
                <Text style={styles.txtHeader3}>Chọn thiết bị</Text>
            </View>
            <View style={styles.body}>
                {/*<View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 10, width: "90%"}}>*/}
                {/*    <TextInput*/}
                {/*        style={[styles.input, {flex: 1, marginRight: 10}]}*/}
                {/*        placeholder="Nhập địa chỉ IP"*/}
                {/*        onChangeText={text => setIpInput(text)}*/}
                {/*        value={ipInput}*/}
                {/*    />*/}
                {/*    <Pressable*/}
                {/*        style={{*/}
                {/*            width: 60,*/}
                {/*            height: 50,*/}
                {/*            backgroundColor: Colors.primary,*/}
                {/*            borderRadius: 10,*/}
                {/*            justifyContent: "center",*/}
                {/*            alignItems: "center",*/}
                {/*        }}*/}
                {/*        onPress={handleIpSubmit}*/}
                {/*    >*/}
                {/*        <Text style={{fontSize: 18, color: "white", fontWeight: "bold"}}>*/}
                {/*            Chọn*/}
                {/*        </Text>*/}
                {/*    </Pressable>*/}
                {/*</View>*/}
                <FlatList
                    showsVerticalScrollIndicator={false}
                    style={{width: "100%"}}
                    data={devices}
                    renderItem={({item}) => (
                        <Pressable
                            onPress={() => {
                                setDeviceSelected(item);
                            }}
                            style={{
                                width: "90%",
                                height: 50,
                                backgroundColor: deviceSelected?.id === item.id ? Colors.primary : Colors.input,
                                borderRadius: 10,
                                justifyContent: "center",
                                alignItems: "center",
                                alignSelf: "center",
                                marginBottom: 10,
                            }}
                        >
                            <Text
                                style={{
                                    fontSize: 22,
                                    color: deviceSelected?.id === item.id ? 'white' : 'black',
                                    fontWeight: "bold"
                                }}
                            >
                                {item.name}
                            </Text>
                        </Pressable>
                    )}
                />
            </View>
            <View style={styles.login}>
                <Pressable
                    onPress={() => {
                        if (deviceSelected) {
                            login();
                        } else {
                            Alert.alert('Thông báo', 'Chưa chọn thiết bị');
                        }
                    }}
                    style={{
                        width: "80%",
                        height: 50,
                        backgroundColor: Colors.primary,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                    }}
                    disabled={!deviceSelected}
                >
                    <Text style={{fontSize: 22, color: "white", fontWeight: "bold"}}>
                        Chọn
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    header: {
        width: "100%",
        height: "20%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    txtHeader1: {
        fontSize: 40,
        fontWeight: "bold",
        color: Colors.primary,
    },
    txtHeader2: {
        fontSize: 40,
        fontWeight: "bold",
    },
    txtHeader3: {
        fontSize: 24,
        fontWeight: "bold",
    },
    body: {
        width: "100%",
        height: "70%",
        justifyContent: "space-around",
        alignItems: "center",
    },
    input: {
        width: "80%",
        height: 50,
        backgroundColor: Colors.input,
        borderRadius: 10,
        paddingLeft: 20,
        fontSize: 16,
        color: "black",
    },
    login: {
        height: "10%",
        justifyContent: "space-around",
        alignItems: "center",
    },
});

export default LoginScreen;
