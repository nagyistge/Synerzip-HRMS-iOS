/**
 * Created by synerzip on 06/08/15.
 */

'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    TextInput,
    ListView,
    View,
    ScrollView,
    TouchableHighlight,
    TouchableOpacity,
    ActivityIndicatorIOS,
    Image,
    Component
    } = React;


var SceneNavBar = require('../Common/SceneNavBar');
var ListLoadingIndicator = require('../Common/ListLoadingIndicator');
var Mask = require('../Common/Mask');
var Dimensions = require('Dimensions');
var screenWidth = Dimensions.get('window').width;

class VacanciesList extends React.Component{
    constructor(props){
        super(props);
        this.canLoadMore = false;
        this.state = {
            dataSource: new ListView.DataSource({
                    rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loading:false,
            searchOpen:false
        }
    }
    componentWillReceiveProps(nextProps){

        if(!this.props.vacanciesLoaded) {
            this.calculateCanLoadMore(nextProps.vacanciesListData);
            this.setState({
                dataSource: this.state.dataSource.cloneWithRows(nextProps.vacanciesListData.data),

            });
        }

    }
    componentDidMount(){
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(this.props.vacanciesListData.data)
        });
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
        console.log("Can Load More::::::"+ this.canLoadMore);
    }
    renderLoadingView(){
        return (
            <View style={styles.loadingContainer}>

                <ActivityIndicatorIOS
                    animating={true}
                    style={[styles.loadingIndicator, {height: 80}]}
                    size="large" />
                </View>
            );
    }
    loadMore(){

    }
    renderData(data){

        return(
            <TouchableHighlight>
                <View>
                    <View style={styles.container}>
                        <View style={[styles.rightContainer]}>
                            <View style={styles.leaveRow}>
                                <View style={styles.leaveDateBox}>
                                    <Text style={styles.leaveDate}>{data.title}</Text>
                                 </View>
                            </View>
                            <View style={styles.leaveRow}>
                                <View style={styles.leaveDateBox}>
                                     <Text style={styles.leavType}>{data.position}</Text>
                                </View>
                                <View style={styles.noOfDaysBox}>
                                    <Text style={[styles.leaveStatus ]}>
                                        {data.experience}
                                    </Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.separator} />
                </View>
            </TouchableHighlight>
        );
    }
    onLeftClick(){
        this.setState({searchOpen:true});
    }

    onSearchCancel(){
        this.setState({searchOpen:false});
    }
    render(){


        console.log("this.props.vacanciesLoaded:::::"+this.props.vacanciesLoaded);
        return(
            <View style={styles.container}>
            {!this.state.searchOpen
                ? <SceneNavBar title="Vacancies" leftIcon={require('image!searchblue')}
                onLeftClick={this.onLeftClick.bind(this)}/>
                :<View style={styles.searchContainer}>
                    <TextInput autoFocus={true} style={styles.searchField} placeholder="Search..." returnKeyType="search" clearButtonMode="while-editing"/>
                    <Image source={require('image!search')} style={styles.searchImage}/>
                    <TouchableOpacity onPress={this.onSearchCancel.bind(this)}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                 </View>}

                <View style={[styles.separator,{marginTop:10},{backgroundColor:'#bdbdbd'},{height: 0.5}]} />
                {this.props.vacanciesLoaded ?
                <View style={styles.listView}>
                    <ListView
                        dataSource={this.state.dataSource}
                        onEndReached={this.loadMore.bind(this)}
                        renderRow={this.renderData.bind(this)}
                        style={styles.listView}
                        automaticallyAdjustContentInsets={false}
                        contentInset={{bottom:49}}
                        scrollEventThrottle={300}
                        onEndReachedThreshold={2}
                        directionalLockEnabled={true}/>
                    {
                        this.state.loading ?
                        <ListLoadingIndicator />
                        :<Text>{''}</Text>
                    }
                    {this.state.searchOpen
                        ? <View style={styles.masking} />
                    :<Text>{''}</Text>}
                </View>
                : this.renderLoadingView()}

            </View>
        );
    }
}


var styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#FFFFFF',
        paddingTop:4
    },
    listView:{
        flex:1,
        backgroundColor:'transparent',

    },
    loadingContainer:{
        flex:1,
        backgroundColor:'transparent',
        justifyContent:'center'
    },
    loadingIndicator:{
        alignSelf:'center'
    },
    rightContainer: {
        flex: 1,
        padding:10
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
    leaveDate: {
        fontSize: 15,
        fontWeight:'400',
        color:"#000000"
    },
    leavType: {
        textAlign: 'left',
        color:'#9e9e9e'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
    leaveStatus:{
        color:'#0d47a1'
    },
    searchContainer:{
        height:30,
        marginTop:20,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'center',
        paddingLeft:0,
        paddingTop:5,
    },
    masking: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    cancelText:{
        fontSize:18,
        color:'#2196f3',
        alignSelf:'flex-end',
        marginLeft:10

    },
    searchField:{
        borderWidth:1,
        borderColor:"#cfd8dc",
        height: 25,
        paddingLeft:25,
        color:"#b0bec5",
        width:screenWidth - 80,

    },
    searchImage:{
        position:'absolute',
        top:8,
        left:8,
        width:20,
        height:20
    }



});

module.exports = VacanciesList;
