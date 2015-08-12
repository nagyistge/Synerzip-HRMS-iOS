/**
 * Created by synerzip on 25/07/15.
 */
'use restrict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicatorIOS,
    Component,
    TabBarIOS
    } = React;


class SceneNavBar extends Component{
    render (){
        var leftIconHeight = 20;
        var leftIconWidth = 20;
        if(!this.props.leftIcon){
            leftIconHeight = 0;
            leftIconWidth = 0;
        }

        var rightIconHeight = 20;
        var rightIconWidth = 20;
        if(!this.props.rightIcon){
            rightIconHeight = 0;
            rightIconWidth = 0;
        }

        return (
        <View style={[styles.container,{backgroundColor:this.props.backgroundColor}]}>
            <Text style={styles.title}>{this.props.title}</Text>
            <View style={styles.rightTitleBox} >
                <TouchableOpacity onPress={this.props.onRightClick}>
                    <View style={styles.buttonBox}>
                        <Image source={this.props.rightIcon} style={[{height:rightIconHeight},{width:rightIconWidth},{marginTop:2}]}/>
                        <Text style={styles.rightTitle}>{this.props.rightTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={styles.leftTitleBox} >
                <TouchableOpacity onPress={this.props.onLeftClick}>
                    <View style={styles.buttonBox}>
                         <Image source={this.props.leftIcon} style={[{height:leftIconHeight},{width:leftIconWidth}]}/>
                         <Text style={styles.leftTitle}>{this.props.leftTitle}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        );
    }

}


var styles = StyleSheet.create({

    container: {
        height:30,
        marginTop:20,
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'center',

    },
    title:{
        alignSelf:'center',
        fontSize:18,
        color:'#37474f',
        fontWeight:'500'
    },
    leftTitleBox:{
        left:0,
        position:'absolute',
        paddingLeft:5,
        marginTop:6
    },
    leftTitle:{
        fontSize:18,
        color:'#2979ff'
    },
    icon:{
      width:35,
      height:35
    },
    buttonBox:{
        flexDirection:'row'
    },
    rightTitleBox:{
        right:0,
        position:'absolute',
        paddingRight:5,
        marginTop:6

    },
    rightTitle:{
        fontSize:18,
        color:'#2979ff'
    }


});

module.exports = SceneNavBar;