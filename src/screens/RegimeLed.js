import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, StatusBar } from 'react-native';
import Colors from '@/theme/Colors';
import RNPickerSelect from 'react-native-picker-select';
import Slider from '@react-native-community/slider';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


const RegimeLed = ({ navigation }) => {
  const [mode, setMode] = useState(-1);
  const [brightness, setBrightness] = useState(50);
  const [speed, setSpeed] = useState(50);


  const handleMode = (currentMode) => {
    setMode(currentMode);
  }

  const handleBrightness = (currentBrightness) => {
    setBrightness(currentBrightness);
  }

  const handleSpeed = (currentSpeed) => {
    setSpeed(currentSpeed);
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.background}/>
      <View style={styles.header}>
        <Text style={styles.txtHeader}>Chế độ đèn RGB</Text>
      </View>
      <View style={styles.body}>
        <RNPickerSelect
        fixAndroidTouchableBug={true}
        darkTheme={true}
        useNativeAndroidPickerStyle={false}
          style={{
            inputAndroid: { color: 'black', fontSize: 28, fontWeight: 'bold', alignSelf: 'center' },
            inputIOS: { color: 'black', fontSize: 28, fontWeight: 'bold', alignSelf: 'center' },
          }}
          placeholder={{ label: 'Chọn chế độ', value: -1 }}
          onValueChange={(value) => {
            handleMode(value);
          }}
          items={options}
        />
      </View>
      <View style={{ width: '100%', height: '10%', flexDirection: 'row', padding: 20 }}>
        <Pressable>
          <FontAwesome name="minus" size={24} color="black" style={{ paddingRight: 10 }} />
        </Pressable>
        <Slider
          value={50}
          style={{ width: '80%', height: 30, marginTop: 10, paddingBottom: 35 }}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor={Colors.icon}
          maximumTrackTintColor={Colors.icon}
          onValueChange={(value) => handleSpeed(value)}
        />
        <Pressable>
          <FontAwesome name="plus" size={28} color="black" style={{ paddingLeft: 10 }} />
        </Pressable>
      </View>

      <View style={{ width: '100%', height: '15%', flexDirection: 'row', padding: 20 }}>
        <Pressable>
          <MaterialCommunityIcons name="lightbulb-off-outline" size={28} color="black" />
        </Pressable>
        <Slider
          value={50}
          style={{ width: '80%', height: 30, marginTop: 10, paddingBottom: 35 }}
          minimumValue={1}
          maximumValue={100}
          minimumTrackTintColor={Colors.icon}
          maximumTrackTintColor={Colors.icon}
          onValueChange={(value) => handleBrightness(value)}
        />
        <Pressable>
          <MaterialCommunityIcons name="lightbulb-on-outline" size={28} color="black" style={{ paddingLeft: 10 }} />
        </Pressable>
      </View>


      <View style={{ width: '100%', height: '15%', flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={{ width: '100%', height: 50, backgroundColor: Colors.icon, borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'black', fontSize: 20, fontWeight: 'bold' }}>Quay lại</Text>
        </Pressable>
      </View>
    </View >
  );
}

const options = [
  { label: 'Đỏ nhấp nháy', value: 1 },
  { label: 'Xanh lá nhấp nháy', value: 2 },
  { label: 'Xanh dương nhấp nháy', value: 3 },
  { label: 'Vàng nhấp nháy', value: 4 },
  { label: 'Hồng nhấp nháy', value: 5 },
  { label: 'Xanh lam nhấp nháy', value: 6 },
  { label: 'Trắng nhấp nháy', value: 7 },
  { label: 'Đen nhấp nháy', value: 8 },
  { label: 'Cam nhấp nháy', value: 9 },
  { label: 'Tím nhấp nháy', value: 10 },
  { label: 'Đỏ chuyển dần', value: 11 },
  { label: 'Xanh lá chuyển dần', value: 12 },
  { label: 'Xanh dương chuyển dần', value: 13 },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between'
  },
  header: {
    width: '100%',
    height: '10%',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  body: {
    width: '100%',
    height: '30%',
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
    width: 190,
    height: 190,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: Colors.icon,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

const colors = [
  { color: '#FF0000', name: 'Đỏ' },
  { color: '#00FF00', name: 'Xanh lá' },
  { color: '#0000FF', name: 'Xanh dương' },
  { color: '#FFFF00', name: 'Vàng' },
  { color: '#FF00FF', name: 'Hồng' },
  { color: '#00FFFF', name: 'Xanh lam' },
  { color: '#FFFFFF', name: 'Trắng' },
  { color: '#000000', name: 'Đen' },
  { color: '#FFA500', name: 'Cam' },
  { color: '#800080', name: 'Tím' }
]

export default RegimeLed;
