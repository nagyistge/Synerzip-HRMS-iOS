/**
 * Created by synerzip on 29/07/15.
 */
'use restrict';

var React = require('react-native');

var {
    StyleSheet,
    View,
    Text,
    StatusBarIOS,
    TextInput
    } = React;

var SceneNavBar = require('./SceneNavBar');
class AddContactScene extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          firstName : this.props.empData.fname,
          lastName: this.props.empData.lname,
          mobile:this.props.empData.phone,
          email:this.props.empData.email

        };
    }
    onFirstNameChange(){
        this.setState({firstName:this.refs.fname.value});
    }
    onLastNameChange(){
        this.setState({lastName:this.refs.lname.value});
    }
    onMobileChange(){
        this.setState({mobile:this.refs.mobile.value});
    }

    onEmailChange(){
        this.setState({email:this.refs.email.value});
    }
    onRightClick(){
        console.log(this.props.empData);
    }
    onCancel(){
        this.props.navigator.pop();
    }
    render(){
        //StatusBarIOS.setStyle('light-content');
        StatusBarIOS.setStyle('default');
        return (
            <View style={styles.container}>
                <SceneNavBar title="Add Contact"
                    backgroundColor="#FFFFFF"
                    onLeftClick={this.onCancel.bind(this)}
                    leftTitle="Cancel"
                    rightTitle="Done"
                    onRightClick={this.onRightClick.bind(this)}/>
                <View style={styles.form}>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput} placeholder='First Name'
                        ref='fname' value={this.state.firstName} onChange={this.onFirstNameChange.bind(this)}/>
                    </View>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput} placeholder='Last Name' ref='lname'
                                value={this.state.lastName} onChange={this.onLastNameChange.bind(this)}/>
                    </View>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput} placeholder='Mobile' ref='mobile'
                        value={this.state.mobile} onChange={this.onMobileChange.bind(this)}/>
                    </View>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput} placeholder='Email' ref='email'
                        value={this.state.email} onChange={this.onEmailChange.bind(this)}/>
                    </View>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    form:{

        backgroundColor:'#FFFFFF',
        opacity:0.7,
        padding:10,
        alignItems:'stretch'

    },
    field:{
        alignSelf:'stretch'
    },

    container: {
        backgroundColor:"#FFFFFF",
        opacity:0.7,
        flex: 1,
        flexDirection: 'column',

    },
    flowRight: {
        flex:1,
        marginTop:10
    },
    searchInput: {
        height: 36,
        padding: 4,
        marginTop:10,
        marginBottom:0,
        marginLeft:20,
        marginRight:20,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#E8E7E7',
        alignSelf: 'stretch',
        justifyContent: 'center',
        color: '#B5B1B1',
    },



});

module.exports = AddContactScene;