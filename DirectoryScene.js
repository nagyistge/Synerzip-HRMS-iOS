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
    TouchableOpacity,
    Component,
    AlertIOS,
    StatusBarIOS
    } = React;

var AutoComplete = require('react-native-autocomplete');
var DirectoryListView = require('./DirectoryListView');

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

    render() {
        StatusBarIOS.setStyle('default');
        return (
            <View style={styles.container}>

                    <AutoComplete onTyping={this.onTyping.bind(this)}
                                  onSelect={this.onSelect.bind(this)}
                                  suggestions={this.state.suggestions}/>
                    <View style={styles.listView}>
                        <DirectoryListView />
                    </View>

            </View>

        );
    }
}


var styles = StyleSheet.create({
    listView:{
      flex:1,
      backgroundColor:'#f5f5f5',
      marginTop:25,
    },

    container: {
        marginTop:30,
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding:5,
        paddingTop: 10
    },
    autocomplete: {
        position:'absolute',
        top:0,
        left:10,
        height: 30
    },


});

module.exports = DirectoryScene;
