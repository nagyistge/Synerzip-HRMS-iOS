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
    TextInput,
    Text,
    Component,
    StatusBarIOS,
    ScrollView
    } = React;
var ActionSheetIOS = require('ActionSheetIOS');
var BUTTONS = [
    'Choose Photo',
    'Take Photo',
    'Delete Photo',
    'Cancel',
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;

class ProfileScreen extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            profileImage:this.props.profileImage
        };
    }
    onCapture(newImage){
        //console.log("Captured Image:"+newImage);
        var newImage = {uri: newImage}
        this.props.onImageChange(newImage);
        this.setState({profileImage:newImage});
        this.props.topNavigator.pop();
    }
    showActionSheet() {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            (buttonIndex) => {
                if(buttonIndex == 1){
                    console.log("Opening Camera..............");
                    this.props.topNavigator.push({
                        name:'Take Photo',
                        index:1,
                        passProps: { onCapture: this.onCapture.bind(this) },
                    });
                }
            });
    }
    componentDidMount(){
        //StatusBarIOS.setStyle('light-content');
    }
    render() {
        StatusBarIOS.setStyle('default');
        //StatusBarIOS.setStyle('light-content');
         console.log("Top Navigator::::"+this.props.topNavigator);
        return (
            <View style={styles.container}>
                <View style={styles.leaveBalanceBox}>
                    <View style={styles.userBox}>
                        <View style={styles.avtar}>
                            <TouchableHighlight underlayColor='#99d9f4' onPress={this.showActionSheet.bind(this)}>
                                {
                                    this.props.profileImage == null ?
                                        <Image source={require('image!profile')} style={styles.image}/>
                                        :
                                        <Image source={this.state.profileImage} style={styles.image}/>
                                }

                            </TouchableHighlight>
                        </View>
                        <View style={styles.userNameBox}>
                            <Text style={styles.userName}>Yogesh Patel</Text>
                            <Text style={styles.designation}>Solutions Architect</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}
                    contentInset={{bottom:49}}
                    automaticallyAdjustContentInsets={false}>
                    <View>
                        <View style={styles.infoBox}>
                            <View style={styles.category}>
                                <Text style={styles.categoryText}>Personal Details</Text>
                            </View>
                            <View style={styles.property}>
                                 <Text style={[styles.propertyText,{color:"#37474f"}]}>Employee ID: 1111</Text>
                            </View>
                            <View style={styles.separator} />

                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.category}>
                                <Text style={styles.categoryText}>Mailing Address</Text>
                            </View>
                            <View style={styles.property}>
                                 <TextInput placeholder="Address Line 1" style={[styles.input]}
                                    value="Flat No. 903, D-Wing, Kakade City"></TextInput>
                                 <TextInput placeholder="Address Line 2" style={[styles.input]} value="Karave Nagar"></TextInput>
                                <TextInput placeholder="City" style={[styles.input]} value="Pune"></TextInput>
                                <TextInput placeholder="State" style={[styles.input]} value="Maharashtra"></TextInput>
                                <TextInput placeholder="zipcode" style={[styles.input]} value="411052"></TextInput>
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.category}>
                                    <Text style={styles.categoryText}>Permanent Address</Text>
                            </View>
                            <View style={styles.property}>
                                <TextInput multiline={true} placeholder="City" style={[styles.multiLineInput]}
                                value="Flat No. 903,\nD-Wing, Kakade City,\nKarave Nagar, Pune - 52 "></TextInput>
                             </View>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.category}>
                                <Text style={styles.categoryText}>Contacts</Text>
                            </View>
                            <View style={[styles.property]}>
                              <View style={styles.rowImage}>
                                <Image source={require('image!phone')} style={styles.infoImage}/>
                                <Text style={styles.categoryText}>Mobile Numbers</Text>
                              </View>
                              <TextInput placeholder="mobile..." style={[styles.input]} value="9960614174"></TextInput>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.property]}>
                                <View style={styles.rowImage}>
                                    <Image source={require('image!emrgencyno')} style={styles.infoImage}/>
                                    <Text style={styles.categoryText}>Home/Emergency Telephone</Text>
                                </View>
                                <TextInput placeholder="Home/Emergency Telephone" style={[styles.input]} value="9922469104"></TextInput>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.property]}>
                                <View style={styles.rowImage}>
                                    <Image source={require('image!workphone')} style={styles.infoImage}/>
                                    <Text style={styles.categoryText}>Work Phone</Text>
                                </View>
                                <TextInput placeholder="Work Phone" style={[styles.input]} value=""></TextInput>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.property]}>
                                    <View style={styles.rowImage}>
                                    <Image source={require('image!accesscode')} style={styles.infoImage}/>
                                    <Text style={styles.categoryText}>Access Code</Text>
                                    </View>
                                    <TextInput placeholder="Access Code" style={[styles.input]} value="91-582-8415-0"></TextInput>
                            </View>

                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.category}>
                                <Text style={styles.categoryText}>Email and IM</Text>
                            </View>
                            <View style={[styles.property]}>
                                <View style={styles.rowImage}>
                                <Image source={require('image!email')} style={styles.infoImage}/>
                                <Text style={styles.categoryText}>Work Email</Text>
                                </View>
                                <TextInput placeholder="Work Email" style={[styles.input]}
                                        value="yogesh.patel@synerzip.com"></TextInput>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.property]}>
                                <View style={styles.rowImage}>
                                    <Image source={require('image!personalemail')} style={styles.infoImage}/>
                                    <Text style={styles.categoryText}>Personal Email</Text>
                                </View>
                                <TextInput placeholder="Work Email" style={[styles.input]}
                                value="yogesh17.patel@gmail.com"></TextInput>
                            </View>
                            <View style={styles.separator} />
                            <View style={[styles.property]}>
                                <View style={styles.rowImage}>
                                <Image source={require('image!skype')} style={styles.infoImage}/>
                                <Text style={styles.categoryText}>Skype</Text>
                                </View>
                                <TextInput placeholder="Skype" style={[styles.input]}
                                value="yogesh.patel17"></TextInput>
                            </View>


                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:64

    },
    leaveBalanceBox:{
        backgroundColor:'#37474f',
        padding:10,

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
    scrollView:{
        flex: 1,
        width: window.width,
        height: window.height - 30,

    },
    infoBox:{
        flexDirection:'column',
        flex:1
    },
    category:{
        padding:10,
        backgroundColor:"#e0e0e0",
    },
    categoryText:{
        color:"#616161",
        fontSize:15,
        fontWeight:'400'
    },
    property:{
        padding:10,
        flex:1
    },
    propertyText:{
        color:"#616161",
        fontSize:15,
        fontWeight:'300'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    input: {
        height: 30,
        padding: 4,
        fontSize: 15,
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: '#B5B1B1',
        flex:1
    },
    multiLineInput:{
        height: 80,
        padding: 4,
        fontSize: 15,
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: '#B5B1B1',
    },
    contentContainer:{
        paddingVertical: 0
    },
    infoImage:{
        width:20,
        height:20,
        marginTop:0
    },
    rowImage:{
        flexDirection:'row',
        flex:1,
    }
});


module.exports = ProfileScreen;
