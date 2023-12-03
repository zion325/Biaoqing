import { Text, StyleSheet, View, TouchableOpacity, ImageBackground,Dimensions, Alert } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'

const masStoreToProps = (state) => {
  return {
      isLogin:state.User.isLogin
  }
}


class Home extends Component {
  handeCamera = ()=>{
    // if(this.props.isLogin){
    //   this.props.navigation.navigate('Camerascreen')
    // }
    // else {
    //   Alert.alert("请先进行登录！")
    // }
    this.props.navigation.navigate('Startscreen')
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={require('../../sources/images/bg1.jpg')}
          style={styles.bgImage}
        >
          <View style={{
            flexDirection: 'row',
            justifyContent: 'center'
          }}>
            <TouchableOpacity
              style={{
                // flex:1,
                backgroundColor: 'blue',
                top:Dimensions.get('window').height/4,
                padding: 12,
                justifyContent: 'center',
                alignContent: 'center',
                width: 100,
                height: 65,
                borderRadius: 20,
              }}
              onPress={() => {
                this.handeCamera()
              }}
            >
              <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center', fontSize: 20 }}>开始</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

export default connect(masStoreToProps,null)(Home);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgImage: {
    flex: 1,
    resizeMode: 'cover',
  }
})