import React from 'react'
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'

const Intro = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../assets/victoria.jpg')} ></Image>
      <TouchableOpacity onPress={() => navigation.navigate('location')}>
        <View style={styles.button}>
          <Text style={styles.text}>Find Food!</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default Intro;

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
})