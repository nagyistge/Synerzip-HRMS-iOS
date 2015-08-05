/**
 * Created by synerzip on 29/07/15.
 */
'use restrict';

var React = require('react-native');
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
    PickerIOS,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
    }=React;
var PickerItemIOS = PickerIOS.Item;
var SceneNavBar = require('../Common/SceneNavBar');
var LeaveBalanceBox = require('./LeaveBalanceBox');
class ConfirmApplyScene extends React.Component{
    constructor(props){
        super(props);
        this.applicableLeaveList = [],


        this.state = {
            applicableLeave: 0,
            paidLeaveBalance:this.props.paidLeaveBalance,
            wfhLeaveBalance:this.props.wfhLeaveBalance,
            holidayExcluded:false,
            compOff:false,
            availableCompOffDays:this.props.availableCompOff,
            appliedNoOfDays:this.props.appliedNoOfDays,
            startDate:this.props.startDate,
            endDate:this.props.startDate
        }
    }
    calculateLeaves(appliedNoOfDays,paidLeaveBalance,compOff){
        //console.log("selected date:"+this.state.startDate);
        var endDate = Moment(this.state.startDate).add(appliedNoOfDays-1,'d').toDate();

        var leaveDateList = [];
        var isWeekendAvailable = false;
        var startTempDate = Moment(this.state.startDate).clone();
        var endTempDate = Moment(endDate).clone();
        //console.log("startTempDate:"+startTempDate +" endDate:"+endTempDate);
        for(var index = 0 ; index < appliedNoOfDays; index++){
            var weekDay = startTempDate.day();
            if(weekDay == 0 || weekDay == 6){
                isWeekendAvailable = true;
            }else{
                leaveDateList.push(startTempDate);
            }
            startTempDate.add(1,'d');
        }



        //console.log("Final List:"+leaveDateList.length);
        this.applicableLeaveList = leaveDateList;

        this.setState({endDate:endDate});
        var applicableLeave = leaveDateList.length;
        var remaingCompOff = this.props.availableCompOff;
        if(compOff){
            console.log("compOffcompOffcompOff:"+remaingCompOff)
            applicableLeave = applicableLeave - remaingCompOff;
            if(applicableLeave < 0){
                remaingCompOff = remaingCompOff - this.props.appliedNoOfDays;
                applicableLeave = 0;

            }else{
                remaingCompOff = 0;

            }

        }
        var paidLeaveBalance = paidLeaveBalance - applicableLeave;
        this.setState({holidayExcluded:isWeekendAvailable,
            applicableLeave:applicableLeave,
            paidLeaveBalance: paidLeaveBalance,
            availableCompOffDays:remaingCompOff});
    }
    componentWillReceiveProps(nextProps){
        this.setState({startDate:nextProps.startDate});
        this.calculateLeaves(nextProps.appliedNoOfDays, nextProps.paidLeaveBalance,this.state.compOff);
    }
    componentDidMount(){
        this.calculateLeaves(this.props.appliedNoOfDays, this.props.paidLeaveBalance,this.state.compOff);
    }
    onConfirmClick(){
        this.props.onSubmit(this.applicableLeaveList);
    }
    compOffSelected(value){
        this.setState({compOff: value});
        this.calculateLeaves(this.props.appliedNoOfDays, this.props.paidLeaveBalance,value);

    }

    redeemCompOff(value){
        console.log("Redeen CompOff:::"+value);
        this.setState({selectedCompOffDays:value});
    }
    render(){
        return (
            <View style={styles.container}>
                <SceneNavBar title="Confirmation"
                    backgroundColor="#fafafa"
                    rightTitle="Submit"
                    onRightClick={this.onConfirmClick.bind(this)}/>
                <LeaveBalanceBox paidBalance={this.state.paidLeaveBalance} wfhBalance={this.state.wfhLeaveBalance}/>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.infoRow}>
                        <View style={styles.labelBox}>
                            <Text style={[styles.label,{fontWeight:'bold'},{color:"#01579b"}]}>
                                {Moment(this.state.startDate).format("MMM Do YY") +" "}
                                             - {Moment(this.state.endDate).format("MMM Do YY")}</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoRow}>
                        <View style={styles.labelBox}>
                            <Text style={styles.label}>Applicable Leave</Text>
                        </View>
                        <View style={styles.valueBox}>
                            <Text style={styles.value}>{this.state.applicableLeave} Days ({this.props.leaveType})</Text>
                        </View>
                    </View>
                    <View style={styles.separator} />
                    <View style={styles.infoRow}>
                    {
                        this.state.holidayExcluded ?
                            <View style={[styles.labelBox]}>
                             <Text style={[styles.label,{color:'#00c853'}]}>[Excluded Weekends and Holidays]</Text>
                            </View>
                            :
                            <View style={styles.labelBox}>
                            <Text style={styles.label}>[No Weekends and Holidays]</Text>
                            </View>

                    }

                    </View>
                    <View style={styles.separator} />

                    {
                        this.props.availableCompOff > 0 ?

                            <View style={[styles.infoRow,{marginBottom:0}]}>
                                    <View style={styles.labelBox}>
                                        <Text style={styles.label}>Redeem Comp Off</Text>
                                        <Text style={styles.label}>Available ({this.state.availableCompOffDays} Days)</Text>
                                    </View>
                                    <View style={styles.valueBox}>
                                        <SwitchIOS style={styles.value}
                                        onValueChange={(value) => {this.compOffSelected(value)}}
                                        value={this.state.compOff} />
                                    </View>
                            </View>

                            :
                        <View style={styles.infoRow}>
                                <View style={styles.labelBox}>
                                    <Text style={styles.label}>[No Comp Off Available]</Text>
                                </View>
                        </View>
                    }



                </ScrollView>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#fafafa"
    },
    scrollView: {
        backgroundColor: '#FFFFFF',
        flex:1,
        padding:10,
        paddingTop:0
    },
    infoRow:{
        flex:1,
        flexDirection:'row',
        alignSelf:'stretch',
        marginLeft:40,
        marginBottom:20,
        marginTop:20

    },
    labelBox:{
        flex:1,
        alignSelf:'flex-start',
    },
    label:{
        fontSize:15,
        color:"#37474f",
    },
    valueBox:{
        flex:1,
        alignSelf:'flex-end',
    },
    value:{
        fontSize:15,
        fontWeight:'bold',
        color:"#01579b",
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
});

module.exports = ConfirmApplyScene;
