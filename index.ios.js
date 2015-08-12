'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component,
    AlertIOS,
    LinkingIOS
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
    constructor(props){
        super(props);
        this.state ={
            receivedUrl:null
        }
    }
    componentDidMount() {

        var url = LinkingIOS.popInitialURL();
        this.setState({receivedUrl:url});
        LinkingIOS.addEventListener('url', this._processURL.bind(this));
    }
    componentWillUnmount() {
        LinkingIOS.removeEventListener('url', this._processURL);
    }
    onUploadCancel(){
        this.setState({receivedUrl: null});
    }
    _processURL(e){
        //AlertIOS.alert("Index JS:"+e.url);
        this.setState({receivedUrl: e.url});
        console.log("URL::::::::::::::::::"+ e.url);
    }
    render (){
        var LoginScreen = require('./LoginScreen');
        return (
            <LoginScreen images={images} receivedUrl={this.state.receivedUrl} onUploadCancel={this.onUploadCancel.bind(this)}/>
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