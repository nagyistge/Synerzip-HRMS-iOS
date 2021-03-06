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
    TouchableWithoutFeedback,
    ActivityIndicatorIOS,
    Image,
    Component,
    Navigator,
    LayoutAnimation,
    Animated
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
            searchOpen:false,
            searchText:"",
            mask:false
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
        //console.log("Can Load More::::::"+ this.canLoadMore);
    }
    renderLoadingView(){
        console.log("Loading View:::::::::::::::::::::::::::::::::::::");
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
    //getJobDetailRoute(){
    //    var currentLength = this.props.topNavigator.getCurrentRoutes().length;
    //    console.log("currentlength::::::::"+currentLength);
    //    var routeArray = this.props.topNavigator.getCurrentRoutes();
    //    var routeToGo = null;
    //    for(var index =0 ; index < routeArray.length; index++){
    //        var route = routeArray[index];
    //        if(route.index == 1){
    //            routeToGo = route;
    //            break;
    //        }
    //    }
    //    return routeToGo;
    //
    //}
    onRowSelected(data)
    {
        this.props.topNavigator.push({
            name: 'JobDetail', index: 1, forUpload: this.props.forUpload,
            onUploadSelect: this.props.onUploadSelect,
            passProps: {
                selectedData: data
            }
        });
        //var routeToGo = this.getJobDetailRoute();
        //if (routeToGo == null) {
        //    console.log("Job Detail::::::::New Route");
        //    this.props.topNavigator.push({
        //        name: 'JobDetail', index: 1, forUpload: this.props.forUpload,
        //        onUploadSelect: this.props.onUploadSelect,
        //        passProps: {
        //            selectedData: data
        //        }
        //    });
        //}else{
        //    console.log("Job Detail::::::::Existing Route");
        //    routeToGo.passProps={
        //        selectedData: data
        //    };
        //    routeToGo.forUpload= this.props.forUpload;
        //    routeToGo.onUploadSelect = this.props.onUploadSelect;
        //    this.props.topNavigator.popToRoute(routeToGo);
        //}
    }
    renderData(data){

        return(
            <TouchableHighlight onPress={this.onRowSelected.bind(this,data)}>
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
         LayoutAnimation.easeInEaseOut();
         this.setState({searchOpen:true});
         var interval =setInterval(()=>{
                clearInterval(interval);
                this.setState({mask:true});
             },0);

    }

    onSearchCancel(){
        LayoutAnimation.easeInEaseOut();
        this.setState({searchOpen:false});
        this.setState({mask:false});
    }
    _renderScene(route,navigator){
            this.nestedNavigator = navigator;
            if(route.index == 0){
                //console.log("this.props.vacanciesLoaded:"+this.props.vacanciesLoaded);
                if(this.props.vacanciesLoaded){
                    return (
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
                                {this.state.mask
                                    ? <View style={styles.masking} />
                                :<Text>{''}</Text>}
                        </View>
                    );
                }else{
                    return (
                        this.renderLoadingView()
                    );
                }

            }else if(route.index == 1){
                var VacanciesSearchResultScreen = require('./VacanciesSearchResultScreen');
                return(
                    <VacanciesSearchResultScreen forUpload={this.props.forUpload}>
                    </VacanciesSearchResultScreen>
                );
            }

    }
    onChangeText(text){
        if(text != ''){
            this.setState({searchText:text});
            if(this.currentNestedIndex != 1) {
                this.nestedNavigator.push({name: 'VacanciesSearchResultScreen', index: 1});
                this.currentNestedIndex = 1;
            }
        }else{
            this.setState({searchText:text});
            if(this.currentNestedIndex != 0) {

                //console.log("List of routes:"+this.nestedNavigator.getCurrentRoutes().length);
                this.nestedNavigator.pop();
                //console.log("List of routes:"+this.nestedNavigator.getCurrentRoutes().length);
                this.currentNestedIndex = 0;


            }
        }
    }
    backToUpload(){
        this.props.backToUpload();
    }
    render(){
        var header = <SceneNavBar title="Vacancies"/>;
        if(this.props.forUpload){
            header = <SceneNavBar title="Vacancies" leftIcon={require('image!back')} leftTitle='Upload' onLeftClick={this.backToUpload.bind(this)}/>;
        }
        return(
            <View style={styles.container}>
            {!this.state.searchOpen
                ? <View style={{marginBottom:10}}>{header}</View>

                :<Animated.View style={styles.searchFieldContainer}>
                    <TextInput  onChangeText={this.onChangeText.bind(this)} value={this.state.searchText}
                                autoFocus={true} style={styles.searchField} placeholder="Search"
                                returnKeyType="search" clearButtonMode="while-editing"/>
                    <Image source={require('image!search')} style={styles.searchFieldImage}/>
                    <TouchableOpacity onPress={this.onSearchCancel.bind(this)}><Text style={styles.cancelText}>Cancel</Text></TouchableOpacity>
                 </Animated.View>
            }
            {
                !this.state.searchOpen
                    ? <Animated.View style={styles.searchContainer}>
                        <TouchableWithoutFeedback onPress={this.onLeftClick.bind(this)}>
                        <View style={styles.searchHolder}>
                        <Image source={require('image!search')} style={styles.searchImage}/>
                        <Text style={styles.searchText}>Search</Text>
                        </View>
                        </TouchableWithoutFeedback>
                      </Animated.View>
                    :<Text>{''}</Text>
            }
            <View style={{flex:1}}>
            <Navigator
            initialRoute={{name: 'Vacancies', index: 0}}
            configureScene={(route) => Navigator.SceneConfigs.FloatFromRight}
            renderScene={(route, navigator) =>
                    this._renderScene(route,navigator)
            }/>
            </View>


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
    searchFieldContainer:{
        height:25,
        marginTop:35,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'center',
        paddingLeft:5,
        marginLeft:0,
        marginBottom:0
    },
    searchContainer:{
        height:30,
        marginTop:0,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'center',
        paddingLeft:8,
        paddingTop:4,
        paddingBottom:4,
        paddingRight:8,
        backgroundColor:"#dddddd"
    },
    searchHolder:{
        backgroundColor:"#FFFFFF",
        flex:1,
        borderRadius:3,
        flexDirection:'row',
        justifyContent:'center'
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
        color:'#2979ff',
        alignSelf:'flex-end',
        marginLeft:10

    },
    searchField:{
        borderWidth:1,
        borderColor:"#cfd8dc",
        height: 25,
        paddingLeft:25,
        color:"#b0bec5",
        fontSize:15,
        width:screenWidth - 80,
        borderRadius:3,
    },
    searchFieldImage:{
        position:'absolute',
        top:5,
        left:15,
        width:16,
        height:16
    },
    searchImage:{
        alignSelf:'center',
        height:16,
        width:16,
    },
    searchText:{
        alignSelf:'center',
        fontSize:15,
        color:"#9e9e9e"
    }



});

module.exports = VacanciesList;
