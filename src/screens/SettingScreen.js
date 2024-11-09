import React, {useEffect, useState} from "react";
import {View, Text, StatusBar} from "react-native";
import {StyleSheet, TextInput, Pressable} from "react-native";
import Colors from "../../theme/Colors";
import {useSelector} from "react-redux";
import {selectWebSocket} from "@/src/redux/webSocketSlice";
import WebSocketManager from "@/app/WebSocketManager";
import {Alert} from "react-native";
import {handleSendJson} from "@/src/utils";

const SettingScreen = ({navigation}) => {
    const {name, wifi} = useSelector(selectWebSocket);

    const [isUpdate, setIsUpdate] = useState(false);
    const [deviceName, setDeviceName] = useState(name || "");
    const [ssid, setSsid] = useState(wifi?.SSID || "");
    const [password, setPassword] = useState(wifi?.Password || "");

    const handleSubmit = () => {
        const json = {
            Name: deviceName,
            Wifi: {
                SSID: ssid,
                Password: password,
            },
        };
        handleSendJson(json);
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={Colors.background}/>
            <View style={styles.header}>
                <View style={{flexDirection: "row"}}>
                    <Text style={styles.txtHeader1}>Smart</Text>
                    <Text style={styles.txtHeader2}>Garden</Text>
                </View>
                <Text style={styles.txtHeader3}>Đổi thông tin</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.containerInput}>
                    <Text style={styles.titleInput}>
                        Tên thiết bị
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={deviceName}
                        onChangeText={setDeviceName}
                        placeholder="Tên thiết bị"
                        editable={isUpdate}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.titleInput}>
                        Tên Wifi
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={ssid}
                        onChangeText={setSsid}
                        placeholder="Tên Wifi"
                        editable={isUpdate}
                    />
                </View>
                <View style={styles.containerInput}>
                    <Text style={styles.titleInput}>
                        Mật khẩu
                    </Text>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        placeholder="Mật khẩu"
                        editable={isUpdate}
                    />
                </View>
            </View>
            <View style={styles.login}>
                <Pressable
                    onPress={() => {
                        if (isUpdate) {
                            setIsUpdate(false);
                            handleSubmit();
                            Alert.alert("Thông báo", "Cập nhật thành công");
                        } else {
                            setIsUpdate(true);
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
                >
                    <Text style={{fontSize: 22, color: "white", fontWeight: "bold"}}>
                        {isUpdate ? "Xác nhận" : "Thay đổi"}
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
    },
    containerInput: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },
    titleInput: {
        fontSize: 16,
        fontWeight: "regular",
        alignSelf: "flex-start",
        marginLeft: "10%",
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

export default SettingScreen;
