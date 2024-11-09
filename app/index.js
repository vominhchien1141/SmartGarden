import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from '../src/navigation/MainNavigation';
import {Provider, useDispatch} from 'react-redux';
import store from '../src/redux/store';
import 'react-native-reanimated';
import WebSocketManager from "@/app/WebSocketManager";
import {useEffect} from "react";

export default function Index() {

    return (
        <Provider store={store}>
            <NavigationContainer independent={true}>
                <MainNavigation />
            </NavigationContainer>
        </Provider>
    );
}
