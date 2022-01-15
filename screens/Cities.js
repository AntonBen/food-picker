import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'
import { getCities } from '../services/yelp'

const Cities = ({navigation}) => {

  const [cities, setCities] = useState(['stan','gården'])

  useEffect(() => {
    getCities()
    .then(response => setCities(response))
    .catch(err => console.error(err))
  }, [])

  return (
    <View style={styles.container}>
      <FlatList 
        data={cities}
        keyExtractor={(item) => item}
        renderItem={(({item}) =>
          <TouchableOpacity onPress={() => navigation.navigate('food',item)}>
            <View>
              <Text>
                {item}
              </Text>
            </View>
          </TouchableOpacity>
        )} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex'
  },
  button: {

  },

})

export { Cities };
