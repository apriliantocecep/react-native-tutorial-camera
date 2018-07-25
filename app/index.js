import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Camera, Permissions } from "expo";

export default class App extends React.Component {
    state = {
        hasCameraPermission: null,
        type: Camera.Constants.Type.back
    }

    async componentWillMount() {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);

        this.setState({
            hasCameraPermission: status === 'granted'
        });
    }

    _handlePress = () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back
        })
    }

    snap = async () => {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync();
            console.log(photo);
        }
    };

    render() {
        const { hasCameraPermission } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        } else {
            return (
                <View style={styles.container}>
                    <Camera style={styles.cameraContainer}
                        type={this.state.type}
                        ref={ref => this.camera = ref}
                    >
                        <View style={styles.cameraWrapper}>
                            <TouchableOpacity style={styles.cameraButtonContainer}
                                onPress={this.snap}
                            >
                                <Text style={styles.cameraButtonText}>
                                    {' '}Take Photo{' '}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Camera>
                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    cameraContainer: {
        flex: 1
    },
    cameraWrapper: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row'
    },
    cameraButtonContainer: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center'
    },
    cameraButtonText: {
        fontSize: 18,
        marginBottom: 10,
        color: 'white'
    }
});
