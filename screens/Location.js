import React from 'react';
import { Button, Image, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const LocationScreen = ({navigation}) => {
  
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/location.jpg')} />
      <TouchableOpacity>
        <View style={styles.button}>
          <Text style={styles.text}>
            GPS location
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('cities')}>
        <View style={styles.button}>
          <Text style={styles.text}>
            Chose city
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
};

export { LocationScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center'
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  button: {
    paddingHorizontal:50,
    paddingVertical:20,
    borderRadius: 15,
    backgroundColor: "green",
    display: 'flex',
    marginBottom: 80,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32
  }
});