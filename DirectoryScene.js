/**
 * Created by synerzip on 26/07/15.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    Text,
    ListView,
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
            suggestions: []
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

        this.setState({
            suggestions: employees
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
            return (
                <View style={styles.container}>

                    <AutoComplete onTyping={this.onTyping.bind(this)}
                    onSelect={this.onSelect.bind(this)}
                    suggestions={this.state.suggestions}/>
                    <View style={styles.listView}>
                        <DirectoryListView navigator={navigator}/>
                    </View>
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
      marginTop:5,
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


});

module.exports = DirectoryScene;
