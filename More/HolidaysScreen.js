/**
 * Created by synerzip on 06/08/15.
 */

'use strict';

var React = require('react-native');

var {
    View,
    TouchableHighlight,
    Image,
    StyleSheet,
    TextInput,
    Text,
    Component,
    StatusBarIOS,
    ScrollView
    } = React;

class HolidaysScreen extends React.Component{
    render(){
        return (
            <View style={styles.container}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.contentContainer}
                contentInset={{bottom:49}}
                automaticallyAdjustContentInsets={false}>
                    <View>
                        <View style={styles.infoBox}>
                            <View style={styles.category}>
                                <Text style={styles.categoryText}>Upcoming Holidays</Text>
                            </View>
                            <View style={styles.property}>
                                <View style={[{flex:1},{alignSelf:'flex-start'}]}>
                                    <Text style={[styles.propertyText]}>Sep 17th 2015</Text>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <Text style={[styles.propertyText]}>Ganesh Chaturthi</Text>
                                </View>
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.property}>
                                <View style={[{flex:1},{alignSelf:'flex-start'}]}>
                                    <Text style={[styles.propertyText]}>Oct 12nd 2015</Text>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <Text style={[styles.propertyText]}>Gandhi Jayanti</Text>
                                </View>
                            </View>
                            <View style={styles.separator} />
                                <View style={styles.property}>
                                    <View style={[{flex:1},{alignSelf:'flex-start'}]}>
                                        <Text style={[styles.propertyText]}>Oct 22nd 2015</Text>
                                    </View>
                                    <View style={{alignSelf:'flex-end'}}>
                                        <Text style={[styles.propertyText]}>Dusshera</Text>
                                    </View>
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.property}>
                                <View style={[{flex:1},{alignSelf:'flex-start'}]}>
                                    <Text style={[styles.propertyText]}>Nov 11th 2015</Text>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <Text style={[styles.propertyText]}>Diwali (Laxmi Pujan)</Text>
                                </View>
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.property}>
                                <View style={[{flex:1},{alignSelf:'flex-start'}]}>
                                    <Text style={[styles.propertyText]}>Dec 11th 2015</Text>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <Text style={[styles.propertyText]}>Diwali (Padwa)</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.infoBox}>
                            <View style={styles.category}>
                                <Text style={styles.categoryText}>Remaining Holidays</Text>
                            </View>
                            <View style={styles.property}>
                                <View style={[{flex:1},{alignSelf:'flex-start'}]}>
                                    <Text style={[styles.propertyText]}>Apr 11th 2015</Text>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <Text style={[styles.propertyText]}>Diwali (Laxmi Pujan)</Text>
                                </View>
                            </View>
                            <View style={styles.separator} />
                            <View style={styles.property}>
                                <View style={[{flex:1},{alignSelf:'flex-start'}]}>
                                    <Text style={[styles.propertyText]}>Mar 11th 2015</Text>
                                </View>
                                <View style={{alignSelf:'flex-end'}}>
                                    <Text style={[styles.propertyText]}>Diwali (Padwa)</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:64

    },
    scrollView:{
        flex: 1,
        width: window.width,
        height: window.height - 30,

    },
    infoBox:{
        flexDirection:'column',
        flex:1
    },
    category:{
        padding:10,
        backgroundColor:"#e0e0e0",
    },
    categoryText:{
        color:"#616161",
        fontSize:15,
        fontWeight:'400'
    },
    property:{
        padding:10,
        flex:1,
        flexDirection:'row'
    },
    propertyText:{
        color:"#616161",
        fontSize:15,
        fontWeight:'400'
    },
    separator: {
        height: 1,
        backgroundColor: '#dddddd'
    },
});

module.exports = HolidaysScreen;
