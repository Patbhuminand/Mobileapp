import React from 'react';
import { Text, View, TouchableOpacity,Image} from 'react-native';
import {Icon } from 'native-base';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export default class Camerasnap extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.back,
  };

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  takePictureAndCreateAlbum = async () => {
    const { uri } = await this.camera.takePictureAsync();
    const asset = await MediaLibrary.createAssetAsync(uri);
  };

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
        <Camera style={{ flex: 1 }}
              ref={ (ref) => {this.camera = ref} }
              type={this.state.type}>

              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
              }}>
              <View >
              <TouchableOpacity onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}>
                    <Icon style={{ color: '#d4d4d4'}} name="reverse-camera"/>
                </TouchableOpacity>
              </View>

              </View>

              <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
                <View >
                <TouchableOpacity onPress={this.takePictureAndCreateAlbum}>
                <Icon style={{ color: '#d4d4d4'}} name="camera"/>
                </TouchableOpacity>
                </View>
              </View>
          </Camera>
        </View>

      );
    }
  }
}
