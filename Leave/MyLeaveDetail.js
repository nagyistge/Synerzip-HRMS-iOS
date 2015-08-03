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
                taken:true
        };
        this.modifiedFilterState = {
            pendingApproval:true,
            rejected:true,
            canceled:true,
            scheduled:true,
            taken:true
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
                    <View style={styles.leaveBalanceBox}>
                        <View style={styles.balanceBox}>
                            <TouchableOpacity onPress={this.showPaidLeaveList.bind(this)}>
                                <View style={styles.leaveBox} >
                                    <Text style={styles.balance}>12/21</Text>
                                    <Text style={styles.leaveType}>Paid Leave</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={styles.separator} >
                                <Text>{''}</Text>
                            </View>
                            <TouchableOpacity onPress={this.showPaidLeaveList.bind(this)}>
                                <View style={styles.wfhBox} >
                                    <Text style={styles.balance}>1/3</Text>
                                    <Text style={styles.leaveType}>Work From Home</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
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
    leaveBalanceBox:{
        backgroundColor:'#37474f',
        marginTop:5,
        padding:20,
        paddingTop:5
    },
    balanceBox:{
        alignSelf:'stretch',
        flexDirection:'row',
        marginTop:5
    },
    leaveBox:{
        flexDirection:'column',
        marginRight:10,
        alignSelf:'flex-start',
        flex:1,
        height:40
    },
    wfhBox:{
        flexDirection:'column',
        alignSelf:'flex-end',
        marginRight:10,
        flex:1,
        height:40
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


    caption: {
        fontSize: 20,
        fontWeight: 'bold',
        alignItems: 'center',
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1
    },
    item: {
        fontSize: 14,
        fontWeight: '300',
        paddingTop: 5,
    },

});

module.exports = MyLeaveDetail;
