import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import FoodSwiper from './screens/FoodSwiper'

const Navigator = createStackNavigator({
  Food: FoodSwiper
}, {
  initialRouteName: 'Food',
  defaultNavigationOptions: {
    title: 'food'
  }
});

export default createAppContainer(Navigator);