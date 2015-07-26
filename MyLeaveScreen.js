/**
 * Created by synerzip on 23/07/15.
 */
'use strict';

var React = require('react-native');

var MyLeaveDetail = require('./MyLeaveDetail');
var LeaveApplyScreen = require('./LeaveApplyScreen');

var {
    StyleSheet,
    Text,
    Navigator,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Component,
    StatusBarIOS
    } = React;




class MyLeaveScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profilePic:null
        }
    }
    _renderScene(route,navigator){
        if(route.index == 0){
            return (
                <MyLeaveDetail navigator={navigator}/>
            );
        }else if(route.index == 1){
            return <LeaveApplyScreen navigator={navigator}/>;
        }
    }
    componentDidMount(){
        StatusBarIOS.setStyle('default');
    }
    render(){
        StatusBarIOS.setStyle('default');
        return (
        <Navigator
            initialRoute={{name: 'My Leave', index: 0}}
            configureScene={(route) => Navigator.SceneConfigs.FloatFromBottom}
            renderScene={(route, navigator) =>
                       this. _renderScene(route,navigator)
                       }
            />

        );
    }
}

var styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 30,
        margin: 80
    },
    container: {
        flex: 1
    },
    image:{
        width:50,
        height:50
    }

});

module.exports = MyLeaveScreen;