'use strict';

var React = require('react-native');
var LoginScreen = require('./LoginScreen');
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
    } = React;

var images = {

   hrms:require('image!hrms')
};
class HelloWorld extends React.Component{
    render(){
        return (
            <Text style={styles.text}>Hello World!!!</Text>
        );
    }
}
class SynerzipHRMS extends React.Component{
    render (){
        return (
            <LoginScreen images={images}/>
        );
    }
}

var styles = React.StyleSheet.create({
   text:{
       color:'#000000',
       fontSize:40,
       margin:80
   },
    container:{
        flex:1
    }
});


React.AppRegistry.registerComponent('SynerzipHRMS',() => SynerzipHRMS);