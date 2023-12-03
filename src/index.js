import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tabbar from './routes/Tabbar'
import { connect } from 'react-redux'
import Loginscreen from './views/login/Login';
import Registerscreen from './views/register/Register';
import Startscreen from './views/start/Start';
const Stack = createNativeStackNavigator()

const masStoreToProps = (state) => {
  return {
    isShow: state.TabbarR.isShow
  }
}

class index extends Component {
  render() {
    return (
      <>
        {
          this.props.isShow ?
            <Tabbar></Tabbar>
            :
            (
              <Stack.Navigator
              // initialRouteName='Login'
              screenOptions={{
                headerBackVisible:true
              }}
              >
                <Stack.Screen name="Login" component={Loginscreen}
                  options={{ title: '登录' }}
                />
                <Stack.Screen name="Startscreen" component={Startscreen}
                  options={{ title: '开始' }}
                />
                <Stack.Screen name="Register" component={Registerscreen}
                  options={{ title: '注册' }}
                />
              </Stack.Navigator>
            )
        }
      </>
    );
  }
}

export default connect(masStoreToProps, null)(index);

const styles = StyleSheet.create({})