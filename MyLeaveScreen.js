/**
 * Created by synerzip on 23/07/15.
 */
'use strict';

var React = require('react-native');




var {
    StyleSheet,
    Text,
    Navigator,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Component,
    StatusBarIOS
    } = React;



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
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:1,
        id:8
    },
    {
        date:'Fri, 17 Jul 2015',
        type:'Paid Leave',
        status:'pending',
        noOfDays:1,
        id:9
    }
];


class MyLeaveScreen extends React.Component{
    constructor(props){
        super(props);
        this.startIndex = 0;
        this.state = {
            profilePic:null,
            myLeavListData:{
                data:[],
                totalRecordCount:0,
                offset:10,
                startIndex:0
            },
            myLeaveListLoaded:false
        }
    }
    fetchData(){
        var intervalObj = setInterval(()=>{

            clearInterval(intervalObj);
            this.setState({
                myLeavListData:{
                    data:dataList,
                    totalRecordCount:28,
                    offset:10,
                    startIndex:0
                },
                myLeaveListLoaded:true
            });
        },1000);
    }

    loadMoreData(onDone){
        var dataArray = [];
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });
        dataArray.push({
            date:'Fri, 17 Jul 2015',
            type:'Paid Leave',
            status:'pending',
            noOfDays:1,
            id:9
        });

        var intervalObj = setInterval(()=>{
            clearInterval(intervalObj);
            this.startIndex += 10;
            this.state.myLeavListData = {
                data:this.state.myLeavListData.data.concat(dataArray),
                totalRecordCount:28,
                offset:10,
                startIndex: this.startIndex
            }

            onDone(this.state.myLeavListData);


        },3000);

    }

    cancelLeave(onDone,data){
        var dataBlob = [];
        var dataList =  this.state.myLeavListData.data;
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
        this.state.myLeavListData = {
            data:dataBlob,
            totalRecordCount:this.state.myLeavListData.totalRecordCount,
            offset:this.state.myLeavListData.offset,
            startIndex: this.state.myLeavListData.startIndex
        }
        onDone(this.state.myLeavListData);

    }

    _renderScene(route,navigator){
        if(route.index == 0){
            var MyLeaveDetail = require('./MyLeaveDetail');
            return (
                <MyLeaveDetail navigator={navigator}
                               myLeavListData={this.state.myLeavListData}
                               myLeaveListLoaded ={this.state.myLeaveListLoaded}
                               loadMoreData={this.loadMoreData.bind(this)}
                               cancelLeave={this.cancelLeave.bind(this)}/>
            );
        }else if(route.index == 1){
            var LeaveApplyScreen = require('./LeaveApplyScreen');
            return <LeaveApplyScreen navigator={navigator}/>;
        }
    }
    componentDidMount(){
        StatusBarIOS.setStyle('default');
        this.fetchData();
    }
    render(){

        StatusBarIOS.setStyle('default');
        return (
        <Navigator
            initialRoute={{name: 'My Leave', index: 0}}
            configureScene={(route) => Navigator.SceneConfigs.FloatFromBottom}
            renderScene={(route, navigator) =>
                        this. _renderScene(route,navigator)
                       }
            />

        );
    }
}

var styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 30,
        margin: 80
    },
    container: {
        flex: 1
    },
    image:{
        width:50,
        height:50
    }

});

module.exports = MyLeaveScreen;