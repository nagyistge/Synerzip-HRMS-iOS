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
    Image,
    ScrollView,
    ActivityIndicatorIOS,
    TouchableHighlight,
    TouchableOpacity,
    Component,
    LinkingIOS
    } = React;
var ActionSheetIOS = require('ActionSheetIOS');
var BUTTONS = [
    'Add to Contact',
    'Call',
    'Cancel',
];
var CANCEL_INDEX = 2;
var dataList = [
    {
        name:'Yogesh Patel',
        project:'FuelQuest',
        phone:'9960614174',
        email:'yogesh.patel@synerzip.com',
        skype:'yogesh.patel17',
        empId:1111,
        imgPath:'https://hrms.synerzip.in/symfony/web/index.php/pim/viewPhoto/empNumber/20/from/empDir'
    },
    {
        name:'Nidhi Harshad Shrikhande',
        project:'HR',
        phone:'9881255414',
        email:'nidhi@synerzip.com',
        skype:'nidhishrikhande',
        empId:1054,
        imgPath:'https://hrms.synerzip.in/symfony/web/index.php/pim/viewPhoto/empNumber/1/from/empDir'
    },
    {
        name:'Ashutosh Kumar',
        project:'Examsoft,RxNetwork,HRMS,SCS Renewables / Mercatus,Rezoomex',
        phone:'9881153955',
        email:'ashutosh@synerzip.com',
        skype:'ashutosh.kumar',
        empId:1362,
        imgPath:'https://hrms.synerzip.in/symfony/web/index.php/pim/viewPhoto/empNumber/5/from/empDir'
    },
    {
        name:'Vrinda Phadke',
        project:'FuelQuest,QSI,StepOne',
        phone:'9767123421',
        email:'vrinda.phadke@synerzip.com',
        skype:'vrinda.phadke',
        empId:1241,
        imgPath:'https://hrms.synerzip.in/symfony/web/index.php/pim/viewPhoto/empNumber/20/from/empDir'
    },
    {
        name:'Vaibhav Patil',
        project:'FuelQuest',
        phone:'9881255414',
        email:'vaibhav.patil@synerzip.com',
        skype:'vaibhav.patil',
        empId:1054,
        imgPath:'https://hrms.synerzip.in/symfony/web/index.php/pim/viewPhoto/empNumber/1/from/empDir'
    },
    {
        name:'Prashil Gote',
        project:'FuelQuest',
        phone:'9881153955',
        email:'prashil.gote@synerzip.com',
        skype:'prashil.gote',
        empId:1362,
        imgPath:'https://hrms.synerzip.in/symfony/web/index.php/pim/viewPhoto/empNumber/5/from/empDir'
    }
];

class DirectoryListView extends React.Component{
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

    onRowSelect(data){
        ActionSheetIOS.showActionSheetWithOptions({
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX
            },
            (buttonIndex) => {
                if(buttonIndex == 1){
                    console.log("Data:"+data.empId);
                    var url =  'tel:';
                    url += data.phone;

                    LinkingIOS.canOpenURL(url, (supported) => {
                        if (!supported) {
                            console.log('Can\'t handle url: ' + url);
                        } else {
                            LinkingIOS.openURL(url);
                        }
                    });
                }
            });
    }
    getCenter(data){

        return(
            <TouchableHighlight onPress={this.onRowSelect.bind(this,data)}>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={require('image!profile')}
                            style={styles.thumbnail}
                            />
                        <View style={styles.rightContainer}>
                            <Text style={styles.name}>{data.name}</Text>
                            <View style={[{flex:1},{flexWrap:'nowrap'},{flexDirection:'row'}]}>
                                <Text style={[styles.project,{flexWrap:'nowrap'}]}>{data.project}</Text>
                            </View>
                            <Text style={styles.email}>{data.email}</Text>
                            <View style={[{flexDirection: 'row'}]}>
                                <View style={[{flexDirection: 'row'},{marginLeft: 2}]}>
                                    <Image source={require('image!phone')} style={styles.image}/>
                                    <Text style={styles.phone}>{data.phone}</Text>
                                </View>
                                <View style={[{flexDirection: 'row'}]}>
                                    <Image source={require('image!skype')} style={styles.image}/>
                                    <Text style={styles.skype}>{data.skype}</Text>
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

            return this.getCenter(data);

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
        backgroundColor: 'transparent',
        flexWrap: 'nowrap',
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
        backgroundColor: '#f5f5f5',
    },
    rightContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 53,
        height: 81,
    },
    name:{
        fontSize:15,
        fontWeight:'400',
        padding:5,
        paddingBottom:0
    },
    email:{
        textAlign: 'left',
        color:'#9e9e9e',
        padding:5,
        paddingTop:0,
        paddingBottom:0

    },
    phone:{
        fontSize:12,
        color:'#9e9e9e',
        padding:5,
        paddingTop:3,
        paddingBottom:0,
        paddingLeft:0
    },
    skype:{
        fontSize:12,
        color:'#9e9e9e',
        padding:5,
        paddingTop:3,
        paddingBottom:0,
        paddingLeft:2
    },
    image:{
        width:13,
        height:13,
        marginTop:4
    },
    project:{
        fontSize:15,
        fontWeight:'200',
        padding:5,
        paddingBottom:0,
        paddingTop:0,
        fontStyle:'italic',
        overflow:'hidden'
    }



});

module.exports = DirectoryListView;
