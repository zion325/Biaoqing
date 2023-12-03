import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Userscreen from '../views/user/User';
import Aboutscreen from '../views/user/About';
import Settingscreen from '../views/user/Setting';
import Loginscreen from '../views/login/Login';
import Registerscreen from '../views/register/Register'
import Counterscreen from '../views/user/Counter';

const Stack = createNativeStackNavigator();
export default class Userstack extends Component {
  render() {
    return (
      <Stack.Navigator
      initialRouteName="User"
      >
        <Stack.Screen name="User" component={Userscreen} 
        options={{ title: '个人中心' }}
        />
        <Stack.Screen name="About" component={Aboutscreen} 
        options={{ title: '关于' }}
        />
        <Stack.Screen name="Setting" component={Settingscreen} 
        options={{ title: '设置' }}
        />
        <Stack.Screen name="Login" component={Loginscreen} 
        options={{ title: '登录' }}
        />
        <Stack.Screen name="Register" component={Registerscreen} 
        options={{ title: '注册' }}
        />
        <Stack.Screen name="Counter" component={Counterscreen} 
        options={{ title: '计数器' }}
        />
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})