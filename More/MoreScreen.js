/**
 * Created by synerzip on 25/07/15.
 */
'use strict';

var React = require('react-native');

var {
    View,
    TouchableOpacity,
    Image,
    StyleSheet,
    Text,
    Component,
    StatusBarIOS,
    NavigatorIOS
    } = React;
var ActionSheetIOS = require('ActionSheetIOS');

class MoreView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileImage:{uri: 'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/000/2ac/208/1318b23.jpg'}
        };
    }
    onImageChange(newImage){
        this.setState({profileImage:newImage});
    }
    onMyProfileSelected(){
        var ProfileScreen = require('./ProfileScreen');
        this.props.navigator.push({
            component: ProfileScreen,
            title: 'My Profile',
            rightButtonTitle:'Done',
            passProps: { onImageChange: this.onImageChange.bind(this),profileImage:this.state.profileImage,topNavigator:this.props.topNavigator },

        });
    }
    render(){

        return(
            <View style={styles.container}>
                <View style={styles.titleBox}>
                    <Text style={styles.title}>{' '}</Text>
                </View>
                <View style={styles.optionBox}>
                <TouchableOpacity onPress={this.onMyProfileSelected.bind(this)}>
                    <View style={styles.option}>
                        <Image source={this.state.profileImage}
                        style={styles.profileImage}/>
                        <View style={styles.optionTextBox}>
                            <Text style={styles.optionText}>My Profile</Text>
                            <View style={styles.separator} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.option}>
                        <Image source={require('image!conference')} style={styles.profileImage}/>
                        <View style={styles.optionTextBox}>
                            <Text style={styles.optionText}>Meeting Room Booking</Text>
                            <View style={styles.separator} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.option}>
                        <Image source={require('image!helpdesk')} style={styles.profileImage}/>
                        <View style={styles.optionTextBox}>
                            <Text style={styles.optionText}>Help Desk Request</Text>
                            <View style={styles.separator} />
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.option}>
                        <Image source={require('image!holidays')} style={styles.profileImage}/>
                        <View style={styles.optionTextBox}>
                            <Text style={styles.optionText}>Holidays</Text>
                            <View style={styles.separator} /></View>
                        </View>
                </TouchableOpacity>

                <TouchableOpacity>
                    <View style={styles.option}>
                        <Image source={require('image!appsetting')} style={styles.profileImage}/>
                    <View style={styles.optionTextBox}>
                    <Text style={styles.optionText}>Application Setting</Text>
                    <View style={styles.separator} />
                    </View>
                    </View>
                </TouchableOpacity>

                </View>
            </View>
        );
    }
}
class MoreScreen extends React.Component {

        componentDidMount(){

        }
        render() {

            return (
                <NavigatorIOS
                    ref="nav"
                    barTintColor="#FFFFFF"
                    titleTextColor="#37474f"
                    style={[{flex:1}]}
                    initialRoute={{
                            component: MoreView,
                            title: 'More',
                            passProps: { topNavigator: this.props.topNavigator },


            }}
                />

            );
        }
}

var styles = StyleSheet.create({
    container: {
        flex:1,

    },
    titleBox:{
        paddingTop:30,
        justifyContent:'center'
    },

    title: {
        fontSize: 20,
        color: "#FFFFFF",
        marginBottom: 5,
        alignSelf:'center'
    },

    optionBox:{
        flex:1,
        marginTop:20
    },
    option:{
        flexDirection:'row',
        padding:10
    },
    optionTextBox:{
        flex:1,
        padding:10
    },
    profileImage:{
        height:35,
        width:35,
    },
    optionText:{
        fontSize:15,
        color:"#37474f",
        margin:10,
        marginTop:0

    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd',
    },


});


module.exports = MoreScreen;
