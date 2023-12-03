import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, Button, Touchable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Homestack from '../routes/Homestack'
import Userstack from '../routes/Userstack'
const Tab = createBottomTabNavigator();


function Tabbar() {
  return (
    <Tab.Navigator
      initialRouteName="Homestack"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        headerShown:false,
        tabBarHideOnKeyboard:true,
      }}
    >
      <Tab.Screen
        name="Homestack"
        component={Homestack}
        options={{
          tabBarLabel: '首页',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          
        }}
      />
      <Tab.Screen
        name="Userstack"
        component={Userstack}
        options={{
          tabBarLabel: '我',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default Tabbar;

