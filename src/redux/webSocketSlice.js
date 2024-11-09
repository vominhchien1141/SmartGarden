// src/redux/webSocketSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: '',
    wifi: {},
    state: false,
    sprayState: false,
    fanState: false,
    pumpState: false,
    moisture: 0,
    temperature: 0,
    humidity: 0,
    lightControl: {
        enable: 1,
        startHour: 0,
        startMin: 0,
        stopHour: 0,
        stopMin: 0,
        repeat: 0
    },
    sprayControl: {
        enable: 1,
        startHour: 0,
        startMin: 0,
        stopHour: 0,
        stopMin: 0,
        repeat: 0
    },
    Colour: {
        Red: 0,
        Green: 0,
        Blue: 0,
    },
    PlantingDate: 0,
    autoControl: [
        {
            enable: 1,
            startHour: 0,
            startMin: 0,

            repeat: 0
        },
        {
            enable: 1,
            startHour: 0,
            startMin: 0,

            repeat: 0
        },
        {
            enable: 1,
            startHour: 0,
            startMin: 0,

            repeat: 0
        }


    ],





    error: null,
};

const webSocketSlice = createSlice({
    name: 'webSocket',
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        setWifi: (state, action) => {
            state.wifi = action.payload;
        },
        setMoisture: (state, action) => {
            state.moisture = action.payload;
        },
        setTemperature: (state, action) => {
            state.temperature = action.payload;
        },
        setHumidity: (state, action) => {
            state.humidity = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        setState: (state, action) => {
            state.state = action.payload;
        },
        setSprayState: (state, action) => {
            state.sprayState = action.payload;
        },
        setFanState: (state, action) => {
            state.fanState = action.payload;
        },
        setPumpState: (state, action) => {
            state.pumpState = action.payload;
        },
        setLightControl: (state, action) => {
            state.lightControl = action.payload;
        },
        setSprayControl: (state, action) => {
            state.sprayControl = action.payload;
        },
        setColour: (state, action) => {
            state.Colour = action.payload;
        },
        setAutoControl: (state, action) => {
            state.autoControl = action.payload;
        },
        setPlantingDate: (state, action) => {
            state.PlantingDate = action.payload;
        },
        closeSocket: (state) => {
            state.state = false;
            state.sprayState = false;
            state.fanState = false;
            state.pumpState = false;
            state.moisture = 0;
            state.temperature = 0;
            state.humidity = 0;
            state.error = null;
        },
    },
});


export const {
    setName,
    setWifi,
    setMoisture,
    setTemperature,
    setHumidity,
    setError,
    setState,
    setSprayState,
    setFanState,
    setPumpState,
    setLightControl,
    setSprayControl,
    setColour,
    setAutoControl,
    setPlantingDate, // Thêm reducer cho autoControl
    closeSocket,
} = webSocketSlice.actions;

export const selectWebSocket = (state) => state.webSocket;

export default webSocketSlice.reducer;
