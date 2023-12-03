import { Text, StyleSheet, View, TouchableOpacity,Button } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { UP, DOWN } from '../../redux/action/actionCounter'

const masStoreToProps = state => {
    return {
        num:state.Counter.num
    }
}

class Counter extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Button title='一 ' onPress={()=>this.props.DOWN(1)}></Button>
        <Text style={{fontSize:30,margin:10}}>{this.props.num}</Text>
        <Button title=' 十 ' onPress={()=>this.props.UP(1)}></Button>
      </View>
    )
  }
}
export default connect(masStoreToProps,{ UP, DOWN })(Counter);

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    }

})