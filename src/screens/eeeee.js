<View style={[styles.itemAction, {
    backgroundColor: PumpState ? Colors.weatherActive : Colors.weather

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
        <Text style={{ color: PumpState ? 'white' : 'black', fontSize: 16, fontWeight: 'bold' }}>Ánh
            sáng</Text>
    </View>
    <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
        <Text style={{ color: PumpState ? 'white' : 'black', fontSize: 12, fontWeight: 'bold' }}>
            {PumpState ? 'Tắt' : 'Bật'}
        </Text>
        <Switch color={Colors.primary} value={PumpState} onValueChange={
            (checked) => onChangeSwitch(checked, 4)
        } />
    </View>
</View>