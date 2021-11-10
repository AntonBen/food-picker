import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function FoodSwiper() {
  return  <View style={styles.container}>
      <View style={styles.picture}></View>
        <View style={styles.foodInfo}>
            <Text>
              Babas
            </Text>
        </View>
        <View style={styles.info}>
            <Text>hej test</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
  },
  picture:{
    flex: 2,
  },
  foodInfo: {
    backgroundColor: '#ff00ff',
    padding: 10,
    width: '100%',
  },
  info: {
    backgroundColor: '#ffff00',
    flex: 1,
    width: '100%'
  },

});
