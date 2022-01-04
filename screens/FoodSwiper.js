import React, {useState} from 'react';
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { event, useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default function FoodSwiper() {

  const translationX = useSharedValue(0);
  const translationY = useSharedValue(0);
  const onGestureEvent = useAnimatedGestureHandler({
    onActive: (event) => {
      translationX.value = event.translationX;
      translationY.value = event.translationY;
    },
    onEnd: (event) => {
      translationX.value = withSpring(0);
      translationY.value = withSpring(0);
    }
  });

  const animationStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translationX.value },
        { translateY: translationY.value },
      ]
    }
  })

  return (
  <View style={styles.container}>
    <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View style={animationStyle}>
          <View style={styles.pictureCard}>
            <Text>
              picture
            </Text>
          </View>
        </Animated.View>
      </PanGestureHandler>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    height: '100%',
  },
  pictureCard: {
    backgroundColor: '#ff00ff',
    width: 200,
    height: 300,
  },
  info: {
    backgroundColor: '#ffff00',
    flex: 1,
    width: '100%'
  },

});