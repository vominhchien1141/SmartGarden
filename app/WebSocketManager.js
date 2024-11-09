import {
    closeSocket,
    setHumidity, setLightControl,
    setMoisture, setName, setSprayControl,
    setSprayState, setFanState, setPumpState,
    setState,
    setTemperature, setWifi
} from "@/src/redux/webSocketSlice";

class WebSocketManager {
    constructor() {
        this.socket = null;
        this.url = null;
        this.store = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 10; // You can adjust this as needed
        this.shouldReconnect = true; // Flag to control reconnection
    }

    connect(url, store) {
        if (!this.shouldReconnect) {
            console.log('Connection attempt prevented by shouldReconnect flag.');
            return;
        }

        this.url = url;
        this.store = store;
        this.socket = new WebSocket(url);

        this.socket.onopen = () => {
            console.log('WebSocket connection opened');
            this.reconnectAttempts = 0; // Reset reconnect attempts on successful connection
        };

        this.socket.onmessage = (event) => {
            const json = JSON.parse(event.data);
            console.log(json)
            const {
                Name,
                Wifi,
                Moisture,
                Temperature,
                Humidity,
                State,
                FanState,
                SprayState,
                PumpState,
                lightControl,
                sprayControl,
                Colour
            } = json;

            if (Name !== undefined) {
                store.dispatch(setName(Name));
            }
            if (Wifi !== undefined) {
                store.dispatch(setWifi(Wifi));
            }
            if (Moisture !== undefined) {
                store.dispatch(setMoisture(Moisture));
            }
            if (Temperature !== undefined) {
                store.dispatch(setTemperature(Temperature[0].y));
            }
            if (Humidity !== undefined) {
                store.dispatch(setHumidity(Humidity[0].y));
            }
            if (State !== undefined) {
                store.dispatch(setState(State));
            }
            if (FanState !== undefined) {
                store.dispatch(setFanState(FanState));
            }
            if (PumpState !== undefined) {
                store.dispatch(setPumpState(PumpState));
            }
            if (SprayState !== undefined) {
                store.dispatch(setSprayState(SprayState));
            }
            if (lightControl !== undefined) {
                store.dispatch(setLightControl(lightControl));
            }
            if (sprayControl !== undefined) {
                store.dispatch(setSprayControl(sprayControl));
            }
            if (Colour !== undefined) {
                store.dispatch({type: 'webSocket/setColour', payload: Colour});
            }
        };


        this.socket.onerror = (error) => {
            console.error('WebSocket Error: ', error);
            store.dispatch({type: 'webSocket/setError', payload: {message: error.message, isTrusted: error.isTrusted}});
        };

        this.socket.onclose = (event) => {
            console.log('WebSocket connection closed: ', event);
            store.dispatch({type: 'webSocket/closeSocket'});

            if (this.shouldReconnect && this.reconnectAttempts < this.maxReconnectAttempts) {
                setTimeout(() => this.reconnect(), this.getReconnectDelay());
            }
        };
    }

    reconnect() {
        if (this.shouldReconnect) {
            this.reconnectAttempts += 1;
            console.log(`Attempting to reconnect... (${this.reconnectAttempts})`);
            this.connect(this.url, this.store);
        } else {
            console.log('Reconnection attempt prevented by shouldReconnect flag.');
        }
    }

    getReconnectDelay() {
        return Math.min(1000 * (2 ** this.reconnectAttempts), 30000); // Exponential backoff up to 30 seconds
    }

    send(json) {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) {
            this.socket.send(JSON.stringify(json));
        } else {
            console.error('WebSocket is not open');
        }
    }

    close() {
        this.shouldReconnect = false; // Prevent further reconnection attempts
        if (this.socket) {
            this.socket.close();
            this.socket = null;
            closeSocket();
        }
    }
}

const webSocketManager = new WebSocketManager();
export default webSocketManager;
