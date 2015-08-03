/**
 * Created by synerzip on 02/08/15.
 */
'use restrict'
var React  = require('react-native');

var {
    StyleSheet,
    View,
    ActivityIndicatorIOS,
    Component,
    } = React;

class ListLoadingIndicator extends React.Component{
    render(){
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicatorIOS
                    animating={true}
                    style={[styles.loading, {height: 30}]}
                size="small" />
            </View>
           );
        }
}

var styles = StyleSheet.create({
    loadingContainer:{
        height:60,
        flexDirection:'row',
        alignSelf:'center',
        marginBottom:15

    }
});

module.exports = ListLoadingIndicator;

