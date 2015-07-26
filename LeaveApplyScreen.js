/**
 * Created by synerzip on 23/07/15.
 */
'use strict';

var React = require("react-native");
var Moment = require("moment");
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
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
    } = React;
var SceneNavBar = require('./SceneNavBar');
var SideMenu = require('react-native-side-menu');
var NumberSelection = require('./NumberSelection');
var Mask = require('./Mask');
class Menu extends React.Component{


    render(){
        return (
            <ScrollView style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{
              uri: 'http://pickaface.net/includes/themes/clean/img/slide2.png'
            }}/>
                    <Text style={{ position: 'absolute', left: 70, top: 20 }}>Your name</Text>
                </View>

                <Text style={styles.item}>About</Text>
                <Text style={styles.item}>Contacts</Text>
            </ScrollView>
        );
    }
}

class LeaveApplyScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showStartDate:false,
            startDate: new Date(),
            showEndDate:false,
            endDate:new Date(),
            halfDay:false,
            halfDayEnable:false,
            noOfDays:1
        };
    }
    onStartDateChange(date){
        var halfDayEnableValue = false;
        console.log("Difference:"+(Moment(date) > Moment(this.state.endDate)));
        if(Moment(date) > Moment(this.state.endDate)){
            halfDayEnableValue = true;
        }
        this.setState({startDate: date, halfDayEnable: halfDayEnableValue});

    }
    handleStartDateSelect(){
        this.setState({showEndDate:false});
        this.setState({showStartDate:!this.state.showStartDate});
    }

    onEndDateChange(date){
        var halfDayEnableValue = false;
        if(this.state.startDate == this.state.endDate){
            halfDayEnableValue = true;
        }
        this.setState({endDate: date, halfDayEnable: halfDayEnableValue});

    }

    handleEndDateSelect(){
        this.setState({showStartDate:false});
        this.setState({showEndDate:!this.state.showEndDate});
    }

    onCommentFocus(){
        this.setState({showStartDate:false});
        this.setState({showEndDate:false});
    }

    handleSubmit(){

    }
    onDaysSelected(number){
        this.setState({noOfDays:parseInt(number)});
    }
    onRightClick(){
        //this.refs.sideMenu.left ? this.refs.sideMenu.closeMenu() : this.refs.sideMenu.openMenu()
        this.setState({loading:true});
        var self = this;
        var interval = setInterval(function () {
            clearInterval(interval);
            self.props.navigator.pop();}, 1000);

    }
    onCancel(){
        this.props.navigator.pop();
    }
    render(){
        var menu = <Menu />
        //rightIcon={require('image!holidays')}
        return(
            <SideMenu ref="sideMenu"  menu={menu} touchToClose={true} menuPosition='right' disableGestures={true}>
            <View style={styles.container}>
                <SceneNavBar title="Apply Leave" onLeftClick={this.onCancel.bind(this)} leftTitle="Cancel"
                             rightTitle="Apply"
                             onRightClick={this.onRightClick.bind(this)}/>

                <ScrollView
                    style={styles.scrollView}>
                        <View style={[{margin: 10},{marginTop:0}]}>
                            <SegmentedControlIOS tintColor="#78909c" values={['Paid', 'Work from Home']} selectedIndex={0} />
                        </View>
                        <View style={styles.datePickerView}>
                            <Text style={styles.dateLabel}>Start Date</Text>
                            <TouchableHighlight style={styles.button} underlayColor='#eceff1' onPress={this.handleStartDateSelect.bind(this)}>
                                {
                                    this.state.showStartDate ?
                                <Text style={styles.selectedDateLabelPickerOpen}>{Moment(this.state.startDate).format("MMM Do YY")}</Text>
                                    :
                                <Text style={styles.selectedDateLabel}>{Moment(this.state.startDate).format("MMM Do YY")}</Text>
                                }
                            </TouchableHighlight>
                        </View>
                            {
                                this.state.showStartDate ?
                                <DatePickerIOS
                                maximumDate={new Date(2016,2,30)}
                                minimumDate={new Date(2015,2,30)}
                                date={this.state.startDate}
                                onDateChange={this.onStartDateChange.bind(this)}
                                mode="date" />
                                    : <Text></Text>
                            }

                            <View style={styles.noOfDaysRow}>
                                <View>
                                    <Text style={[styles.dateLabel,{marginTop:5}]}>No of Days</Text>
                                </View>
                                <View>
                                    <View style={styles.daysBlock}>
                                        <NumberSelection value='1' selected={this.state.noOfDays == 1}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='2' selected={this.state.noOfDays == 2}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='3' selected={this.state.noOfDays == 3}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='4' selected={this.state.noOfDays == 4}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='5' selected={this.state.noOfDays == 5}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                    </View>
                                    <View style={[styles.daysBlock,{marginTop:5}]}>
                                        <NumberSelection value='6' selected={this.state.noOfDays == 6}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='7' selected={this.state.noOfDays == 7}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='8' selected={this.state.noOfDays == 8}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='9' selected={this.state.noOfDays == 9}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                        <NumberSelection value='10' selected={this.state.noOfDays == 10}
                                                         onDaysSelected={this.onDaysSelected.bind(this)}/>
                                    </View>
                                </View>
                            </View>


                            {
                                this.state.noOfDays == 1 ?
                                    <View style={[styles.datePickerView,{marginTop:10}]}>
                                        <Text style={[styles.dateLabel,{marginTop:10}]}>Half Day</Text>
                                        <View style={[styles.button,{marginBottom: 10,marginTop:5}]}>
                                            <SwitchIOS
                                            onValueChange={(value) => {this.setState({halfDay: value}); this.onCommentFocus()}}
                                            value={this.state.halfDay} />
                                        </View>
                                    </View> : <Text style={{height:0}}></Text>
                            }

                            <TextInput style={styles.commentBox} placeholder="Comment..." multiline={true}
                                    onFocus={this.onCommentFocus.bind(this)}></TextInput>





                </ScrollView>


            </View>
                <Mask loading={this.state.loading} />
           </SideMenu>
        );
    }
}


var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    leaveBalanceBox:{
        backgroundColor:'#37474f',
        height:80,
        marginTop:5,
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

    button: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'center',
        height:25
    },
    datePickerView:{
        marginLeft:15,
        flexDirection:'row',
        fontWeight:'bold',

    },
    noOfDaysRow:{
        marginLeft:15,
        flexDirection:'row',
        flex:1
    },
    daysBlock:{
        flexDirection:'row',
        flex:1
    },
    noTopBorder:{

    },
    commentBox:{
      height:55,
      padding:10,
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius:4,
      marginLeft:15,
      marginRight:15,
      marginTop:10,
      color: '#37474f',
      fontSize: 15,
    },
    selectedDateLabelPickerOpen:{
        color:'#ef5350',
        marginTop:2,
        fontSize: 15,
    },
    selectedDateLabel:{
        color:'#42a5f5',
        marginTop:2,
        fontSize: 15,
    },
    dateLabel:{
        color: '#37474f',
        backgroundColor: 'white',
        fontSize: 15,
        marginTop:2
    },
    text: {
        color: 'black',
        backgroundColor: 'white',
        fontSize: 30,
        margin: 80
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
    scrollView: {
        backgroundColor: '#FFFFFF',
        height: 300,
    },
    submitButton: {
        margin:10,
        marginTop:40,
        height: 36,
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
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
    slider: {
        height: 10,
        margin: 10,
    },

});

module.exports = LeaveApplyScreen;
