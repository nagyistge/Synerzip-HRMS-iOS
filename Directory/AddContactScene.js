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
    TextInput,
    AlertIOS
    } = React;

var SceneNavBar = require('../Common/SceneNavBar');
var AddressBook = require('react-native-addressbook');
var Dimensions = require('Dimensions')
var screenWidth = Dimensions.get('window').width

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

    onRightClick(){



        var newPerson = {
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            emailAddresses: [{
                label: "work",
                email: this.state.email,
            }],
            phoneNumbers: [{
                label: "mobile",
                number: this.state.mobile,
            }],
        }
        console.log(newPerson);
        AddressBook.addContact(newPerson, (err) => {
            console.log('NEW CONTACT', err, newPerson);

        });
        AlertIOS.alert('Saved Successfully');
        this.props.navigator.pop();

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
                        ref='fname' value={this.state.firstName} onChangeText={(text) => this.setState({firstName:text})}/>
                    </View>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput} placeholder='Last Name' ref='lname'
                                value={this.state.lastName} onChangeText={(text) => this.setState({lastName:text})}/>
                    </View>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput} placeholder='Mobile' ref='mobile'
                        value={this.state.mobile} onChangeText={(text) => this.setState({mobile:text})}/>
                    </View>
                    <View style={styles.flowRight}>
                        <TextInput style={styles.searchInput} placeholder='Email' ref='email'
                        value={this.state.email} onChangeText={(text) => this.setState({email:text})}/>
                    </View>
                </View>

            </View>
        );
    }
}

var styles = StyleSheet.create({
    form:{
        backgroundColor:'#FFFFFF',
        padding:10,
        alignItems:'stretch'
    },
    field:{
        alignSelf:'stretch'
    },

    container: {
        backgroundColor:"#FFFFFF",
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