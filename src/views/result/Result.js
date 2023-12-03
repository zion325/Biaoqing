import { Text, StyleSheet, View, Button } from 'react-native'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateResult } from '../../redux/action/actionResult';
import DataResult from './DataResult';

const masStoreToProps = (state) => {
    return {
        videoPath: state.Result.videoPath,
        voicePath: state.Result.voicePath,
        chatText: [...state.Result.chatText],
    }
}



class Result extends Component {
    handleStart = () => {
        console.log("call handleStart")
        let initInfo = {
            videoPath: "",
            voicePath: "",
            chatText: []
        }
        this.props.updateResult(initInfo);
        this.props.changeShow(true);
    }
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Text style={{ margin: 5 }}>结果---视频路径-{this.props.videoPath}</Text>
                    <Text style={{ margin: 5 }}>结果---音频路径（自定义存储位置）-{this.props.voicePath}</Text>
                    <Button title='重新开始' onPress={this.handleStart}></Button>
                </View >
                <DataResult></DataResult>
            </View>
        )
    }
}

export default connect(masStoreToProps, { updateResult })(Result);
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})