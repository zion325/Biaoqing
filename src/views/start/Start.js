import React, { useEffect, useState, useRef } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Linking,
    Image,
    Dimensions,
    Alert,
    ScrollView,
    TextInput,
    Platform,
    PermissionsAndroid,
    FormData
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import { connect } from 'react-redux';
import * as Animatable from 'react-native-animatable'
import { Button } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
// import RNFetchBlob from 'rn-fetch-blob';
import { tabbarTure, tabbarFalse } from '../../redux/action/actionTabbar'
import { updateResult } from '../../redux/action/actionResult';


function App(props) {
    // var dirs = RNFetchBlob.fs.dirs;
    const audioRecorderPlayer = new AudioRecorderPlayer();


    useEffect(() => {
        startAudio();
        return () => {
            stopAudio();
        }
    }, [])

    //控制视频相关
    const [videoPath, setvideoPath] = useState('');
    const [isVideo, setisVideo] = useState(false);
    const [recordVideo, setrecordVideo] = useState(false);
    const [cameraActive, setcameraActive] = useState(false);
    //控制聊天相关
    const [showChart, setshowChart] = useState(false);
    const [chartText, setchartText] = useState("");
    const [textList, settextList] = useState([]);
    //控制音频相关
    const [showAudio, setshowAudio] = useState(false);
    const [voiceText, setvoiceText] = useState([]);
    const [recordSecs, setrecordSecs] = useState();
    const [recordTime, setrecordTime] = useState("");


    const audioPath = Platform.select({
        android: undefined,
        // android: `${dirs.CacheDir}/hello${cnt}.mp3`,
        ios: undefined,
    });
    
    const capturePhoto = async () => {
        if (this.camera) {
            const options = { quality: 0.5, base64: true };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    const uploadData = async () => {
        const videoUri = "file://path/to/your/video.mp4";
        const audioUri = "file://path/to/your/audio.mp3";
        const apiUrl = "http://your-server-address/upload";

        const formData = new FormData();

        // 添加视频文件
        formData.append("video", {
            uri: videoUri,
            type: "video/mp4",
            name: "video.mp4",
        });

        // 添加音频文件
        formData.append("audio", {
            uri: audioUri,
            type: "audio/mp3",
            name: "audio.mp3",
        });

        // 添加字符串数组
        const stringArray = ["value1", "value2", "value3"];
        formData.append("strings", JSON.stringify(stringArray));

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                body: formData,
            });

            const result = await response.text();
            console.log(result);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const takeVidio = async () => {
        if (this.camera && cameraActive) {
            setrecordVideo(!recordVideo);
            setisVideo(!isVideo);
            const options = { quality: RNCamera.Constants.VideoQuality["480p"], maxFileSize: (100 * 1024 * 1024) };
            const data = await this.camera.recordAsync(options);
            setvideoPath(data.uri);
            console.log("call takevideo:" + data.uri);
        } else {
            console.log("请打开摄像头！");
        }
    };

    const pauseVideo = async () => {
        if (this.camera && cameraActive) {
            this.camera.pausePreview();
            setrecordVideo(!recordVideo);
            console.log("暂停");
        }
    };

    const resumeVideo = async () => {
        if (this.camera && cameraActive) {
            this.camera.resumePreview();
            setrecordVideo(!recordVideo);
            console.log("唤醒");
        }
    };

    const stopVideo = () => {
        if (this.camera && cameraActive) {
            this.camera.stopRecording();
            setrecordVideo(false);
            setisVideo(false);
        }
    };

    const handleCamera = () => {
        if (cameraActive) {
            console.log("call handecamera" + videoPath);//可发送一次视频路径
            setvideoPath("");
            if (isVideo) stopVideo();
            setcameraActive(!cameraActive);
        } else {
            setcameraActive(!cameraActive);

        }
    }

    const handleOver = () => {
        setshowChart(false);
        if (showAudio) onPauseRecord();
        stopVideo();
        props.changeShow(false);
    }

    const handleSentChart = (val) => {
        if (val !== "") {
            settextList([...textList, chartText]);
            setchartText("")
        }
    }

    const startAudio = async () => {
        if (Platform.OS === 'android') {
            try {
                const grants = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                ]);

                console.log('write external stroage', grants);

                if (
                    grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.READ_EXTERNAL_STORAGE'] ===
                    PermissionsAndroid.RESULTS.GRANTED &&
                    grants['android.permission.RECORD_AUDIO'] ===
                    PermissionsAndroid.RESULTS.GRANTED
                ) {
                    console.log('permissions granted');
                } else {
                    console.log('All required permissions not granted');
                    return;
                }
            } catch (err) {
                console.warn(err);
                return;
            }
        }

        const result = await audioRecorderPlayer.startRecorder();
        audioRecorderPlayer.addRecordBackListener((e) => {
            setrecordSecs(e.currentPosition);
            setrecordTime(audioRecorderPlayer.mmssss(
                Math.floor(e.currentPosition),
            ));
        });

        console.log("url-" + audioPath);
        setshowAudio(!showAudio)
    };

    const onPauseRecord = async () => {
        try {
            const r = await audioRecorderPlayer.pauseRecorder();
            setshowAudio(false);
            console.log(r);
        } catch (err) {
            console.log('pauseRecord', err);
        }
    };

    const onResumeRecord = async () => {
        try {
            const r = await audioRecorderPlayer.resumeRecorder();
            setshowAudio(true);
            console.log(r);
        } catch (err) {
            console.log('pauseRecord', err);
        }
    };

    const stopAudio = async () => {
        const result = await audioRecorderPlayer.stopRecorder();
        audioRecorderPlayer.removeRecordBackListener();
        setrecordSecs(0);
        console.log("stopAudio-" + result);
        let resultInfo = {
            videoPath: videoPath,
            voicePath: result,
            chatText: [...textList]
        }
        props.updateResult(resultInfo);
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={{ width: "100%", height: '100%', position: 'absolute' }}>
                    {
                        cameraActive ?
                            (
                                <>
                                    <RNCamera
                                        ref={ref => {
                                            this.camera = ref;
                                        }}
                                        style={styles.preview}
                                        type={RNCamera.Constants.Type.front}
                                        flashMode={RNCamera.Constants.FlashMode.off}
                                        captureAudio={false}
                                    />
                                </>
                            )
                            :
                            null
                    }
                </View>
                {/* 结束按钮 */}
                <View style={styles.backButton}>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            width: 70,
                            borderRadius: 999,
                            backgroundColor: 'white',

                        }}
                        onPress={() => handleOver()}
                    >
                        <Text style={{ color: 'red', fontWeight: '500', textAlign: 'center', lineHeight: 30, fontSize: 20 }}>结束</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.backButton}>
                    <TouchableOpacity
                        style={{
                            height: 30,
                            width: 120,
                            borderRadius: 999,
                            backgroundColor: 'white',
                            top: 35,

                        }}
                        onPress={() => handleCamera()}
                    >
                        <Text style={{ color: 'red', fontWeight: '500', textAlign: 'center', lineHeight: 30, fontSize: 20 }}>摄像头:{cameraActive ? "开" : "关"}</Text>
                    </TouchableOpacity>
                </View>


                {/* 底部按钮 */}
                <View style={{
                    flexDirection: 'row',
                    top: Dimensions.get("screen").height * 0.70,
                    position: 'absolute',

                }}>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: 'blue',
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginLeft: 18,
                            marginRight: 18,
                            borderRadius: 20,
                            height: 40
                        }}
                        onPress={() => {
                            if (recordVideo) {
                                pauseVideo();
                            }
                            else {
                                if (isVideo) {
                                    resumeVideo();
                                }
                                else {
                                    takeVidio();
                                }
                            }
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '200', textAlign: 'center', fontSize: 20 }}>录像{recordVideo ? "开" : "关"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: 'blue',
                            marginLeft: 18,
                            marginRight: 18,
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: 30,
                            borderRadius: 20,
                        }}
                        onPress={() => {
                            if (showAudio) {
                                onPauseRecord();
                            }
                            else {
                                onResumeRecord();
                            }
                        }}
                    >
                        <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center', fontSize: 20 }}>音频{showAudio ? "开" : "关"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            flex: 1,
                            backgroundColor: 'blue',
                            marginLeft: 18,
                            marginRight: 18,
                            justifyContent: 'center',
                            alignContent: 'center',
                            width: 30,
                            borderRadius: 999,
                        }}
                        onPress={() => setshowChart(!showChart)}
                    >
                        <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center', fontSize: 20 }}>聊天</Text>
                    </TouchableOpacity>
                </View>
                {/* 聊天框 */}
                {
                    showChart ? (

                        <Animatable.View
                            animation="fadeInRight"
                            style={styles.chart}
                        >
                            <TouchableOpacity
                                onPress={() => setshowChart(!showChart)}
                                style={{ width: 50, height: 30, backgroundColor: 'blue', alignItems: 'center', margin: 5, }}
                            >
                                <Text style={{ fontSize: 20, color: 'white' }}>X</Text>
                            </TouchableOpacity>
                            <ScrollView>
                                <View style={{ flex: 1 }}>

                                    <View style={{
                                        flex: 1,
                                        borderWidth: 1,
                                        height: Dimensions.get('window').height * 0.4,

                                    }}>
                                        {
                                            textList.map((item, index) => {
                                                return <Text key={index}>{item}</Text>
                                            })
                                        }
                                    </View>


                                    <View style={{
                                        flexDirection: 'row'
                                    }}>
                                        <TextInput
                                            style={{
                                                flex: 1,
                                                borderWidth: 2,
                                                paddingLeft: 10,
                                                color: '#05375a',
                                                height: 40,

                                            }}
                                            placeholder='输入框'
                                            value={chartText}
                                            onChangeText={(value) => setchartText(value)}
                                        />
                                        <Button color={'blue'} title='发送' onPress={() => handleSentChart(chartText)}></Button>
                                    </View>
                                </View>
                            </ScrollView>
                        </Animatable.View>


                    ) : null
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        // alignContent: 'center'
    },
    preview: {
        flex: 1,

        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backButton: {
        backgroundColor: 'rgba(0,0,0,0,0)',
        position: 'absolute',
        justifyContent: 'center',
        top: 5,

    },
    chart: {
        flex: 1,
        height: Dimensions.get('window').height * 0.55,
        position: "absolute",
        width: '95%',
        margin: 10,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        // top: 0,
        bottom: 0,

    },
});

export default connect(null, { tabbarTure, tabbarFalse, updateResult })(App);