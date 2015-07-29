/**
 * Created by synerzip on 25/07/15.
 */
'use strict'

var React  = require('react-native');

var {
    StyleSheet,
    Text,
    ListView,
    View,
    ScrollView,
    ActivityIndicatorIOS,
    TouchableHighlight,
    TouchableOpacity,
    Component
    } = React;

var SlideMenu = require('./SlideMenu');


var dataList = [
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'canceled',
        noOfDays:0.5,
        id:0
    },
    {
        date:'Tue, 30 Jun 2015 to Thu, 02 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:3,
        id:1
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:1,
        id:2
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:1,
        id:3
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'approved',
        noOfDays:1,
        id:4
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:1,
        id:5
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:1,
        id:6
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:1,
        id:7
    }
];

class MyLeaveListView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        }
    }

    renderLoadingView(){
        return (
            <View style={styles.container}>
                <ActivityIndicatorIOS
                    animating={true}
                    style={[styles.loading, {height: 80}]}
                    size="large" />

            </View>
        );
    }
    fetchData(){


        var intervalObj = setInterval(()=>{
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(dataList),
                loaded: true,
            });
            clearInterval(intervalObj);
        },1000);




    }
    componentDidMount(){
        this.fetchData();
    }

    cancelLeave(data){
        console.log('Cancelling leave...');
        var dataBlob = [];
        for(var index =0 ; index < dataList.length; index++){
            var temp = dataList[index];
            if(temp.id == data.id){
                var newData = {
                    date:data.date,
                    type:data.type,
                    status:'canceled',
                    noOfDays:data.noOfDays,
                    id:data.id
                };
                dataBlob.push(newData);

            }else{
                dataBlob.push(temp);
            }
        }
        dataList = dataBlob;
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(dataBlob)
        });


    }
    renderOptions(data){
        return(
            <View style={styles.optionsBox}>
                <TouchableOpacity onPress={this.cancelLeave.bind(this,data)}>
                    <View style={styles.option}>
                        <Text style={styles.optionText}>Cancel</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    getCenter(data){

        var pendingStatus = null;
        if(data.status == 'pending'){
            pendingStatus = {
                color:'#bdbdbd',
                fontStyle:'italic'
            };
        }else if(data.status == 'approved'){
            pendingStatus = {
                color:'#81c784'
            };

        }
        return(
            <TouchableHighlight>
                <View>
                    <View style={styles.container}>
                        <View style={styles.rightContainer}>
                            <View style={styles.leaveRow}>
                                <View style={styles.leaveDateBox}>
                                    <Text style={styles.leaveDate}>{data.date}</Text>
                                </View>
                                <View style={styles.noOfDaysBox}>
                                    <Text style={styles.noOfDay}>{data.noOfDays + " Days"}</Text>
                                </View>
                            </View>
                            <View style={styles.leaveRow}>
                                <View style={styles.leaveDateBox}>
                                    <Text style={styles.leavType}>{data.type}</Text>
                                </View>
                                <View style={styles.noOfDaysBox}>
                                    <Text style={[styles.leaveStatus,pendingStatus ]}>{
                                        data.status == 'pending' ? 'Pending Approval' : data.status == 'approved' ? 'Approved' :
                                            'Canceled'}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }
    renderData(data){
        if(data.status == 'canceled' || data.status == 'approved'){
             return this.getCenter(data);
        }
        return (
        <SlideMenu
            renderLeftView = {() => this.renderOptions(data)}
            renderCenterView = {() => this.getCenter(data)} />
        );
    }
    render (){
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderData.bind(this)}
                style={styles.listView}
                automaticallyAdjustContentInsets={false}
                contentInset={{bottom:49}}
                />
        );

    }
}

var styles = StyleSheet.create({


    listView: {
        backgroundColor: '#FFFFFF',
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 10
    },
    leaveRow:{
        flex: 1,
        flexDirection: 'row',
        padding:3,
        paddingRight:0,
        paddingLeft:0
    },
    leaveDateBox:{
        flex:1,
        alignSelf:'flex-start'
    },
    noOfDaysBox:{
        alignSelf:'flex-end'
    },
    rightContainer: {
        flex: 1
    },
    leaveDate: {
        fontSize: 15,
        fontWeight:'400'
    },
    leaveStatus:{
        color:'#ff9800'
    },

    leavType: {
        textAlign: 'left',
        color:'#9e9e9e'
    },
    noOfDay:{
        textAlign: 'right',
    },
    optionsBox:{
        flex:1
    },
    option:{
        backgroundColor:'#f44336',
        width:120,
        height:68,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionText:{
        fontSize:20,
        color:'#FFFFFF'
    },
    rowContainer: {
        flex: 1,
    },

});

module.exports = MyLeaveListView;