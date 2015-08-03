/**
 * Created by synerzip on 02/08/15.
 */
'use strict'

var React = require('react-native');

var {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity
    } = React;

class CheckMarkSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: this.props.selected
        };
    }
    onPress(){
        var selected = !this.state.selected;
        this.setState({selected:selected});
        this.props.onPress(this.props.paramKey,selected);
    }

    render() {
        var checkImage = <Image source={require('image!unselected')} style={styles.checkImage}/>;
        if(this.state.selected){
            checkImage = <Image source={require('image!selected')} style={styles.checkImage}/>;
        }
        return (
            <TouchableOpacity onPress={this.onPress.bind(this)}>
            <View style={styles.container}>
                 {checkImage}
                <Text style={[styles.label,{color:this.props.color}]}>{this.props.label}</Text>
            </View >
            </TouchableOpacity>
    )
        ;
    }
}

var styles = StyleSheet.create({
    container:{
        height:40,
        flexDirection:'row'

    },
    checkImage:{
        width:20,
        height:20
    },
    label:{
        fontSize:18,
        color:"red",
        marginLeft:10

    }
});

module.exports = CheckMarkSelection;
