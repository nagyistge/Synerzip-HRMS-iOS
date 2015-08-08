/**
 * Created by synerzip on 04/08/15.
 */

'use restrict';
var React = require("react-native");

var {
    StyleSheet,
    Text,
    SwitchIOS,
    TextInput,
    ScrollView,
    SliderIOS,
    SegmentedControlIOS,
    DatePickerIOS,
    View,
    Image,
    TouchableOpacity,
    Component
    } = React;

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

class LeaveBalanceBox extends React.Component{
    render(){
        return(
            <View style={styles.leaveBalanceBox}>
                <View style={styles.balanceBox}>
                    <TouchableOpacity>
                        <View style={styles.leaveBox} >
                            <Text style={styles.balance}>{this.props.paidBalance}/21</Text>
                            <Text style={styles.leaveType}>Paid Leave</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.wfhBox} >
                            <Text style={styles.balance}>{this.props.wfhBalance}/3</Text>
                            <Text style={styles.leaveType}>Work From Home</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    leaveBalanceBox:{
        backgroundColor:'#78909c',
        height:80,
        padding:20,
        paddingTop:15
    },
    balanceBox:{
        height:40,
        alignSelf:'stretch',
        flexDirection:'row',
        marginTop:5
    },
    leaveBox:{
        flexDirection:'column',
        marginRight:10,
        borderRightWidth:2,
        borderColor:"#FFFFFF",
        flex:1
    },
    wfhBox:{
        flexDirection:'column',
        marginRight:10,
        flex:1
    },
    separator:{
        borderColor:'#FFFFFF',
        borderWidth:1
    },
    leaveType:{
        alignSelf:'center',
        color:"#FFFFFF",
        fontSize:12
    },
    balance:{
        alignSelf:'center',
        color:"#FFFFFF",
        fontSize:25
    },
});

module.exports = LeaveBalanceBox;
