import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import BulbScreen from '../screens/BulbScreen';
import RgbNavigation from './RgbNavigation';
import DewScreen from '../screens/DewScreen';
import {Image, View} from 'react-native';
import Colors from '@/theme/Colors';
import SettingScreen from "@/src/screens/SettingScreen";

const Tab = createBottomTabNavigator();

const TabNavigation = () => {
    return (
        <Tab.Navigator initialRouteName='Home'
                       screenOptions={{
                           headerShown: false,
                           tabBarStyle: {
                               height: 60,
                               paddingBottom: 0,
                               borderTopWidth: 1,
                           }

                       }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        if (focused) {
                            return (
                                <View style={{
                                    height: 5,
                                    width: '60%',
                                    backgroundColor: Colors.primary,
                                    borderRadius: 10
                                }}/>
                            );
                        }
                        return null;
                    },
                    tabBarIcon: ({focused}) => {
                        return (
                            focused ? (
                                <Image source={require('../../assets/icons/Home.png')} style={{width: 20, height: 20}}/>
                            ) : (
                                <Image source={require('../../assets/icons/Home.png')} style={{width: 20, height: 20}}/>
                            )
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Bulb"
                component={BulbScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        if (focused) {
                            return (
                                <View style={{
                                    height: 5,
                                    width: '60%',
                                    backgroundColor: Colors.primary,
                                    borderRadius: 10
                                }}/>
                            );
                        }
                        return null;
                    },
                    tabBarIcon: ({focused}) => {
                        return (
                            focused ? (
                                <Image source={require('../../assets/icons/Bulb.png')} style={{width: 20, height: 20}}/>
                            ) : (
                                <Image source={require('../../assets/icons/Bulb.png')} style={{width: 20, height: 20}}/>
                            )
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Led"
                component={RgbNavigation}
                options={{
                    tabBarLabel: ({focused}) => {
                        if (focused) {
                            return (
                                <View style={{
                                    height: 5,
                                    width: '60%',
                                    backgroundColor: Colors.primary,
                                    borderRadius: 10
                                }}/>
                            );
                        }
                        return null;
                    },
                    tabBarIcon: ({focused}) => {
                        return (
                            focused ? (
                                <Image source={require('../../assets/icons/Led.png')} style={{width: 20, height: 20}}/>
                            ) : (
                                <Image source={require('../../assets/icons/Led.png')} style={{width: 20, height: 20}}/>
                            )
                        )
                    }
                }}
            />
            <Tab.Screen
                name="Dew"
                component={DewScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        if (focused) {
                            return (
                                <View style={{
                                    height: 5,
                                    width: '60%',
                                    backgroundColor: Colors.primary,
                                    borderRadius: 10
                                }}/>
                            );
                        }
                        return null;
                    },
                    tabBarIcon: ({focused}) => {
                        return (
                            focused ? (
                                <Image source={require('../../assets/icons/Dew.png')} style={{width: 20, height: 20}}/>
                            ) : (
                                <Image source={require('../../assets/icons/Dew.png')} style={{width: 20, height: 20}}/>
                            )
                        )
                    }
                }}
            />
            <Tab.Screen
                name={'Setting'}
                component={SettingScreen}
                options={{
                    tabBarLabel: ({focused}) => {
                        if (focused) {
                            return (
                                <View style={{
                                    height: 5,
                                    width: '60%',
                                    backgroundColor: Colors.primary,
                                    borderRadius: 10
                                }}/>
                            );
                        }
                        return null;
                    },
                    tabBarIcon: ({focused}) => {
                        return (
                            focused ? (
                                <Image source={require('../../assets/icons/settings.png')} style={{width: 20, height: 20}}/>
                            ) : (
                                <Image source={require('../../assets/icons/settings.png')} style={{width: 20, height: 20}}/>
                            )
                        )
                    }
                }}/>
        </Tab.Navigator>
    );
}

export default TabNavigation;
