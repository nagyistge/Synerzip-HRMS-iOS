/**
 * Created by synerzip on 11/08/15.
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

class VacanciesSearchResultScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return (
            <View style={styles.listView}>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    listView:{
        flex:1,
        backgroundColor:'transparent',

    },
});

module.exports = VacanciesSearchResultScreen;
