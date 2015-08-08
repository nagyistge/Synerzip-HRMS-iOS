/**
 * Created by synerzip on 06/08/15.
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Navigator,
    Image,
    Animated,
    Component,
    LayoutAnimation
    } = React;

var simpleAuthClient = require('react-native-simple-auth');
var secret = require('../Common/secret');
var SceneNavBar = require('../Common/SceneNavBar');
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var KDSocialShare = require('NativeModules').KDSocialShare;

class VacanciesDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shareOpen:false,
            bounceValue: new Animated.Value(0),
        };
    }
    componentWillMount() {
        simpleAuthClient.configure(secret);
    }
    onBack(){
        this.props.topNavigator.pop();
    }
    onShareOpen(){
        this.setState({shareOpen:true});
        this.state.bounceValue.setValue(1.5);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                toValue: 1,                         // Animate to smaller size
                friction: 3,
                tension:10// Bouncier spring
            }
        ).start();
    }
    onShareCancel(){

        this.state.bounceValue.setValue(1);     // Start large
        Animated.spring(                          // Base: spring, decay, timing
            this.state.bounceValue,                 // Animate `bounceValue`
            {
                toValue: 0,                         // Animate to smaller size
                friction: 10,
                // Bouncier spring
            }
        ).start(()=>{
            this.setState({shareOpen:false})
        });

    }
    onFacebookClick(){
        console.log("Facebook Login:::::::::::::::");
        KDSocialShare.shareOnFacebook({
                'text':'Global democratized marketplace for art',
                'link':'https://artboost.com/',
                'imagelink':'https://artboost.com/apple-touch-icon-144x144.png'
            },
            (results) => {
                console.log(results);
            }
        );
    }
    onLinkedInClick(){
        console.log("Linked In Login:::::::::::::::");
        simpleAuthClient.authorize("linkedin-web")
            .then(info => {
                console.log(info);
            })
            .catch(error => {
                React.AlertIOS.alert(
                'Authorize Error',
                error && error.description || 'Unknown');

            });

    }
    onTwitterClick(){
        console.log("Twiitteeer Login:::::::::::::::");
        KDSocialShare.tweet({
                'text':'Global democratized marketplace for art',
                'link':'https://artboost.com/',
                //'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
                //or use image
                'image': 'logo',
            },
            (results) => {
                console.log(results);
            }
        );
    }
    render(){
        console.log("Selected Data:::::"+this.props.selectedData);
        return (
            <View style={styles.container}>
                <SceneNavBar title="Job Detail" leftIcon={require('image!back')} leftTitle="Back" rightIcon={require('image!upload')}
                            onLeftClick={this.onBack.bind(this)} onRightClick={this.onShareOpen.bind(this)}/>
                <View style={styles.separator} />
                <ScrollView style={styles.scrollView}
                contentInset={{bottom:49}}
                automaticallyAdjustContentInsets={false}>
                    <View style={{flex:1}}>
                        <View style={styles.jobTitle}>
                            <Text style={styles.titleText}>{this.props.selectedData.title}</Text>
                        </View>
                        <View style={styles.separator} />
                    </View>
                </ScrollView>
                {this.state.shareOpen ?
                <View style={styles.masking} />
                :<Text>{''}</Text>}
                {this.state.shareOpen ?


                    <Animated.View style={[styles.shareContainer,
                                            {transform: [                        // `transform` is an ordered array
                                             {scale: this.state.bounceValue},  // Map `bounceValue` to `scale`
                                            ]}]}>
                        <ScrollView style={styles.shareScroll} horizontal={true} automaticallyAdjustContentInsets={false}>
                            <View style={styles.shareOptionScrollView}>
                                <TouchableOpacity onPress={this.onFacebookClick.bind(this)}>
                                    <Image source={require('image!facebook')} style={styles.image}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onTwitterClick.bind(this)}>
                                    <Image source={require('image!twitter')} style={styles.image}/>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.onLinkedInClick.bind(this)}>
                                    <Image source={require('image!linkedin')} style={styles.image}/>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require('image!email')} style={styles.image}/>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                        <TouchableOpacity onPress={this.onShareCancel.bind(this)}>
                            <View style={styles.shareCancelBox}>
                                    <Text style={styles.cancelText}>Cancel</Text>
                            </View>
                        </TouchableOpacity>
                    </Animated.View>

                :<Text>{''}</Text>}

            </View>
        );
    }
}

var styles= StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        paddingTop:4
    },
    separator: {
        height: 0.5,
        backgroundColor: '#dddddd',
        marginTop:10
    },
    jobTitle:{
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        padding:10
    },
    titleText:{
        fontSize:15,
        fontWeight:'400'
    },
    shareContainer:{
        position:'absolute',
        backgroundColor:"#eeeeee",
        height:100,
        bottom:50,
        left:0,
        right:0,


    },
    masking: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#000000',
        opacity: 0.2
    },
    shareScroll:{
        height:70,
        flex:1
    },
    shareCancelBox:{
        height:30,
        justifyContent:'center',

    },
    cancelText:{
        fontSize:15,
        color:"#2196f3",
        alignSelf:'center'
    },
    shareOptionScrollView:{
        height:70,
        width:screenWidth,
        flex:1,
        flexDirection:'row',
        justifyContent:'center',
        padding:10

    },
    image:{
        width:50,
        height:50,
        marginLeft:20
    }
});

module.exports = VacanciesDetail;