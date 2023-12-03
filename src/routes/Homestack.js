import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Homescreen from '../views/home/Home'
// import Camerascreen from '../views/camera/Camera'
import Startscreen from '../views/start/Index'
import Loginscreen from '../views/login/Login';

const Stack = createNativeStackNavigator();
export default class Homestack extends Component {
  render() {
    return (
      <Stack.Navigator
      >
        <Stack.Screen name="Homescreen" component={Homescreen} 
        options={{ title: '首页' }}
        />
        <Stack.Screen name="Startscreen" component={Startscreen} 
        options={{ title: '开始', tabBarVisible: false}}
        
        />
        <Stack.Screen name="Login" component={Loginscreen} 
        options={{ title: '登录' }}
        />
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})
