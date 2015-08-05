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
        this.state={
            modifiedFilterState:this.props.modifiedFilterState
        };
        this.modifiedFilterState =this.props.modifiedFilterState;

    }
    isAllStatusSelectedExcept(param){
        if(param == 'pendingApproval'){
            return this.modifiedFilterState.rejected &&
                this.modifiedFilterState.canceled &&
                this.modifiedFilterState.scheduled &&
                this.modifiedFilterState.taken;

        }else if(param == 'rejected'){
            return this.modifiedFilterState.pendingApproval &&
                this.modifiedFilterState.canceled &&
                this.modifiedFilterState.scheduled &&
                this.modifiedFilterState.taken;

        }else if(param == 'canceled'){
            return this.modifiedFilterState.pendingApproval &&
                this.modifiedFilterState.rejected &&
                this.modifiedFilterState.scheduled &&
                this.modifiedFilterState.taken;

        }else if(param == 'scheduled'){
            return this.modifiedFilterState.pendingApproval &&
                this.modifiedFilterState.rejected &&
                this.modifiedFilterState.canceled &&
                this.modifiedFilterState.taken;

        }else if(param == 'taken'){
            return this.modifiedFilterState.pendingApproval &&
                this.modifiedFilterState.rejected &&
                this.modifiedFilterState.canceled &&
                this.modifiedFilterState.scheduled;

        }
        return false;
    }
    onSelect(param,value){
        var allStatus = this.modifiedFilterState.all;
        var pendingApprovalStatus = this.modifiedFilterState.pendingApproval;
        var rejectedStatus = this.modifiedFilterState.rejected;
        var canceledStatus = this.modifiedFilterState.canceled;
        var scheduledStatus = this.modifiedFilterState.scheduled;
        var takenStatus = this.modifiedFilterState.taken;
        if(param == 'all'){
            allStatus = value;
            if(allStatus == true){
                pendingApprovalStatus = true;
                rejectedStatus = true;
                canceledStatus = true;
                scheduledStatus = true;
                takenStatus = true;
            }else{
                pendingApprovalStatus = false;
                rejectedStatus = false;
                canceledStatus = false;
                scheduledStatus = false;
                takenStatus = false;
            }
        }else if(param == 'pendingApproval'){
            pendingApprovalStatus = value;
            if(pendingApprovalStatus == false){
                allStatus = false;
            }else if(this.isAllStatusSelectedExcept(param)){
                allStatus = true;
            }
        }else if(param == 'rejected'){
            rejectedStatus = value;
            if(rejectedStatus == false){
                allStatus = false;
            }else if(this.isAllStatusSelectedExcept(param)){
                allStatus = true;
            }
        }else if(param == 'canceled'){
            canceledStatus = value;
            if(canceledStatus == false){
                allStatus = false;
            }else if(this.isAllStatusSelectedExcept(param)){
                allStatus = true;
            }
        }else if(param == 'scheduled'){
            scheduledStatus = value;
            if(pendingApprovalStatus == false){
                allStatus = false;
            }else if(this.isAllStatusSelectedExcept(param)){
                allStatus = true;
            }
        }else if(param == 'taken'){
            takenStatus = value;
            if(takenStatus == false){
                allStatus = false;
            }else if(this.isAllStatusSelectedExcept(param)){
                allStatus = true;
            }
        }

        this.modifiedFilterState = {
            pendingApproval:pendingApprovalStatus,
            rejected:rejectedStatus,
            canceled:canceledStatus,
            scheduled:scheduledStatus,
            taken:takenStatus,
            all:allStatus

        };
        this.props.onModifiedFilter(this.modifiedFilterState);
        this.setState({modifiedFilterState: this.modifiedFilterState});

        console.log("pendingApprovalStatus:param "+this.modifiedFilterState.pendingApproval);
        console.log("rejected:param "+this.modifiedFilterState.rejected);

    }

    render(){
        return (
            <View style={styles.filterContainer}>
                <Text style={styles.title}>Show Leave with Status</Text>

                <ScrollView style={[styles.menu,styles.centerAlign]}>
                    <CheckMarkSelection  label="All" onPress={this.onSelect.bind(this)}
                    paramKey= 'all' selected={this.state.modifiedFilterState.all}/>
                    <CheckMarkSelection  label="Pending Approval" onPress={this.onSelect.bind(this)}
                    paramKey= 'pendingApproval' selected={this.state.modifiedFilterState.pendingApproval}/>
                    <CheckMarkSelection label="Rejected" onPress={this.onSelect.bind(this)}
                    paramKey= 'rejected' selected={this.state.modifiedFilterState.rejected}/>
                    <CheckMarkSelection label="Cancelled" onPress={this.onSelect.bind(this)}
                    paramKey= 'canceled' selected={this.state.modifiedFilterState.canceled}/>
                    <CheckMarkSelection label="Scheduled" onPress={this.onSelect.bind(this)}
                    paramKey= 'scheduled' selected={this.state.modifiedFilterState.scheduled}/>
                    <CheckMarkSelection label="Taken" onPress={this.onSelect.bind(this)}
                    paramKey= 'taken' selected={this.state.modifiedFilterState.taken}/>
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
