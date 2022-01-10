import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { event, runOnJS, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated';
import { FoodCard } from '../components/FoodCard';
import { getResturants } from '../services/yelp';

export default function FoodSwiper() {

  const [foodPlaces, setFoodPlaces] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeCard, setActiveCard] = useState({ distance: 1081.6788379841437,
  image_url: "https://s3-media2.fl.yelpcdn.com/bphoto/UOSD_cdeKPtKhUerL3eu3w/o.jpg",
  name: "Blå Dörren",
  price: "$$",
  rating: 4,})

  useEffect( () => {
    getResturants()
      .then(response => setFoodPlaces(response))
      .catch(err => console.log(err))
  },[])

  const newCard = () => {
    setActiveIndex(activeIndex + 1);
    console.log("new card")
  };

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {
      translationX.value = 0;
      translationY.value = 0;
    },
    onActive: (event) => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    },
    onEnd: (event) => {
      if(event.velocityX > 10 && event.translationX > 0 ) {
        translationX.value = 500
        runOnJS(newCard)();
      }
      if(event.velocityX < -10 && event.translationX < -0 ) {
        translationX.value = -500
        return runOnJS(newCard)()
      }
    }
  });

  const animationStyle = useAnimatedStyle((index) => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationX.value }
      ]
    }
  })

  return (<SafeAreaView>
    <PanGestureHandler  onGestureEvent={onGestureEvent}>
    <Animated.View style={styles.container}>
        {foodPlaces.map((foodPlace, index) =>  {
          console.log("index: ", index, "activeIndex: ", activeIndex)
          if (index < activeIndex) {
            return null;
          }
          if(index === activeIndex) {
            return<Animated.View key={foodPlace.name} style={[animationStyle, styles.card] }>
            <FoodCard key={foodPlace.name} placeData={foodPlace} />
          </Animated.View>
          }
          return<Animated.View key={foodPlace.name + "testr"} style={ styles.card }>
          <FoodCard key={foodPlace.name + "test"} placeData={foodPlace} />
        </Animated.View>
        }).reverse()}
    </Animated.View>
    </PanGestureHandler>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    width: '100%',
    backgroundColor: "#333333",
    position: 'relative',
  },
  info: {
    backgroundColor: '#ffff00',
    flex: 1,
    width: '100%'
  },
  card: {
    ...StyleSheet.absoluteFillObject,
  }
});