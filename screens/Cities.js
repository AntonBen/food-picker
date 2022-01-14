import React, { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, FlatList } from 'react-native'

const Cities = ({navigation}) => {

  const [cities, setCities] = useState([{key:'stan'}, {key:'gården'}])

  useEffect(() => {
    
    setCities([{key:'stan'}, {key:'gården'}])
  }, [])
  console.log(cities)
  return (
    <View style={styles.container}>
      <FlatList 
        data={cities}
        keyExtractor={(item) => item.key}
        renderItem={(({item}) =>
        <TouchableOpacity onPress={() => navigation.navigate('food',item.key)}>
<View>
            <Text>
        {item.key}
        </Text>
          </View>
        </TouchableOpacity>
        
        )
        } />
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
