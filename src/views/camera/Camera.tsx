import React, { useEffect, useState, useRef } from 'react';
import { AppRegistry, StyleSheet, Text, TouchableOpacity, View, Linking, Image, Dimensions, Alert } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';
import { connect } from 'react-redux'
import { tabbarTure,tabbarFalse } from '../../redux/action/actionTabbar'

function App(props:any) {
  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');

  const [showCamera, setshowCamera] = useState(false);
  const [imagesource, setimagesource] = useState('');

  useEffect(() => {
    async function getPermission() {
      const permission = await Camera.requestCameraPermission();
      if (permission === 'denied') await Linking.openSettings();
    }
    getPermission();
    
  }, []);

  const capturePhoto = async () => {
    if (camera.current !== null) {
      const photo = await camera.current.takePhoto();
      setimagesource(photo.path);
     
      setshowCamera(false);
    }
  };

  if (device == null) {
    return <Text>没有相机</Text>;
  }

  return (
    <View style={styles.container}>
      {
        showCamera ? (
          <>
            <Camera
              style={StyleSheet.absoluteFill}
              ref={camera}
              device={device}
              isActive={showCamera}
              photo={true}
              orientation='portrait'
            ></Camera>

            <View style={styles.backButton}>
              <TouchableOpacity
                style={{
                  height: 32,
                  width: 60,
                  borderRadius: 20,
                  backgroundColor: 'white',
                  
                }}
                onPress={() => setshowCamera(false)}
              >
                <Text style={{ color: 'black', fontWeight: '500', textAlign: 'center', lineHeight:30 }}>Back</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.camButton}
                onPress={() => capturePhoto()}
              >
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <>
            {
              imagesource !== '' ? (
                <Image
                  style={styles.image}
                  source={{
                    uri: 'file://' + imagesource,
                  }}
                ></Image>
              ) : null
            }
            <View>
              <View style={{
                flexDirection: 'row',
                alignItems: 'center'
              }}>
                {
                  imagesource !== '' ? (
                    <TouchableOpacity
                      style={{
                        flex: 1,
                        backgroundColor: 'blue',
                        margin: 10,
                        padding: 12,
                        justifyContent: 'center',
                        alignContent: 'center',
                        width: 30,
                        borderRadius: 20,
                      }}
                      onPress={() => {
                        setimagesource("");
                        Alert.alert("已保存");
                      }}
                    >
                      <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center' }}>OK</Text>
                    </TouchableOpacity>
                  ) : null
                }
                <TouchableOpacity
                  style={{
                    flex: 1,
                    backgroundColor: 'blue',
                    margin: 10,
                    padding: 12,
                    justifyContent: 'center',
                    alignContent: 'center',
                    width: 30,
                    borderRadius: 20,
                  }}
                  onPress={() => setshowCamera(true)}
                >
                  <Text style={{ color: 'white', fontWeight: '500', textAlign: 'center' }}>Take Photo</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )
      }
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center'
  },
  button: {
    backgroundColor: 'gray',
  },
  backButton: {
    backgroundColor: 'rgba(0,0,0,0,0)',
    position: 'absolute',
    justifyContent: 'center',
    width: '100%',
    top: 0,
    padding: 20
  },
  buttonContainer: {
    backgroundColor: 'rgba(0,0,0,0,2)',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    bottom: 0,
    padding: 20
  },
  camButton: {
    height: 60,
    width: 60,
    borderRadius: 20,
    backgroundColor: '#B2BE85',
    alignSelf: 'center',
    borderWidth: 4,
    borderColor: 'white'
  },
  image: {
    width: '90%',
    height: '90%',
    marginLeft:18,
  }
});

export default connect(null,{ tabbarTure,tabbarFalse })(App);