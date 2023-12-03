import { Text, StyleSheet, View, ImageBackground, Platform, ScrollView, Alert, TextInput, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { connect } from 'react-redux'
import { loginTure } from '../../redux/action/actionUser'
import { tabbarTure,tabbarFalse } from '../../redux/action/actionTabbar'

const masStoreToProps = state => {
    return {
        isLogin:state.User.isLogin
    }
}

class Register extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            secureTextEntry: true,
            valiUsername: false
        }
    }
    handleValideUsername = (v) => {
        if (v.trim().length >= 2) {
            this.setState({
                username: v,
                valiUsername: true
            })
        } else {
            this.setState({
                username: v,
                valiUsername: false
            })
        }
    }
    handleValidePassword = (v) => {
        this.setState({
            password: v,
        })
    }
    updateSecureTextEntry = () => {
        this.setState({
            secureTextEntry: !this.state.secureTextEntry
        })
    }

    handleLogin = ()=>{
        if(this.state.username.length == 0 || this.state.password.length == 0){
            Alert.alert('输入错误，用户名/密码不能为空！');
            return;
        }
        let userInfo = {
            username:this.state.username,
            password:this.state.password.length
        }

        Alert.alert("注册成功！");
        this.props.loginTure(userInfo);
        this.props.tabbarTure();
        
    }

    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../sources/images/bg2.jpg')} style={styles.bgImage}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>Welcome</Text>
                    </View>
                    <Animatable.View
                        animation="fadeInUpBig"
                        style={styles.footer}
                    >
                        <ScrollView>
                            {/*用户名*/}
                            <View style={styles.action}>
                                <MaterialCommunityIcons name='account-outline' size={25} ></MaterialCommunityIcons>
                                <TextInput
                                    style={styles.input}
                                    placeholder='用户名'
                                    value={this.state.username}
                                    onChangeText={(value) => this.handleValideUsername(value)
                                    }
                                />
                                {
                                    this.state.valiUsername ?
                                        <Animatable.View animation='bounceIn'>
                                            <MaterialCommunityIcons name='check-circle-outline' size={20} ></MaterialCommunityIcons>
                                        </Animatable.View>
                                        :
                                        null
                                }
                            </View>
                            {/*密码*/}
                            <View style={styles.action}>
                                <MaterialCommunityIcons name='lock-outline' size={25} ></MaterialCommunityIcons>
                                <TextInput
                                    style={styles.input}
                                    placeholder='密码'
                                    secureTextEntry={this.state.secureTextEntry ? true : false}
                                    onChangeText={(value) => this.handleValidePassword(value)
                                    }
                                />
                                <TouchableOpacity onPress={this.updateSecureTextEntry}>
                                    {
                                        this.state.secureTextEntry ?
                                            <MaterialCommunityIcons name='eye-off-outline' size={20} ></MaterialCommunityIcons>
                                            :
                                            <MaterialCommunityIcons name='eye-outline' size={20} ></MaterialCommunityIcons>
                                    }
                                </TouchableOpacity>
                            </View>
                            {/*登录和注册按钮*/}
                            <View style={styles.button}>
                                <TouchableOpacity
                                    style={styles.signIn}
                                    onPress={() => this.handleLogin()}
                                >
                                    <View
                                        style={{ backgroundColor: '#01ab9d', flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderRadius: 5 }}>
                                        <Text style={{ color: '#fff' }}>注册</Text>
                                    </View>
                                </TouchableOpacity>

                            </View>

                        </ScrollView>
                    </Animatable.View>
                </ImageBackground>
            </View>
        )
    }
}

export default connect(masStoreToProps,{ loginTure,tabbarTure,tabbarFalse })(Register);

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    header: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: 28,
        paddingBottom: Platform.OS === 'ios' ? 150 : 100,
    },
    headerText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30,
        textAlign: 'center',
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 30,
    },
    action: {
        flexDirection: 'row',
        marginTop: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    input: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 50,
    },
    signIn: {
        flex: 1,
        justifyContent: 'center',
        margin: 20
    }
})