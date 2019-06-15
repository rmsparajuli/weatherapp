import React, { Component } from 'react';
import { View, Text, ImageBackground, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import { HEIGHT, WIDTH } from '../constance/HeightWidth'

export default class Weather extends Component {

    static navigationOptions = ({ navigation }) => {
        return {
            // headerVisible: false,
            // header:null,
            headerTitle: (
                <ImageBackground
                    source={require('../assets/headerWeather.png')}
                    style={{ height: '100%', width: '100%', flexDirection: 'row', alignItems: 'center' }}
                >
                    <View style={{ marginHorizontal: 20 }}>
                        <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
                            Weather
                        </Text>
                    </View>

                </ImageBackground>
            ),

        }
    }

    constructor() {
        super();
        this.state = {
            location: '',
            isLoading: true,
            isFetching: false,
            dataofWeather: []
        }
    }

    _keyExtractor = (dataofWeather, index) => index.toString();


    // componentDidMount() { this.getApi() }
    componentWillMount() { this.getApi() }
    onRefresh() {
        this.setState({ isFetching: true }, function () { this.getApi() });
    }


    getApi = async () => {

        const WeatherApi = await fetch('https://samples.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=b4a5ea985a5305570273c15a55b5e1d2')
        const APIValue = await WeatherApi.json();
        const APIResults = APIValue.weather
        console.log(APIResults[0].temp);
        this.setState({
            isFetching: false,
            isLoading: false,
            dataofWeather: APIResults
        });
        // this.props.dispatch(StoryActions.setdataofWeather(this.state.dataofWeather.concat(responseJson.main)))
    }




    // static getDerivedStateFromProps(props = navigation.getParam('town'), state) {
    //     if (props.loaction !== state.loaction) {
    //         return {
    //             location: props.loaction
    //         }
    //     }
    //     return true
    // }
    // componentWillUpdate(next) {
    //     return false
    // }
    render() {

        const { navigation } = this.props;
        const location = navigation.getParam('town'); // Here 'NO-ID is default value'
        // if(location){
        //     this.setState({location})
        // }
        console.log(location, this.state);
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <ActivityIndicator size='large' color="red" />
                </View>

            )
        }
        return (
            <View style={{ flex: 1 }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', padding: 0, backgroundColor: '#EAF0F1', borderBottomWidth: .1, elevation: 3 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>  on </Text>

                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
                        {/* {JSON.stringify(location).toUpperCase()} */}
                        {(location.toUpperCase())}
                    </Text>
                </View>
                <FlatList
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    data={this.state.dataofWeather}
                    // onRefresh= ()=>return()
                    keyExtractor={this._keyExtractor}
                    renderItem={({ item }) => (
                        <View>
                            <Text>
                                current Temperature	:	{item.id}
                            </Text>
                            <Text>
                               The sky is {item.main}
                            </Text>
                        </View>
                    )

                    }

                />


            </View>
        );
    }
}
