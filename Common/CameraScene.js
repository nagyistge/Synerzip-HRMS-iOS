/**
 * Created by synerzip on 05/08/15.
 */
'use strict';

var React = require('react-native');

var {
    View,
    TouchableHighlight,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    Component,
    StatusBarIOS
    } = React;
var SceneNavBar = require('./SceneNavBar');
var Camera = require('react-native-camera');
var Mask = require('./Mask');
class CameraScene extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cameraType: Camera.constants.Type.front
        };
    }
    onCancel(){
        StatusBarIOS.setStyle('default');
        this.props.topNavigator.pop();
    }
    switchCamera(){
        var state = this.state;
        state.cameraType = state.cameraType === Camera.constants.Type.back
            ? Camera.constants.Type.front : Camera.constants.Type.back;
        this.setState(state);
    }
    componentDidMount(){
        //console.log("Mount Camera...");
        StatusBarIOS.setStyle('light-content');
    }
    captureImage(){
        //console.log("onCapture:"+this.props.onCapture);
        this.setState({loading:true});
        this.refs.cam.capture((err, data)=> {
            console.log(err, data);
            this.props.onCapture(data);
        });
    }
    render(){

        return(
            <View style={styles.container}>
                <SceneNavBar title=""
                    leftTitle="Cancel"
                    rightIcon={require('image!flipcamera')}
                    onRightClick={this.switchCamera.bind(this)}
                    onLeftClick={this.onCancel.bind(this)}/>
                    <Camera
                    ref="cam"
                    style={styles.cameraContainer}
                    type={this.state.cameraType}>
                    </Camera>
                <View style={styles.bottomPanel}>
                    <TouchableOpacity onPress={this.captureImage.bind(this)}>
                        <Image source={require('image!capture')} style={styles.captureImage}/>
                    </TouchableOpacity>
                </View>
                <Mask loading={this.state.loading} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    cameraContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    container:{
        flex:1,
        backgroundColor:"#000000"
    },
    bottomPanel:{
        position:'absolute',
        backgroundColor:'#000000',
        opacity:0.4,
        bottom:0,
        height:50,
        right:0,
        left:0,
    },
    captureImage:{
        width:40,
        height:40,
        alignSelf:'center'
    }


});
module.exports = CameraScene;
