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


var SceneNavBar = require('./SceneNavBar');
var SideMenu = require('react-native-side-menu');
var MyLeaveListView = require('./MyLeaveListView');



class Menu extends React.Component{
    about(){
        //this.props.menuActions.close();
        //this.props.navigator.pop();
    }

    render(){
        return (
            <ScrollView style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{
              uri: 'http://pickaface.net/includes/themes/clean/img/slide2.png'
            }}/>
                    <Text style={{ position: 'absolute', left: 70, top: 20 }}>Yogesh Patel</Text>
                </View>

                <Text style={styles.item}>About</Text>
                <Text style={styles.item}>Contacts</Text>
            </ScrollView>
        );
    }
}

class MyLeaveDetail extends React.Component{


    onLeftClick(){
        this.refs.sideMenu.left ? this.refs.sideMenu.closeMenu() : this.refs.sideMenu.openMenu()
    }
    onRightClick(){
        this.props.navigator.push({name:'Apply Leave',index:1});
    }
    showPaidLeaveList(){
        console.log("Show Paid Leave");
    }
    render(){
        var menu = <Menu navigator={navigator}/>;
        return (
            <SideMenu ref="sideMenu"  menu={menu} touchToClose={true} disableGestures={true}>
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
                        <MyLeaveListView />
                    </View>

                </View>
            </SideMenu>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1
    },
    listView:{
        flex:1,
        backgroundColor:'red'
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

    menu: {
        flex: 1,
        width: window.width,
        height: window.height,

        padding: 20
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
