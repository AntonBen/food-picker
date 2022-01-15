import React from 'react'
import { FlatList, Text, TouchableOpacity, View } from 'react-native'


const Summary = ({route, navigation}) => {
  const likedPlaces = route.params;

  return (
    <View>
      <FlatList 
        data={likedPlaces}
        keyExtractor={(item) => item.name}
        renderItem={(({item}) =>
          <TouchableOpacity>
            <View>
              <Text>{item.name}</Text>
            </View> 
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export { Summary };