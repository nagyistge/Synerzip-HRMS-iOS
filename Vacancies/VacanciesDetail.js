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
    TouchableWithoutFeedback,
    Navigator,
    Image,
    Animated,
    Component,
    LayoutAnimation
    } = React;

var simpleAuthClient = require('react-native-simple-auth');
var secret = require('../Common/secret');
var SceneNavBar = require('../Common/SceneNavBar');
var Mask = require('../Common/Mask');
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var KDSocialShare = require('NativeModules').KDSocialShare;

class VacanciesDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shareOpen:false,
            bounceValue: new Animated.Value(0),
            mask:false
        };
    }
    componentWillMount() {
        //simpleAuthClient.configure(secret);
    }
    onBack(){
        var interval = setInterval(()=>{
                clearInterval(interval);
                this.props.topNavigator.pop();
            },0);

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
                friction: 7,
                tension:30
                // Bouncier spring
            }
        ).start(()=>{
            this.setState({shareOpen:false})
        });

    }
    onFacebookClick(){
        console.log("Facebook Login:::::::::::::::");
        this.setState({mask:true});
        KDSocialShare.shareOnFacebook({
                'text':this.props.selectedData.title,
                'link':this.props.selectedData.link,
                'image': 'logo',
            },
            (results) => {
                console.log(results);
                this.setState({mask:false});
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
        console.log("Twiitteeer Login:::::::::::::::")
        this.setState({mask:true});
        KDSocialShare.tweet({
                'text':this.props.selectedData.title,
                'link':this.props.selectedData.link,
                //'imagelink':'https://artboost.com/apple-touch-icon-144x144.png',
                //or use image
                'image': 'logo',
            },
            (results) => {
                console.log(results);
                this.setState({mask:false});
            }
        );
    }
    onUploadSelection(){
        this.props.onUploadSelect(this.props.selectedData);
    }
    render(){

        var role = this.props.selectedData.role.map((value,index)=>{
                return (
                <Text style={[styles.infoValue,{textAlign:'justify'}]}>
                    <Text style={{color:"#0d47a1"}}>{index+1}{'. '}</Text>{value}
                </Text>);
            });

        var technicalMustHave = null;
        var technicalNiceToHave = null;
        var nonTechnical = null;
        var notes = null;
        if(this.props.selectedData.skills.technical){
            if(this.props.selectedData.skills.technical.mustHave){
                technicalMustHave = this.props.selectedData.skills.technical.mustHave.map((value,index)=>{
                    return (
                        <Text style={[styles.infoValue,{textAlign:'justify'}]}>
                            <Text style={{color:"#0d47a1"}}>{index+1}{'. '}</Text>{value}
                        </Text>);
                        });
            }
            if(this.props.selectedData.skills.technical.niceToHave){
                technicalNiceToHave = this.props.selectedData.skills.technical.niceToHave.map((value,index)=>{
                    return (
                         <Text style={[styles.infoValue,{textAlign:'justify'}]}>
                            <Text style={{color:"#0d47a1"}}>{index+1}{'. '}</Text>{value}
                        </Text>);
                    });
            }
        }

        if(this.props.selectedData.skills.nonTechnical){

            nonTechnical = this.props.selectedData.skills.nonTechnical.map((value,index)=>{
                    return (
                                <Text style={[styles.infoValue,{textAlign:'justify'}]}>
                        <Text style={{color:"#0d47a1"}}>{index+1}{'. '}</Text>{value}
                    </Text>);
                    });

        }
        if(this.props.selectedData.extraInfo){

            notes = this.props.selectedData.extraInfo.map((value,index)=>{
                return (
                    <Text style={[styles.infoValue,{textAlign:'justify'}]}>
                        <Text style={{color:"#0d47a1"}}>{index+1}{'. '}</Text>{value}
                    </Text>);
            });

        }
        var header = <SceneNavBar title="Job Detail" leftIcon={require('image!back')} leftTitle="Back" rightIcon={require('image!upload')}
                    onLeftClick={this.onBack.bind(this)} onRightClick={this.onShareOpen.bind(this)}/>;
        if(this.props.forUpload){
            header = <SceneNavBar title="Job Detail" leftIcon={require('image!back')} leftTitle="Back" rightTitle='Select'
            onLeftClick={this.onBack.bind(this)} onRightClick={this.onUploadSelection.bind(this)}/>;
        }
        return (
            <View style={styles.container}>
                {header}
                <View style={[styles.separator,{marginTop:10}]} />
                <View style={[styles.jobTitle,{height:30}]}>
                    <Text style={styles.titleText}>{this.props.selectedData.title}</Text>
                </View>
                <ScrollView style={styles.scrollView}
                contentInset={{bottom:49}}
                automaticallyAdjustContentInsets={false}>
                    <View style={{flex:1}}>

                        <View style={styles.separator} />
                        <View style={styles.infoBox}>
                            <Text style={styles.infoTitle}>Position</Text>
                        </View>
                        <View style={styles.separator} />
                        <View style={styles.infoValueBox}>
                            <Text style={styles.infoValue}>{this.props.selectedData.position}</Text>
                            <Text style={[styles.infoValue,{color:"#0d47a1"}]}>{this.props.selectedData.experience}</Text>
                        </View>
                        <View style={styles.separator} />
                            <View style={styles.infoBox}>
                                <Text style={styles.infoTitle}>Role</Text>
                            </View>
                        <View style={styles.separator} />
                        <View style={styles.infoValueBox}>
                            {role}
                        </View>

                        {technicalMustHave?
                            <View>
                                <View style={styles.separator} />
                                <View style={styles.infoBox}>
                                    <Text style={styles.infoTitle}>Technical Skills</Text>
                                </View>
                                <View style={styles.separator} />
                                <View style={styles.infoValueBox}>
                                    {technicalMustHave}
                                </View>
                            </View>

                        :   <Text>{''}</Text>}
                        {technicalNiceToHave?
                            <View>
                                <View style={styles.separator} />
                                <View style={styles.infoBox}>
                                    <Text style={styles.infoTitle}>Nice to Have Skills</Text>
                                </View>
                                <View style={styles.separator} />
                                <View style={styles.infoValueBox}>
                                    {technicalNiceToHave}
                                </View>
                            </View>
                        :<Text>{''}</Text>}

                        {nonTechnical?
                            <View>
                                <View style={styles.separator} />
                                <View style={styles.infoBox}>
                                    <Text style={styles.infoTitle}>Non Technical Skills</Text>
                                </View>
                                <View style={styles.separator} />
                                <View style={styles.infoValueBox}>
                                    {nonTechnical}
                                </View>
                            </View>
                        :<Text>{''}</Text>}

                        {notes ?
                            <View>
                                <View style={styles.separator} />
                                <View style={styles.infoBox}>
                                    <Text style={styles.infoTitle}>Note</Text>
                                </View>
                                <View style={styles.separator} />
                                <View style={styles.infoValueBox}>
                                    {notes}
                                </View>
                             </View>
                        :<Text>{''}</Text>}

                    </View>
                </ScrollView>

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
                {this.state.mask
                    ? <Mask />
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
        marginTop:0
    },
    jobTitle:{
        backgroundColor:"#78909c",
        padding:5
    },
    infoBox:{
        padding:10,
        flex:1,
        flexDirection:'row'
    },
    infoValueBox:{
        padding:10,
        flex:1,
    },
    infoTitle:{
        fontSize:15,
    },
    infoValue:{
      fontSize:15,
      color:'#9e9e9e'
    },
    titleText:{
        fontSize:15,
        color:"#FFFFFF",
        textAlign:'center',
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
        fontSize:18,
        color:"#2979ff",
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