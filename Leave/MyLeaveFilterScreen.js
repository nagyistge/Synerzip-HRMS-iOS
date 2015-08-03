/**
 * Created by synerzip on 02/08/15.
 */
'use strict'

var React = require('react-native');

var {
    StyleSheet,
    Text,
    ScrollView,
    View,
    TouchableOpacity
    } = React;

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var CheckMarkSelection = require('../Common/CheckMarkSelection');
var SceneNavBar = require('../Common/SceneNavBar');

class MyLeaveFilterScreen extends React.Component{
    constructor(props){
        super(props);
        this.modifiedFilterState =this.props.modifiedFilterState;

    }

    onSelect(param,value){
        var pendingApprovalStatus = this.modifiedFilterState.pendingApproval;
        var rejectedStatus = this.modifiedFilterState.rejected;
        var canceledStatus = this.modifiedFilterState.canceled;
        var scheduledStatus = this.modifiedFilterState.scheduled;
        var takenStatus = this.modifiedFilterState.taken;

        if(param == 'pendingApproval'){
            pendingApprovalStatus = value;
        }else if(param == 'rejected'){
            rejectedStatus = value;
        }else if(param == 'canceled'){
            canceledStatus = value;
        }else if(param == 'scheduled'){
            scheduledStatus = value;
        }else if(param == 'taken'){
            takenStatus = value;
        }
        console.log("pendingApprovalStatus:param"+pendingApprovalStatus+":"+param);
        this.modifiedFilterState = {
            pendingApproval:pendingApprovalStatus,
            rejected:rejectedStatus,
            canceled:canceledStatus,
            scheduled:scheduledStatus,
            taken:takenStatus

        };
        this.props.onModifiedFilter(this.modifiedFilterState);
    }

    render(){
        return (
            <View style={styles.filterContainer}>
                <Text style={styles.title}>Show Leave with Status</Text>

                <ScrollView style={[styles.menu,styles.centerAlign]}>
                    <CheckMarkSelection  label="Pending Approval" onPress={this.onSelect.bind(this)}
                    paramKey= 'pendingApproval' selected={this.props.modifiedFilterState.pendingApproval}/>
                    <CheckMarkSelection label="Rejected" onPress={this.onSelect.bind(this)}
                    paramKey= 'rejected' selected={this.props.modifiedFilterState.rejected}/>
                    <CheckMarkSelection label="Cancelled" onPress={this.onSelect.bind(this)}
                    paramKey= 'canceled' selected={this.props.modifiedFilterState.canceled}/>
                    <CheckMarkSelection label="Scheduled" onPress={this.onSelect.bind(this)}
                    paramKey= 'scheduled' selected={this.props.modifiedFilterState.scheduled}/>
                    <CheckMarkSelection label="Taken" onPress={this.onSelect.bind(this)}
                    paramKey= 'taken' selected={this.props.modifiedFilterState.taken}/>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    title:{
        alignSelf:'center',
        fontSize:18,
        color:'#37474f',
        fontWeight:'500'
    },

    menu: {
        flex: 1,
        width: window.width,
        height: window.height - 30,

    },
    filterContainer:{
        padding: 30,
        paddingTop:50,
        flex:1
    },
    centerAlign:{
        alignSelf:'center',
    }
});

module.exports = MyLeaveFilterScreen;
