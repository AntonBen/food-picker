import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

export const FoodCard = ({placeData, opacity}) => {

  const like = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  const dislike = useAnimatedStyle(() => {
    const disLikeOpacity = opacity.value < 0 ?Math.abs(opacity.value) : 0;
    return {
      opacity: disLikeOpacity
    }
  })

   
  return (
    <View style={style.container}>
      <Image source={{uri: placeData.image_url}} style={style.image} />
      <View style={style.overlay}>
        <View style={style.indicators}>
          <Animated.Text style={[style.disLike, dislike]}>Nasty</Animated.Text>
          <Animated.Text style={[style.like, like]}>Tasty</Animated.Text>
        </View>
        <View style={style.info}>
          <View>
            <Text style={style.infoText}>{placeData.name}</Text>
            <Text >{placeData.price}</Text>
          </View>
          <View>
            <Text style={style.infoText}>{placeData.rating}</Text>
            <Text>{Math.round(placeData.distance) + " m"}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    borderRadius: 20,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
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
  },
  info: {
    borderTopEndRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoText: {
    fontSize: 32,

  }
})