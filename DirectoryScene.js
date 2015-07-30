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
    Navigator,
    TouchableOpacity,
    Component,
    AlertIOS,
    StatusBarIOS
    } = React;

var AutoComplete = require('react-native-autocomplete');
var DirectoryListView = require('./DirectoryListView');
var AddContactScene = require('./AddContactScene');
var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width

var staticSuggestionData = [
    {
        empid: 111,
        name: 'Yogesh Patel'
    },
    {
        empid: 2,
        name: 'Rajesh Patel'
    },
    {
        empid: 3,
        name: 'Nidhi Sharma'
    },
    {
        empid: 4,
        name: 'ABC'
    },
    {
        empid: 5,
        name: 'XYZ'
    },
    {
        empid: 6,
        name: 'Abhu'
    },
    {
        empid: 7,
        name: 'Smita Sharma'
    },
    {
        empid: 8,
        name: 'Rajesh Sharma'
    },
    {
        empid: 9,
        name: 'Ashutosh Kumar'
    },
    {
        empid: 10,
        name: 'Rohit Ghatol'
    },
    {
        empid: 10,
        name: 'Rahul Ghatol'
    },
    {
        empid: 10,
        name: 'Rahul Tarfdar'
    },
    {
        empid: 11,
        name: 'Vinayak Joglekar'
    },
    {
        empid: 12,
        name: 'Hemant Sharma'
    },
];

class DirectoryScene extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            searchText:'',
            showOptions:false,
            loadData:false

        }
    }
    componentDidMount(){
        StatusBarIOS.setStyle('default');
    }
    onTyping(text) {
        var employees = staticSuggestionData.filter(function (employee) {
            return employee.name.toLowerCase().startsWith(text.toLowerCase())
        }).map(function (employee) {
            return employee.name;
        });

       return employees;
    }
    onChangeText(text){
        var optionPop = true;
        if(this.state.searchText != '' && text == ''){
            optionPop = false;
        }
        this.setState({searchText:text,showOptions:optionPop})
    }
    onEndEditing(){

    }
    selectOption(employee,navigator){

        this.setState({searchText:employee,showOptions:false,loadData:true});
       // this.forceUpdate();
        navigator.push({
            name: 'Directory',
            index: 0
        });
    }
    onSelect(event) {
        AlertIOS.alert(
            'You choosed',
            event
        );
    }

    _renderScene(route,navigator){
        if(route.index == 0){
            var options = [];
            if(this.state.searchText != ""){
                var employees = this.onTyping(this.state.searchText);
                options = employees.map((employee)=>{
                    return(
                        <TouchableHighlight underlayColor='#e0e0e0' onPress={this.selectOption.bind(this,employee,navigator)}>
                        <Text style={styles.optionsText}>{employee}</Text>
                        </TouchableHighlight>

                    );
                });
            }


            return (
                <View style={styles.container}>
                    <TextInput style={styles.searchField} placeholder='Search...'
                        onChangeText={this.onChangeText.bind(this)}
                        value={this.state.searchText} clearButtonMode="always"
                        returnKeyType="go" onEndEditing={this.onEndEditing.bind(this)}/>


                    <View style={styles.listView} ref='list'>
                        <DirectoryListView navigator={navigator}
                            searchText={this.state.searchText}
                            loadData={this.state.loadData}/>
                    </View>
                    {
                        this.state.showOptions ?
                    <ScrollView style={styles.optionBox} scrollEventThrottle={200}
                        contentInset={{top: -20}}>
                    {options}
                    </ScrollView>
                    :
                    <Text>{''}</Text>
                    }
                </View>
            );
        }else if(route.index == 1){
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
                configureScene={(route) => Navigator.SceneConfigs.FloatFromBottom}
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
      marginTop:10,
    },

    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding:5,
        paddingTop: 30
    },
    autocomplete: {
        position:'absolute',
        top:0,
        left:10,
        height: 30
    },
    searchField:{
        borderWidth:1,
        borderColor:"#cfd8dc",
        height: 30,
        paddingLeft:5,
        color:"#b0bec5"
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
        position:'absolute',
        width:screenWidth-10,
        top:60,
        left:5,
        height: 120,
        borderWidth:1,
        borderColor:"#b0bec5",
        borderTopColor:"#FFFFFF",

    }


});

module.exports = DirectoryScene;
