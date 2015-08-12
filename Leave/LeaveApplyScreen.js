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
    TouchableOpacity,
    ActivityIndicatorIOS,
    Image,
    Component,
    LayoutAnimation
    } = React;
var SceneNavBar = require('../Common/SceneNavBar');
var SideMenu = require('react-native-side-menu');
var NumberSelection = require('./NumberSelection');
var Mask = require('../Common/Mask');
var ConfirmApplyScene = require('./ConfirmApplyScene');
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;


class LeaveApplyScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            showStartDate:false,
            startDate: this._removeTime(Moment(new Date())).toDate(),
            showEndDate:false,
            endDate:new Date(),
            halfDay:false,
            halfDayEnable:false,
            noOfDays:1,
            leaveType:'Paid',
        };
    }
    onStartDateChange(date){
        var halfDayEnableValue = false;

        var dateWithoutTime_m =  this._removeTime(Moment(date));
        date = dateWithoutTime_m.toDate();
        //console.log("selected date:"+date);
        if(this.state.noOfDays > 1){
            halfDayEnableValue = false;
        }else{
            halfDayEnableValue = true;
        }

        this.setState({startDate: date, halfDayEnable: halfDayEnableValue});

    }
     _removeTime(date) {
        return date.hour(0).minute(0).second(0).millisecond(0);
    }
    handleStartDateSelect(){
        LayoutAnimation.easeInEaseOut();
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
        LayoutAnimation.easeInEaseOut();
        this.setState({showStartDate:false});
        this.setState({showEndDate:!this.state.showEndDate});
    }

    onCommentFocus(){
        LayoutAnimation.easeInEaseOut();
        this.setState({showStartDate:false});
        this.setState({showEndDate:false});
    }

    handleSubmit(){

    }
    onDaysSelected(number){
        LayoutAnimation.easeInEaseOut();
        this.setState({noOfDays:parseInt(number),showStartDate:false});
    }
    onRightClick(){
        this.refs.sideMenu.left ? this.refs.sideMenu.closeMenu() :
            this.refs.sideMenu.openMenu();


        //this.setState({loading:true});
        //var self = this;


    }
    onSubmit(leaveDateList){


        this.refs.sideMenu.closeMenu();
        var int = setInterval(()=>{
                clearInterval(int);
                this.setState({loading:true});
            },0);
        var interval = setInterval(()=>{
            clearInterval(interval);
                this.props.navigator.pop();
            }
            , 1000);
    }
    onCancel(){
        this.props.navigator.pop();
    }
    render(){
        var menu = <ConfirmApplyScene
                leaveType={this.state.leaveType}
                appliedNoOfDays={this.state.noOfDays}
                paidLeaveBalance={this.props.paidLeaveBalance}
                wfhLeaveBalance={this.props.wfhLeaveBalance}
                availableCompOff={this.props.availableCompOff}
                startDate={this.state.startDate}
                onSubmit={this.onSubmit.bind(this)}/>
        //rightIcon={require('image!holidays')}
        return(
            <SideMenu ref="sideMenu"  menu={menu} openMenuOffset={screenWidth - 40} touchToClose={true} menuPosition='right' disableGestures={true}>
            <View style={styles.container}>
                <SceneNavBar title="Apply Leave"
                             backgroundColor="#FFFFFF"
                             onLeftClick={this.onCancel.bind(this)} leftTitle="Cancel"
                             rightTitle="Done"
                             onRightClick={this.onRightClick.bind(this)}/>

                <ScrollView
                    style={styles.scrollView}>
                        <View style={[{margin: 10},{marginTop:0}]}>
                            <SegmentedControlIOS tintColor="#78909c" values={['Paid', 'Work from Home']} selectedIndex={0} />
                        </View>
                        <View style={styles.datePickerView}>
                            <Text style={styles.dateLabel}>Start Date</Text>
                            <TouchableOpacity   onPress={this.handleStartDateSelect.bind(this)}>
                                {
                                    this.state.showStartDate ?
                                <View style={styles.button}>
                                    <Text style={styles.selectedDateLabelPickerOpen}>{Moment(this.state.startDate).format("MMM Do YY")}</Text>
                                </View>
                                    :
                                <View style={styles.button}>
                                    <Text style={styles.selectedDateLabel}>{Moment(this.state.startDate).format("MMM Do YY")}</Text>
                                </View>
                                }
                            </TouchableOpacity>
                        </View>
                            {
                                this.state.showStartDate ?
                                <DatePickerIOS
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
                                            onValueChange={(value) => {LayoutAnimation.easeInEaseOut();this.setState({halfDay: value}); this.onCommentFocus()}}
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
        backgroundColor:'#FFFFFF'
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


});

module.exports = LeaveApplyScreen;
