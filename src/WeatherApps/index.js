import { createStackNavigator, createAppContainer } from 'react-navigation'
import React from 'react'
import { ImageBackground, View, Text, TouchableOpacity } from 'react-native'
import InputUser from './screens/Getuser'
import Weather from './screens/Weather'

const AppContainer = createStackNavigator({
    home: {
        screen: InputUser,
        navigationOptions: ({ navigation }) => {
            return {
                // headerVisible: false,
                // header:null,
                headerTitle: (
                    <ImageBackground
                        source={require('./assets/headerWeather.png')}
                        style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center' }}
                    >
                        <View style={{ marginHorizontal: 20 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                                WEATHER APP
                                </Text>
                        </View>

                    </ImageBackground>
                ),

                headerStyle: {

                }

            }
        }

    },
    weather: {
        screen: Weather
    }

},
    {
        initialRouteName: 'home',

    },
    {

    }
)

export default createAppContainer(AppContainer)