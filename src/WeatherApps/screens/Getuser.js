import React, { Component } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, TextInput, Alert, Image, ImageBackground, Dimensions, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
const WIDTH = Dimensions.get("window").width //for full screen
const HEIGHT = Dimensions.get("window").height
export default class InputUser extends Component {
    constructor() {
        super();
        this.state = {
            location: '',

        }
    }
    clearButtonPressed = () => {
        // Alert.alert('hey you')
        this.setState(
            { location: this.location.clear() }
        )
    }

    render() {
        return (
            <ImageBackground resizeMethod="scale" source={require('../assets/weather.jpg')} style={styles.container} >
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }} >
                        <Text style={{ fontSize: 24, fontWeight: 'bold', }}>
                            Enter Location
                    </Text>

                        <View style={{ marginVertical: 20, flexDirection: 'row', justifyContent: 'center' }}>
                            <TextInput
                                style={styles.text}
                                allowFontScaling={false}
                                placeholder=" Type City Name"
                                underlineColorAndroid="transparent"
                                placeholderTextColor="#333"
                                keyboardType="default"
                                onChangeText={location => this.setState({ location })}
                                autoCapitalize="words"
                                value={this.state.text}
                                clearButtonMode="always"
                                autoCorrect={false}
                                inputStyle={{ backgroundColor: "#fff" }
                                }
                            />
                            <TouchableOpacity onPress={() => this.clearButtonPressed} style={{ alignItems: 'center', justifyContent: 'center', marginHorizontal: 10 }}>
                                <Text style={{ color: '#BB2CD9' }}>
                                    clear
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('weather', { town: this.state.location })}
                        style={{ borderRadius: 10, backgroundColor: 'transparent', marginHorizontal: 0, paddingVertical: 10, borderWidth: .1, elevation: 3, margin: 20, justifyContent: 'center', alignItems: 'center', paddingHorizontal:20 }}>
                        <Text style={{ fontSize: 22, fontWeight: '400', color: '#FFF' }}>
                            CHECK  WEATHER
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </ImageBackground>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        height: HEIGHT,
        width: WIDTH,
    },
    text: {
        paddingHorizontal: 15,
        color: '#EAF0F1',
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
        borderWidth: .3,
        width: 310,
        height: 45,
        borderRadius: 5,
        elevation: 5,
        borderColor: '#FFF'
    },
})