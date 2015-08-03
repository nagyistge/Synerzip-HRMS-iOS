/**
 * Created by synerzip on 22/07/15.
 */
'user strict';
var React = require('react-native');
var Overlay = require('react-native-overlay');
var BlurView = require('react-native-blur').BlurView;

var {
    View,
    ActivityIndicatorIOS,
    StyleSheet,
    } = React;


class LoadingOverlay extends React.Component{
    constructor(props){
        super(props);
        this.props = {
            isVisible: false
        };
    }

    render() {
        return (
            <Overlay isVisible={this.props.isVisible}>

                    <ActivityIndicatorIOS
                        size="large"
                        animating={true}
                        style={styles.centering} />

            </Overlay>
            );
    }

}



var styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    centering: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})

module.exports = LoadingOverlay;