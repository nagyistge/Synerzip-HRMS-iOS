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

var SlideMenu = require('../Common/SlideMenu');
var ListLoadingIndicator = require('../Common/ListLoadingIndicator');
var ActionSheetIOS = require('ActionSheetIOS');
var BUTTONS = [

    'Cancel Leave',
    'Cancel',
];
var DESTRUCTIVE_INDEX = 0;
var CANCEL_INDEX = 1;

class MyLeaveListView extends React.Component{
    showActionSheet(data) {
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
            },
            (buttonIndex) => {
                if(buttonIndex == 0){
                        this.props.cancelLeave((myLeaveData)=>{
                            this.currentDataList = myLeaveData.data;
                            this.setState({
                                dataSource: this.state.dataSource.cloneWithRows(myLeaveData.data)});
                    },data);
                }else if(buttonIndex == 1){

                    var dataBlob = [];
                    if(this.currentDataList && this.currentDataList.length == 0){
                        this.currentDataList = this.props.myLeavListData.data;
                    }
                    console.log("this.currentDataList:::"+this.currentDataList);
                    var dataList =  this.currentDataList;
                    for(var index =0 ; index < dataList.length; index++){
                    var temp = dataList[index];
                    if(temp.id == data.id){
                        var newData = {
                            date:data.date,
                            type:data.type,
                            status:data.status,
                            noOfDays:data.noOfDays,
                            cancelOperation:true,
                            id:data.id
                        };
                        dataBlob.push(newData);

                    }else{
                        dataBlob.push(temp);
                    }
                    }
                    this.setState({
                            dataSource: this.state.dataSource.cloneWithRows(dataBlob)});

                }
             });
    }
    constructor(props){
        super(props);
        this.canLoadMore = false;
        this.currentDataList = this.props.myLeavListData.data;
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) =>  {
                if(row1.cancelOperation !== row2.cancelOperation){
                        return true;
                }
                if( row1.status !== row2.status){
                    return true;
                }
                 return false;
              },
            }),
            loading:false,
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
    componentWillReceiveProps(nextProps){
        //console.log("Receieving Props in List View::::::::::::::::::::::::"+nextProps.myLeavListData.data.length);
        if(!this.props.myLeaveListLoaded) {
            this.calculateCanLoadMore(nextProps.myLeavListData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.myLeavListData.data),

            });
        }

    }
    calculateCanLoadMore(directoryData){
        var totalRecordCount = directoryData.totalRecordCount;
        var startIndex = directoryData.startIndex;
        var offset = directoryData.offset;
        if((startIndex + offset) >= totalRecordCount){
            this.canLoadMore = false;
        }else{
            this.canLoadMore = true;
        }
       // console.log("caN lOAD mORE::::::"+ this.canLoadMore);
    }
    componentDidMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.myLeavListData.data)
        });
    }
    loadMore(){

        if(this.state.loading || !this.canLoadMore){
            return;
        }
        this.setState({loading:true});

        //Load More Data
        this.props.loadMoreData((myLeaveData)=>{
            this.currentDataList = myLeaveData.data;
            this.calculateCanLoadMore(myLeaveData);
            this.setState({
                loading:false,
                dataSource: this.state.dataSource.cloneWithRows(myLeaveData.data)});
        });
    }
    cancelLeave(data){

        this.showActionSheet(data);

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
            data={data}
            cancelAction={data.cancelOperation}
            renderLeftView = {() => this.renderOptions(data)}
            renderCenterView = {() => this.getCenter(data)} />
        );
    }
    render (){
        if (!this.props.myLeaveListLoaded) {
            return this.renderLoadingView();
        }

        return (
            <View style={[{flex:1}]}>
                <ListView
                    dataSource={this.state.dataSource}
                    onEndReached={this.loadMore.bind(this)}
                    renderRow={this.renderData.bind(this)}
                    style={styles.listView}
                    automaticallyAdjustContentInsets={false}
                    contentInset={{bottom:49}}
                    scrollEventThrottle={300}
                    onEndReachedThreshold={2}
                    directionalLockEnabled={true}
                    pageSize={10}
                    />
                    {
                        this.state.loading ?
                    <ListLoadingIndicator />
                    :<Text>{''}</Text>
                    }

            </View>
        );

    }
}

var styles = StyleSheet.create({


    listView: {
        backgroundColor: 'transparent',
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