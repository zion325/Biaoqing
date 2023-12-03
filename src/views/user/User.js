import { Text, StyleSheet, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React, { Component } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { logout } from '../../redux/action/actionUser'
import { connect } from 'react-redux'

const masStoreToProps = (state) => {
  return {
      isLogin: state.User.isLogin,
      username: state.User.username,
      password: state.User.password
  }
}

class User extends Component {
  constructor(){
    super()
  }
  doLogout = ()=>{
    this.props.logout()
    Alert.alert("退出成功！")
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.avatar}>
            <Image
            // source={require('../../sources/images/ai1.png')}
              source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
              style={{ width: 80, height: 80, marginVertical: 10, borderRadius: 40 }}
            ></Image>
          </View>
          {
            this.props.isLogin === true ?
            (
            <View style={styles.userInfo}>
              <Text style={{fontSize:30,margin:10}}>{this.props.username}</Text>
            </View>
            )
            :null
          }
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Counter')}
          >
            <View style={styles.listItem}>
              <View style={{
                flexDirection:'row',
                marginLeft:5,
              }}>
              <MaterialCommunityIcons name='counter' size={28} color={'gray'}></MaterialCommunityIcons>
                <Text style={{marginLeft:10, fontSize:20}}>计数器</Text>
              </View>
            <MaterialCommunityIcons name='chevron-right' size={20} color={'gray'}></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('About')}
          >
            <View style={styles.listItem}>
              <View style={{
                flexDirection:'row',
                marginLeft:5,
              }}>
              <MaterialCommunityIcons name='information-outline' size={28} color={'gray'}></MaterialCommunityIcons>
                <Text style={{marginLeft:10,fontSize:20}}>关于</Text>
              </View>
            <MaterialCommunityIcons name='chevron-right' size={20} color={'gray'}></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Setting')}
          >
            <View style={styles.listItem}>
              <View style={{
                flexDirection:'row',
                marginLeft:5,
              }}>
              <MaterialCommunityIcons name='cog' size={28} color={'gray'}></MaterialCommunityIcons>
                <Text style={{marginLeft:10, fontSize:20}}>设置</Text>
              </View>
            <MaterialCommunityIcons name='chevron-right' size={20} color={'gray'}></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>
          {
            this.props.isLogin === true ?
            (
              <TouchableOpacity
              onPress={() => this.doLogout()}
            >
              <View style={styles.listItem}>
                <View style={{
                  flexDirection:'row',
                  marginLeft:5,
                }}>
                <MaterialCommunityIcons name='logout' size={28} color={'gray'}></MaterialCommunityIcons>
                  <Text style={{marginLeft:10, fontSize:20}}>退出</Text>
                </View>
              <MaterialCommunityIcons name='chevron-right' size={20} color={'gray'}></MaterialCommunityIcons>
              </View>
            </TouchableOpacity>
            )
            :
            (
              <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <View style={styles.listItem}>
              <View style={{
                flexDirection:'row',
                marginLeft:5,
              }}>
              <MaterialCommunityIcons name='login' size={28} color={'gray'}></MaterialCommunityIcons>
                <Text style={{marginLeft:10, fontSize:20}}>登录</Text>
              </View>
            <MaterialCommunityIcons name='chevron-right' size={20} color={'gray'}></MaterialCommunityIcons>
            </View>
          </TouchableOpacity>
            )
          }
          
          
        </ScrollView>
      </SafeAreaView>
    )
  }
}

export default connect(masStoreToProps,{ logout })(User);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',

  },
  avatar: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  listItem:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    margin:10,
  },
  userInfo:{
    flexDirection:'row',
    justifyContent:'center',
    borderWidth:1,
    borderRadius:20,
    marginBottom:30
  }
})