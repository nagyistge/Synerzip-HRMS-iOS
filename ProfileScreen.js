/**
 * Created by synerzip on 25/07/15.
 */
'use strict';

var React = require('react-native');

var {
    View,
    TouchableHighlight,
    Image,
    StyleSheet,
    Text,
    Component,
    StatusBarIOS
    } = React;
var ActionSheetIOS = require('ActionSheetIOS');
var BUTTONS = [
    'Edit Profile',
    'Upload Photo',
    'Delete Photo',
    'Cancel',
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;

class ProfileScreen extends React.Component {
    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            (buttonIndex) => {
                if(buttonIndex == 1){
                    this.props.onCameraOpen();
                }
            });
    }
    componentDidMount(){
        StatusBarIOS.setStyle('light-content');
    }
    render() {
        StatusBarIOS.setStyle('light-content');
        return (
            <View style={styles.container}>
                <View style={styles.leaveBalanceBox}>

                    <View style={styles.userBox}>
                        <View style={styles.avtar}>
                            <TouchableHighlight underlayColor='#99d9f4' onPress={this.showActionSheet.bind(this)}>
                                {
                                    this.props.profilePic == null ?
                                        <Image source={require('image!profile')} style={styles.image}/>
                                        :
                                        <Image source={this.props.profilePic} style={styles.image}/>
                                }

                            </TouchableHighlight>
                        </View>
                        <View style={styles.userNameBox}>
                            <Text style={styles.userName}>Yogesh Patel</Text>
                            <Text style={styles.designation}>Solutions Architect</Text>
                        </View>
                    </View>

                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    leaveBalanceBox:{
        backgroundColor:'#37474f',
        padding:20,
        paddingTop:30
    },
    text: {
        color: 'black',
        fontSize: 30,
        margin: 80
    },

    userBox: {
        height: 50,
        alignSelf: 'stretch',
        flexDirection: 'row'

    },
    userNameBox: {
        flexDirection: 'column'
    },
    userName: {
        fontSize: 20,
        color: "#FFFFFF",
        marginBottom: 5
    },
    designation: {
        fontSize: 12,
        color: "#FFFFFF",
        marginLeft: 4
    },
    avtar: {
        height: 54,
        backgroundColor: "#FFFFFF",
        width: 54,
        marginRight: 10
    },
    image: {
        width: 54,
        height: 54
    },

});


module.exports = ProfileScreen;
