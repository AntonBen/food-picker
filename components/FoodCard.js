import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Animated from 'react-native-reanimated';

export const FoodCard = ({placeData}) => {

  if(placeData == undefined){
    return null
  }
   
  return (
    <View style={style.container}>
      <Text>{placeData.name}</Text>
      <Image source={{uri: placeData.image_url}} style={style.image} />
      <View style={style.overlay}>
        <View style={style.indicators}>
          <Animated.Text style={style.disLike}>No Thanks</Animated.Text>
          <Animated.Text style={style.like}>Yummy</Animated.Text>
        </View>

      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'grey',
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
  },
  indicators: {
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 10,
    
  },
  like: {
    fontSize: 24,
    color: 'green',
    borderColor: 'green',
    borderWidth: 4,
    fontWeight: 'bold',
    paddingHorizontal: 10,
  },
  disLike: {
    fontSize: 24,
    color: 'red',
    borderColor: 'red',
    borderWidth: 4,
    paddingHorizontal: 10,
    fontWeight: 'bold',
  }
})