import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FoodSwiper from './screens/FoodSwiper'
import Intro from './screens/Intro';
import { Summary } from './screens/Summary';
import { LocationScreen } from './screens/Location';
import { Cities } from './screens/Cities';

const Stack = createStackNavigator()

const Navigator = () => {
  return <Stack.Navigator>
     <Stack.Screen name='summary' component={Summary} />
    <Stack.Screen name='intro' component={Intro} />
    <Stack.Screen name='location' component={LocationScreen} />
    <Stack.Screen name='cities' component={Cities} />
    <Stack.Screen name='food' component={FoodSwiper} />
    
  </Stack.Navigator>
}


export default function App() {
  return (<NavigationContainer>
    <Navigator />
  </NavigationContainer> )
}