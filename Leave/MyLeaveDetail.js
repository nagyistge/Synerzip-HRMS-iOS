/**
 * Created by synerzip on 23/07/15.
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TextInput,
    View,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicatorIOS,
    Image,
    Component
    } = React;


var SceneNavBar = require('../Common/SceneNavBar');
var SideMenu = require('react-native-side-menu');
var MyLeaveListView = require('./MyLeaveListView');
var LeaveBalanceBox = require('./LeaveBalanceBox');

var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;
var MyLeaveFilterScreen = require('./MyLeaveFilterScreen');


class MyLeaveDetail extends React.Component{
    constructor(props){
        super(props);
        this.originalFilterState = {
                pendingApproval:true,
                rejected:true,
                canceled:true,
                scheduled:true,
                taken:true,
                all:true
        };
        this.modifiedFilterState = {
            pendingApproval:true,
            rejected:true,
            canceled:true,
            scheduled:true,
            taken:true,
            all:true
        };
    }

    onLeftClick(){
        this.refs.sideMenu.left ? this.refs.sideMenu.closeMenu() : this.refs.sideMenu.openMenu()
    }
    onRightClick(){
        this.props.navigator.push({name:'Apply Leave',index:1});
    }
    showPaidLeaveList(){
        console.log("Show Paid Leave");
    }
    onModifiedFilter(modifiedFilters){
        this.modifiedFilterState = modifiedFilters;

    }
    isFilterChanges(){
        if(this.originalFilterState.pendingApproval != this.modifiedFilterState.pendingApproval){
            return true;
        }
        if(this.originalFilterState.rejected != this.modifiedFilterState.rejected){
            return true;
        }
        if(this.originalFilterState.canceled != this.modifiedFilterState.canceled){
            return true;
        }
        if(this.originalFilterState.scheduled != this.modifiedFilterState.scheduled){
            return true;
        }
        if(this.originalFilterState.taken != this.modifiedFilterState.taken){
            return true;
        }
        return false;
    }
    sideMenuChange(open){
        if(open && this.isFilterChanges()) {
            this.props.fetchMyLeaveData(this.modifiedFilterState);
            this.originalFilterState = this.modifiedFilterState;

            console.log("pendingApprovalStatus:param "+this.originalFilterState.pendingApproval);
            console.log("rejected:param "+this.originalFilterState.rejected);
            console.log("canceled:param "+this.originalFilterState.canceled);
            console.log("scheduled:param "+this.originalFilterState.scheduled);

            console.log("taken:param "+this.originalFilterState.taken);
            console.log("all:param "+this.originalFilterState.all);
        }

    }
    render(){
        var menu = <MyLeaveFilterScreen  modifiedFilterState = {this.modifiedFilterState}
                onModifiedFilter={this.onModifiedFilter.bind(this)}/>;
        return (
            <SideMenu onChange={this.sideMenuChange.bind(this)} openMenuOffset={screenWidth - 40} ref="sideMenu"  menu={menu} touchToClose={true} disableGestures={true}>
                <View style={styles.container}>
                    <SceneNavBar title="My Leave" onRightClick={this.onRightClick.bind(this)} rightTitle="Apply"
                                 leftIcon={require('image!filter')}
                                 onLeftClick={this.onLeftClick.bind(this)}/>
                    <LeaveBalanceBox paidBalance={17} wfhBalance={3}/>
                    <View style={styles.listView}>
                        <MyLeaveListView myLeavListData={this.props.myLeavListData}
                                         myLeaveListLoaded={this.props.myLeaveListLoaded}
                                         loadMoreData={this.props.loadMoreData}
                                         cancelLeave={this.props.cancelLeave}/>
                    </View>

                </View>
            </SideMenu>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF'
    },
    listView:{
        flex:1,
        backgroundColor:'transparent'
    },


});

module.exports = MyLeaveDetail;
