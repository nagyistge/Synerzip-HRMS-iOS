/**
 * Created by synerzip on 26/07/15.
 */
'use strict';
var React = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    TouchableOpacity
    } = React;


class NumberSelection extends React.Component{
    constructor(props){
       super(props);
    }

    render(){
        var selectedColor = '#FFFFFF';
        var color = '#2196f3'
        if(this.props.selected){
            selectedColor = '#00e676';
            color = '#FFFFFF';
        }
        return (
            <TouchableOpacity onPress={()=> {this.props.onDaysSelected(this.props.value);}}>
                <View style={[styles.container,{backgroundColor:selectedColor}]}>
                    <Text style={[styles.valueText,{color:color}]}>{this.props.value}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}

var styles = StyleSheet.create({
    container:{
        width:40,
        height:40,
        borderWidth:1,
        borderColor:'#2196f3',
        borderRadius:2,
        backgroundColor:'#2196f3',
        alignSelf:'stretch',
        justifyContent:'center',
        marginLeft:5
    },
    valueText:{
        color:'#FFFFFF',
        fontSize:15,
        fontWeight:'500',
        alignSelf:'center'

    }


});
module.exports = NumberSelection;