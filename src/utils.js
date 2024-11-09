import WebSocketManager from "../app/WebSocketManager";

export const handleSendJson = (json) => {
    WebSocketManager.send(json);
};