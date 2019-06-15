import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator, Image, Dimensions, StyleSheet } from 'react-native';
const WIDTH = Dimensions.get('window').width
export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: []
    };
  }
  getUserFromApi = () => {
    return fetch('https://randomuser.me/api/?results=15')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          dataSource: this.state.dataSource.concat(responseJson.results)
        });
      })
      .catch(error => console.log(error))
  };

  // optional , can be use in flatlist:
  _keyExtractor = (datasource, index) => datasource.email;

  componentDidMount() {
    this.getUserFromApi();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
          <ActivityIndicator size='large' color="red" />
        </View>
      )

    }
    return (
      <FlatList
        data={this.state.dataSource}
        keyExtractor={this._keyExtractor}
        renderItem={({ item }) => (
          <TouchableOpacity style={{ height: 280, width: WIDTH * 33.33 / 100, paddingHorizontal: 5, marginTop: 5 }}>
            <View style={{ padding: 3, alignItems: 'center', justifyContent: 'center', borderRadius: 7, borderWidth: .4, elevation: 2 }}>
              <Image
                source={{ uri: item.picture.large }}
                style={{ height: 230, width: '100%', borderRadius: 5 }}
              />
              {/* <View style={{justifyContent:'center', alignItems:'center'}}> */}
              <Text>
                6.2.2019
                </Text>
              <Text>
                Rajdhani
                </Text>
              {/* </View> */}
            </View>

          </TouchableOpacity>
        )}
        numColumns={3}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row"
  },

  subContainer: {
    marginBottom: -25
  }
});