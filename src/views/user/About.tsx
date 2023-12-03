import { Text, StyleSheet, View } from 'react-native'
import React, { Component } from 'react'

export default class About extends Component {
  render() {
    return (
      <View>
        <Text style={styles.text}>作者:zion团队</Text>
        <Text style={styles.text}>创建时间:2023/01/01</Text>
        <Text style={styles.text}>最新版本:BiaoQing 1.1</Text>
        <Text style={styles.text}>分享:https://www.biaoqing.cn</Text>
        <Text style={styles.text}>介绍:软件由 中国海洋大学 学生个人团队 基于创新创新创业项目制作；希望能给大家带来便利，可能有做的不好的地方，请大家见谅！</Text>
        <Text style={styles.text}>如果您在使用过程中, 遇到什么问题, 或者有任何建议, 可以将问题/建议发送至邮箱: 3250175989@qq.com;</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text:{
    fontWeight:'500',
    fontSize:20,
    marginBottom:15,
    
  }
})