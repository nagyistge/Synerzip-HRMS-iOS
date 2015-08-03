/**
 * Created by synerzip on 26/07/15.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    Text,
    ListView,
    TextInput,
    View,
    ScrollView,
    ActivityIndicatorIOS,
    TouchableHighlight,
    TouchableOpacity,
    Navigator,
    Component,
    AlertIOS,
    StatusBarIOS,
    Image
    } = React;




var SceneNavBar = require('../Common/SceneNavBar');
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

var dataList = [
    {
        fname:'Yogesh',
        lname:'Patel',
        project:'FuelQuest',
        phone:'9960614174',
        email:'yogesh.patel@synerzip.com',
        skype:'yogesh.patel17',
        empId:1111,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/000/2ac/208/1318b23.jpg'
    },
    {
        fname:'Nidhi',
        lname:'Harshad Shrikhande',
        project:'HR',
        phone:'9881255414',
        email:'nidhi@synerzip.com',
        skype:'nidhishrikhande',
        empId:1054,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/097/3d3/07a02ee.jpg'
    },
    {
        fname:'Ashutosh',
        lname:'Kumar',
        project:'Examsoft,RxNetwork,HRMS,SCS Renewables / Mercatus,Rezoomex',
        phone:'9881153955',
        email:'ashutosh@synerzip.com',
        skype:'ashutosh.kumar',
        empId:1362,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/1da/31e/354e7f1.jpg'
    },
    {
        fname:'Vrinda',
        lname:'Phadke',
        project:'FuelQuest,QSI,StepOne',
        phone:'9767123421',
        email:'vrinda.phadke@synerzip.com',
        skype:'vrinda.phadke',
        empId:1241,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/019/0fe/0d38430.jpg'
    },
    {
        fname:'Vaibhav',
        lname:'Patil',
        project:'FuelQuest',
        phone:'9881255414',
        email:'vaibhav.patil@synerzip.com',
        skype:'vaibhav.patil',
        empId:1054,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/7/000/255/196/04b28d6.jpg'
    },
    {
        fname:'Prashil',
        lname:'Gote',
        project:'FuelQuest',
        phone:'9881153955',
        email:'prashil.gote@synerzip.com',
        skype:'prashil.gote',
        empId:1362,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAK0AAAAJGVkMjIyODBkLTg3YjItNGEwMS1hMWY1LWI2NmMwZDBhNjhkMQ.jpg'
    },
    {
        fname:'Ashutosh',
        lname:'Kumar',
        project:'Examsoft,RxNetwork,HRMS,SCS Renewables / Mercatus,Rezoomex',
        phone:'9881153955',
        email:'ashutosh@synerzip.com',
        skype:'ashutosh.kumar',
        empId:1362,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/1da/31e/354e7f1.jpg'
    },
    {
        fname:'Vrinda',
        lname:'Phadke',
        project:'FuelQuest,QSI,StepOne',
        phone:'9767123421',
        email:'vrinda.phadke@synerzip.com',
        skype:'vrinda.phadke',
        empId:1241,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/019/0fe/0d38430.jpg'
    },
    {
        fname:'Vaibhav',
        lname:'Patil',
        project:'FuelQuest',
        phone:'9881255414',
        email:'vaibhav.patil@synerzip.com',
        skype:'vaibhav.patil',
        empId:1054,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/7/000/255/196/04b28d6.jpg'
    },
    {
        fname:'Prashil',
        lname:'Gote',
        project:'FuelQuest',
        phone:'9881153955',
        email:'prashil.gote@synerzip.com',
        skype:'prashil.gote',
        empId:1362,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAK0AAAAJGVkMjIyODBkLTg3YjItNGEwMS1hMWY1LWI2NmMwZDBhNjhkMQ.jpg'
    }
];

class DirectoryScene extends React.Component {
    constructor(props) {
        super(props);
        this.startIndex = 0;
        this.searchField = null;
        this.state = {
            searchText:'',
            directoryDataList:{
                data:[],
                totalRecordCount:0,
                offset:10,
                startIndex:0
            },
            directoryLoaded:false
        }
    }
    fetchDirectoryData(){
        var intervalObj = setInterval(()=>{
                clearInterval(intervalObj);
                this.state.directoryDataList = {
                    data:dataList,
                    totalRecordCount:28,
                    offset:10,
                    startIndex:0
                };
                this.setState({
                    directoryDataList: this.state.directoryDataList ,
                    directoryLoaded:true
                });

        },1000);
    }
    loadMoreData(onDone){
            var dataArray = [];
        dataArray.push({
                fname:'Yogesh',
                lname:'Patel',
                project:'FuelQuest',
                phone:'9960614174',
                email:'yogesh.patel@synerzip.com',
                skype:'yogesh.patel17',
                empId:1111,
                imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/000/2ac/208/1318b23.jpg'
            });


    dataArray.push({
                fname:'Ashutosh',
                lname:'Kumar',
                project:'Examsoft,RxNetwork,HRMS,SCS Renewables / Mercatus,Rezoomex',
                phone:'9881153955',
                email:'ashutosh@synerzip.com',
                skype:'ashutosh.kumar',
                empId:1362,
                imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/1da/31e/354e7f1.jpg'
            });
    dataArray.push({
                fname:'Vrinda',
                lname:'Phadke',
                project:'FuelQuest,QSI,StepOne',
                phone:'9767123421',
                email:'vrinda.phadke@synerzip.com',
                skype:'vrinda.phadke',
                empId:1241,
                imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/019/0fe/0d38430.jpg'
            });
    dataArray.push({
                fname:'Vaibhav',
                lname:'Patil',
                project:'FuelQuest',
                phone:'9881255414',
                email:'vaibhav.patil@synerzip.com',
                skype:'vaibhav.patil',
                empId:1054,
                imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/7/000/255/196/04b28d6.jpg'
            });
    dataArray.push({
                fname:'Prashil',
                lname:'Gote',
                project:'FuelQuest',
                phone:'9881153955',
                email:'prashil.gote@synerzip.com',
                skype:'prashil.gote',
                empId:1362,
                imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAK0AAAAJGVkMjIyODBkLTg3YjItNGEwMS1hMWY1LWI2NmMwZDBhNjhkMQ.jpg'
            });

    dataArray.push({
        fname:'Yogesh',
        lname:'Patel',
        project:'FuelQuest',
        phone:'9960614174',
        email:'yogesh.patel@synerzip.com',
        skype:'yogesh.patel17',
        empId:1111,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/000/2ac/208/1318b23.jpg'
    });


    dataArray.push({
        fname:'Ashutosh',
        lname:'Kumar',
        project:'Examsoft,RxNetwork,HRMS,SCS Renewables / Mercatus,Rezoomex',
        phone:'9881153955',
        email:'ashutosh@synerzip.com',
        skype:'ashutosh.kumar',
        empId:1362,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/3/000/1da/31e/354e7f1.jpg'
    });
    dataArray.push({
        fname:'Vrinda',
        lname:'Phadke',
        project:'FuelQuest,QSI,StepOne',
        phone:'9767123421',
        email:'vrinda.phadke@synerzip.com',
        skype:'vrinda.phadke',
        empId:1241,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/019/0fe/0d38430.jpg'
    });
    dataArray.push({
        fname:'Vaibhav',
        lname:'Patil',
        project:'FuelQuest',
        phone:'9881255414',
        email:'vaibhav.patil@synerzip.com',
        skype:'vaibhav.patil',
        empId:1054,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/7/000/255/196/04b28d6.jpg'
    });
    dataArray.push({
        fname:'Prashil',
        lname:'Gote',
        project:'FuelQuest',
        phone:'9881153955',
        email:'prashil.gote@synerzip.com',
        skype:'prashil.gote',
        empId:1362,
        imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAK0AAAAJGVkMjIyODBkLTg3YjItNGEwMS1hMWY1LWI2NmMwZDBhNjhkMQ.jpg'
    });



            var intervalObj = setInterval(()=>{
                    clearInterval(intervalObj);
                    this.startIndex += 10;
                    this.state.directoryDataList = {
                        data:this.state.directoryDataList.data.concat(dataArray),
                        totalRecordCount:28,
                        offset:10,
                        startIndex: this.startIndex
                    }

                    onDone(this.state.directoryDataList);


            },3000);
    }
    componentDidMount(){
        this.fetchDirectoryData();
    }

    onChangeText(text){
        if(text != ''){
            this.setState({searchText:text});
            if(this.currentNestedIndex != 1) {
                this.nestedNavigator.push({name: 'DirectoryFilterScene', index: 1});
                this.currentNestedIndex = 1;
            }
        }else{
            if(this.currentNestedIndex != 0) {

                //console.log("List of routes:"+this.nestedNavigator.getCurrentRoutes().length);
                this.nestedNavigator.pop();
                //console.log("List of routes:"+this.nestedNavigator.getCurrentRoutes().length);
                this.currentNestedIndex = 0;


            }else{
                this.searchField.blur();
                //If Empty on main screen
                this.setState({
                    directoryDataList: [] ,
                    directoryLoaded:false
                });

                //Load Again
                var intervalObj = setInterval(()=>{
                        clearInterval(intervalObj);
                    this.state.directoryDataList = {
                        data:dataList,
                        totalRecordCount:28,
                        offset:10,
                        startIndex:0
                    };
                    this.setState({
                        directoryDataList: this.state.directoryDataList ,
                        directoryLoaded:true
                    });

                },1000);


            }

        }

    }
    onEndEditing(navigator){
            console.log("Search Ref:::::::::::::::::::::::::::"+this.searchField)

    }
    selectOption(data){
        this.setState({searchText:data.name});
        this.nestedNavigator.pop();
        this.currentNestedIndex = 0;
        //Get selected data result
        if(data.type == 1){

        }else if(data.type == 0){
            //Dummay Data
            this.setState({directoryLoaded:false,directoryDataList:{
                data:dataList,
                totalRecordCount:0,
                offset:10,
                startIndex:0
            }});

            var intervalObj = setInterval(()=>{
                    clearInterval(intervalObj);
                    this.state.directoryDataList = {
                        data:[{
                            fname:'Yogesh',
                            lname:'Patel',
                            project:'FuelQuest',
                            phone:'9960614174',
                            email:'yogesh.patel@synerzip.com',
                            skype:'yogesh.patel17',
                            empId:1111,
                            imgPath:'https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/000/2ac/208/1318b23.jpg'
                        }],
                        totalRecordCount:1,
                        offset:10,
                        startIndex:0
                    };
                    this.setState({
                        directoryDataList: this.state.directoryDataList ,
                        directoryLoaded:true
                    });

                },1000);
        }

    }

    onSelect(event) {
        AlertIOS.alert(
            'You choosed',
            event
        );
    }
    _renderNestedScene(route,navigator){
        this.nestedNavigator = navigator;
        if(route.index == 0) {
            var DirectoryListView = require('./DirectoryListView');
            return (
                <View style={styles.listView}>
                    <DirectoryListView navigator={this.parentNavigator}
                    directoryDataList={this.state.directoryDataList}
                    loadMoreData={this.loadMoreData.bind(this)}
                    directoryLoaded={this.state.directoryLoaded}/>
                 </View>
            );
        }else if(route.index == 1){
            var DirectoryFilterOptionList = require('./DirectoryFilterOptionList');
            return(
                <DirectoryFilterOptionList searchText={this.state.searchText} selectOption={this.selectOption.bind(this)}/>
              );
        }

    }
    _renderScene(route,navigator){
        this.parentNavigator = navigator;
        if(route.index == 0){
            return (
                <View style={styles.container}>
                     <View style={styles.searchBox}>
                        <TextInput style={styles.searchField} placeholder='Search...'
                            onChangeText={this.onChangeText.bind(this)}
                            value={this.state.searchText} clearButtonMode="always"
                            ref={(field)=>this.searchField = field}
                            returnKeyType="default" onSubmitEditing={this.onEndEditing.bind(this,navigator)}/>
                        <Image source={require('image!search')} style={styles.searchImage}/>
                    </View>

                    <Navigator
                        ref='nestedNavigator'
                        initialRoute={{name: 'DirectoryList', index: 0}}
                        configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
                        renderScene={(route, navigator) =>
                            this. _renderNestedScene(route,navigator)
                        }
                    />
                </View>
            );
        }else if(route.index == 1){
            var AddContactScene = require('./AddContactScene');
            return (
                <AddContactScene navigator={navigator} empData = {route.passProps.empData} />
            );
        }
    }

    render() {
        StatusBarIOS.setStyle('default');
        return (
            <Navigator
                initialRoute={{name: 'Directory', index: 0}}
                configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
                renderScene={(route, navigator) =>
                                this. _renderScene(route,navigator)
                            }
                />


        );
    }
}


var styles = StyleSheet.create({
    listView:{
      flex:1,
      backgroundColor:'#f5f5f5',
      marginTop:5,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding:5,
        paddingTop: 0,
    },
    searchBox:{
        marginTop:25,
        height:30,
        width:screenWidth
    },
    searchField:{
        borderWidth:1,
        borderColor:"#cfd8dc",
        height: 30,
        paddingLeft:25,
        color:"#b0bec5",
        width:screenWidth - 10
    },
    options:{
        padding:5,
        flexDirection:'row',
        borderBottomColor:'#b0bec5',
        borderTopColor:"#FFFFFF",
        borderLeftColor:"#FFFFFF",
        borderRightColor:"#FFFFFF",
        borderWidth:1,
        height:30
    },
    optionsText:{
        color:'#0288d1',
        fontSize:14,
        padding:10
    },
    optionBox:{
        flex:1,
        borderTopColor:"#FFFFFF",

    },
    searchImage:{
        position:'absolute',
        top:5,
        left:5,
        width:20,
        height:20
    }


});

module.exports = DirectoryScene;
