/**
 * Created by synerzip on 26/07/15.
 */
'use strict';

var React = require("react-native");
var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width;
var screenHeight = Dimensions.get('window').height;
var {
    StyleSheet,
    Text,
    SwitchIOS,
    TextInput,
    ScrollView,
    SliderIOS,
    SegmentedControlIOS,
    DatePickerIOS,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component
    } = React;

class Mask extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (

                this.props.loading ?
                    <View style={styles.masking}>
                        <View style={styles.loading}>
                            <ActivityIndicatorIOS
                                animating={true}
                                style={[{height: 80}]}
                                size="large"/>
                        </View>
                    </View>
                    : <Text>{''}</Text>


        );
    }
}

var styles = StyleSheet.create({
    masking: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: '#000000',
        opacity: 0.5
    },
    loading: {
        marginVertical:(screenHeight/2)-40,
        marginLeft:(screenWidth/2)-20,

    }
});

module.exports = Mask;

