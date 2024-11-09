import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Platform } from 'react-native';
import { Switch } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import RNPickerSelect from 'react-native-picker-select';
import Colors from '@/theme/Colors';
import { handleSendJson } from "@/src/utils";

const SwitchComponent = ({ title, autoControl, onChange }) => {
    const [dateStart, setDateStart] = useState(() => {
        const now = new Date();
        now.setHours(autoControl.startHour ?? 0);
        now.setMinutes(autoControl.startMin ?? 0);
        return now;
    });
    const [showStart, setShowStart] = useState(false);
    const [isChange, setIsChange] = useState(false);

    const onChangeStart = (event, selectedDate) => {
        if (event.type === 'dismissed') return; // If picker dismissed, do nothing
        if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            setDateStart(selectedDate);
        }
    };

    const handleToggle = () => {
        const newEnabled = !autoControl.enable;
        onChange({
            ...autoControl,
            enable: newEnabled,
            startHour: dateStart.getHours(),
            startMin: dateStart.getMinutes(),
        });
        setIsChange(false); // Reset change state after updating
    };

    const handleDateChange = () => {
        onChange({
            ...autoControl,
            startHour: dateStart.getHours(),
            startMin: dateStart.getMinutes(),
        });
        setIsChange(true);
    };

    useEffect(() => {
        setDateStart(() => {
            const now = new Date();
            now.setHours(autoControl.startHour ?? 0);
            now.setMinutes(autoControl.startMin ?? 0);
            return now;
        });
    }, [autoControl]);

    return (
        <View style={{ padding: 10, marginBottom: 10, backgroundColor: Colors.icon, borderRadius: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 18, color: 'black' }}>{title}</Text>
                <Switch
                    trackColor={{ false: Colors.icon, true: Colors.primary }}
                    thumbColor={autoControl.enable ? Colors.background : Colors.icon}
                    onValueChange={handleToggle}
                    value={autoControl.enable}
                />
            </View>

            {/* Time Picker Section */}
            <View style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Giờ</Text>
                <Pressable onPress={() => setShowStart(true)} style={{ width: '20%', height: 35, backgroundColor: isChange ? 'gray' : 'lightgray', borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginLeft: 10 }} disabled={!isChange}>
                    <Text style={{ color: 'white' }}>
                        {dateStart.getHours()}:{dateStart.getMinutes() < 10 ? '0' + dateStart.getMinutes() : dateStart.getMinutes()}
                    </Text>
                </Pressable>
                {showStart && (
                    <DateTimePicker
                        style={{ width: '90%' }}
                        value={dateStart}
                        mode='time'
                        is24Hour={true}
                        locale="vi"
                        onChange={onChangeStart}
                    />
                )}
            </View>

            {/* Repeat Section */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                <Text style={{ color: 'black', fontSize: 18 }}>Lặp lại</Text>
                <RNPickerSelect
                    useNativeAndroidPickerStyle={false}
                    onValueChange={(value) => onChange({ ...autoControl, repeat: value })}
                    items={options}
                    value={autoControl.repeat !== null ? autoControl.repeat : undefined}
                    disabled={!isChange}
                />
            </View>

            <Pressable onPress={handleDateChange} style={{ width: '100%', height: 40, backgroundColor: Colors.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{isChange ? "Lưu" : "Thay đổi"}</Text>
            </Pressable>
        </View>
    );
};

const options = [
    { label: 'Hằng ngày', value: 0 },
    { label: 'Mỗi chủ nhật', value: 1 },
    { label: 'Mỗi thứ hai', value: 2 },
    { label: 'Mỗi thứ ba', value: 3 },
    { label: 'Mỗi thứ tư', value: 4 },
    { label: 'Mỗi thứ năm', value: 5 },
    { label: 'Mỗi thứ sáu', value: 6 },
    { label: 'Mỗi thứ bảy', value: 7 },
];

export default SwitchComponent;
