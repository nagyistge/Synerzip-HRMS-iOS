/**
 * Created by synerzip on 10/08/15.
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Navigator,
    Image,
    Animated,
    Component,
    LayoutAnimation,
    WebView
    } = React;

var SceneNavBar = require('../Common/SceneNavBar');
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var Mask = require('../Common/Mask');
class UploadResumeScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loading:false,
            selectedData:null
        }
    }

    onUpload(){

        this.setState({loading:true});
        var interval = setInterval(()=>{
                 clearInterval(interval);
                 this.onCancel();
        }
        , 1000);
    }

    onCancel(){
        this.props.onUploadCancel();
    }
    onUploadSelect(selectedData){

        this.props.topNavigator.popToTop();
        var sche = setInterval(()=>{
                clearInterval(sche);
                this.setState({selectedData:selectedData});
            },0);


    }
    onPositionClick(selectedData){
            this.props.topNavigator.push({name: 'Vacancies', index: 0,forUpload:true,
                onUploadSelect:this.onUploadSelect.bind(this)});
    }
    render(){
        var selectedPosition = "Any Open Position";
        if(this.state.selectedData){
            selectedPosition = this.state.selectedData.title;
        }
        return (
            <View style={styles.container}>
                <SceneNavBar title="Upload Resume"  leftTitle="Cancel" rightTitle="Upload"
                onLeftClick={this.onCancel.bind(this)} onRightClick={this.onUpload.bind(this)}/>
                <View style={[styles.separator,{marginTop:10}]} />
                <View style={{height:40},{width:screenWidth}}>
                    <View style={styles.infoBox}>
                        <Text style={styles.infoTitle}>Open Position</Text>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoBox}>
                        <TouchableOpacity onPress={this.onPositionClick.bind(this)}>
                            <View style={styles.button}>
                                <Text style={styles.infoValue}>{selectedPosition}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.separator} />
                <ScrollView style={{flex:1}}>
                    <WebView automaticallyAdjustContentInsets={false}
                            style={styles.webView}
                            url={this.props.receivedUrl}
                            startInLoadingState={true}
                            scalesPageToFit={true}>
                    </WebView>
                </ScrollView>
                <Mask loading={this.state.loading} />
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        paddingTop:4
    },
    separator: {
        height: 0.5,
        backgroundColor: '#dddddd',
        marginTop:0
    },
    infoBox:{
        padding:10,
        justifyContent:'center',
        flexDirection:'row',

    },
    button: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',

    },
    infoValueBox:{
        padding:10,

        textAlign:'right'
    },
    infoTitle:{
        fontSize:15,
    },
    infoValue:{
        fontSize:15,
        color:'#9e9e9e'
    },
    webView: {
        backgroundColor: 'rgba(255,255,255,0.8)',
        height:400,
    },
});

module.exports = UploadResumeScreen;
