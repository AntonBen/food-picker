import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Easing, event, Extrapolate, interpolate, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { FoodCard } from '../components/FoodCard';
import { getResturants } from '../services/yelp';

export default function FoodSwiper( {route, navigation}) {

  console.log(route.params)
  const HEIGHT = Dimensions.get('window').height;
  const WIDTH = Dimensions.get('window').width;

  const [foodPlaces, setFoodPlaces] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [likedPlaces, setLikedPlaces] = useState([]);
  const [dislikePlaces, setDislikePlaces] = useState([])

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const rotateZ = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect( () => {
    getResturants(route.params)
      .then(response => setFoodPlaces(response))
      .catch(err => console.log(err))
  },[])

  const newCard = () => {
    if(activeIndex === foodPlaces.length - 1) {
      navigation.navigate('summary', likedPlaces);
    }
    opacity.value = 0;
    setActiveIndex(activeIndex + 1);
  };

  const addPlace = () => {
    setLikedPlaces([...likedPlaces, foodPlaces[activeIndex]]);
    newCard();
  };

  const denyPlace = () => {
    setDislikePlaces([...dislikePlaces, foodPlaces[activeIndex]]);
    newCard();
  }

  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      translationX.value = 0;
      translationY.value = 0;
    },
    onActive: (event) => {
      translationX.value = event.translationX;
      translationY.value = interpolate(event.translationX, [-WIDTH / 2, 0, WIDTH / 2], [20, 0, 20]);
      rotateZ.value = interpolate(event.translationX, [-WIDTH / 2, 0, WIDTH / 2], [-10, 0, 10]);
      opacity.value = interpolate(event.translationX, [-WIDTH / 7, 0, WIDTH / 7], [-1, 0, 1], Extrapolate.CLAMP);
    },
    onEnd: (event) => {
      if(event.velocityX > 10 && event.translationX > 50 ) {
        return translationX.value = withTiming(WIDTH + 60, {}, (test => runOnJS(addPlace)()));
        
      }
      if(event.velocityX < -10 && event.translationX < -50 ) {
        return translationX.value = withTiming(-WIDTH - 60, {easing: Easing.bezier(0.25, 0.1, 0.25, 1)}, (test => runOnJS(newCard)()));
      }
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
      rotateZ.value = withSpring(0);
      opacity.value = 0;
    }
  });

  const animationStyle = useAnimatedStyle((index) => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
        { rotateZ: `${rotateZ.value}deg`}
      ]
    }
  })

  return (<SafeAreaView style={{display: 'flex', backgroundColor: "white"}}>
    <PanGestureHandler  onGestureEvent={onGestureEvent}>
    <Animated.View style={styles.container}>
        {foodPlaces.map((foodPlace, index) =>  {
          console.log("index: ", index, "activeIndex: ", activeIndex)
          if (index < activeIndex) {
            return null;
          }
          if(index === activeIndex) {
            return<Animated.View key={foodPlace.name} style={[animationStyle, styles.card] }>
            <FoodCard key={foodPlace.name} placeData={foodPlace} opacity={opacity} />
          </Animated.View>
          }
          return<Animated.View key={foodPlace.name + "testr"} style={ styles.card }>
          <FoodCard key={foodPlace.name + "test"} placeData={foodPlace} opacity={{value: 0}} />
        </Animated.View>
        }).reverse()}
    </Animated.View>
    </PanGestureHandler>
    <View style={styles.footer} >
      <TouchableOpacity onPress={denyPlace}>
        <View style={[styles.button, styles.redButton ]}>
          <Text style={styles.redButton}>Nasty</Text>
        </View> 
      </TouchableOpacity>
      <TouchableOpacity onPress={addPlace}>
        <View style={[styles.button, styles.greenButton]}>
          <Text style={styles.greenButton}>Tasty</Text>
        </View>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    display: 'flex',
    height: '90%',
    width: '100%',
    position: 'relative',
  },
  info: {

    flex: 1,
    width: '100%'
  },
  card: {
    ...StyleSheet.absoluteFillObject,
  },
  footer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'space-around',
    paddingTop: 20,
    backgroundColor: '#f1f1f1'
  },
  button: {
    height: 80,
    width: 80,
    borderRadius: 2,
    borderWidth: 3,
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
    opacity: 0.7,
  },
  greenButton: {
    borderColor: "green",
    color: 'green',
    fontWeight: 'bold',
    fontSize:20,
  },
  redButton: {
    borderColor: 'red',
    color: 'red',
    fontWeight: 'bold',
    fontSize:20,
  }
});