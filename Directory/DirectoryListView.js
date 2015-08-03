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

var ListLoadingIndicator = require('../Common/ListLoadingIndicator');
var ActionSheetIOS = require('ActionSheetIOS');
var AddressBook = require('react-native-addressbook');
var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width
var BUTTONS = [
    'Add to Contact',
    'Call',
    'Cancel',
];
var CANCEL_INDEX = 2;



class DirectoryListView extends React.Component{
    constructor(props){
        super(props);
        this.canLoadMore = false;
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loading:false

        }
    }
    componentWillReceiveProps(nextProps){
        console.log("Receieving Props in List View::::::::::::::::::::::::");
        if(nextProps.selectedObj != null || !this.props.directoryLoaded) {
            this.calculateCanLoadMore(nextProps.directoryDataList);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.directoryDataList.data),

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
        console.log("caN lOAD mORE::::::"+ this.canLoadMore);
    }
    componentDidMount(){
        console.log("Mounting List View::::::::::::::::::::::::");
        this.calculateCanLoadMore(this.props.directoryDataList);
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.directoryDataList.data),

        });

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
                }else if(buttonIndex == 0){
                        this.props.navigator.push({
                            name: 'Add Contact ',
                            index: 1,
                            passProps:{
                                empData:data
                            }
                        });


                }
            });
    }
    getCenter(data){

        return(
            <TouchableHighlight onLongPress={this.onRowSelect.bind(this,data)}>
                <View>
                    <View style={styles.container}>
                        <Image
                            source={{uri: data.imgPath}}
                            style={styles.thumbnail}
                            />
                        <View style={styles.rightContainer}>
                            <Text style={styles.name}>{data.fname +' '+data.lname}</Text>
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
    loadMore(){

        if(this.state.loading || !this.canLoadMore){
            return;
        }
        this.setState({loading:true});

        //Load More Data
        this.props.loadMoreData((directortData)=>{
            this.calculateCanLoadMore(directortData);
            this.setState({
                loading:false,
                dataSource: this.state.dataSource.cloneWithRows(directortData.data)});
        });


    }
    render (){
        console.log("this.props.directoryLoaded:"+this.props.directoryLoaded);
        if(!this.props.directoryLoaded){

           return ( this.renderLoadingView());
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
                    scrollEventThrottle={100}
                    onEndReachedThreshold={2}
                    directionalLockEnabled={true}
                    pageSize={15}
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
        backgroundColor: '#FFFFFF',
    },
    rightContainer: {
        flex: 1,
    },
    thumbnail: {
        width: 70,
        height: 80,
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
    },
    loadingContainer:{
        height:60,
        flexDirection:'row',
        alignSelf:'center',
        marginBottom:15

    }



});

module.exports = DirectoryListView;
