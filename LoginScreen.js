/**
 * Created by synerzip on 22/07/15.
 */
'user strict';

var React = require('react-native');
var MainView = require('./MainView');
var Buffer = require('buffer/').Buffer;
var LoadingOverlay = require('./Common/LoadingOverlay');
var {
    StyleSheet,
    ScrollView,
    Text,
    TextInput,
    View,
    Image,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Image,
    Component,
    StatusBarIOS
    } = React;

class LoginScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            loggedIn:false,
            error:false,
            employeeId:null,
            password:null,
            errorMsg:''

        };
    }
    validate(){
        if(this.state.employeeId == null || this.state.employeeId == '' || this.state.employeeId == '111'){
            this.setState({error: true,errorMsg:'Invalid Employee Id'});
            return false;

        }else if(this.state.password == null || this.state.password == ''){
            this.setState({error: true,errorMsg:'Invalid Password'});
            return false;

        }
        return true;
    }
    handleLogin(){

        if(this.validate()) {
            this.setState({isLoading: true,error:false});
            var interval = setInterval(()=>{
                clearInterval(interval);
                //console.log(new Buffer(this.state.employeeId).toString('base64'));
                this.setState({isLoading: false,loggedIn:true});
            },300);
        }
    }

    onEmpIdChange(event){
        this.setState({employeeId: event.nativeEvent.text});
    }
    onPasswordChange(event){
        this.setState({password: event.nativeEvent.text});
    }
    onPasswordDone(){
        if(this.state.employeeId == null || this.state.employeeId == ''){
            this.refs.empId.focus();
        }else if(this.state.password == null || this.state.password == ''){
            this.setState({error: true,errorMsg:'Invalid Password'});
            this.refs.password.focus();
        }else{
            this.handleLogin();
        }
    }
    onEmpIdDone(){
        this.refs.password.measure((ox, oy, width, height, px, py) => {
            this.refs.password.focus();
            this.refs.scrollScreen.contentOffset = {x:px, y: py} ;
        });

    }
    render(){
        StatusBarIOS.setStyle('default');
        var enableInput = true;
        if(this.state.isLoading){
            enableInput = false;
        }
        return (
            !this.state.loggedIn ?
            <View style={styles.container}>
               <ScrollView ref="scrollScreen" style={{height:200}}>

                <View style={styles.loginBox}>
                    <Image source={require('image!logo')} style={styles.logoImg}/>
                </View>
                   <View style={styles.flowRight}>
                       <TextInput style={styles.searchInput} placeholder='User Name'  editable={enableInput} clearButtonMode="always"
                                  clearTextOnFocus={false}
                                  enablesReturnKeyAutomatically={true}
                                  keyboardType="default"
                                  ref="empId"
                                  returnKeyType="next"
                                  onEndEditing={this.onEmpIdDone.bind(this)}
                                  value={this.state.employeeId} onChange={this.onEmpIdChange.bind(this)}/>
                   </View>
                   <View style={styles.flowRight}>
                       <TextInput style={styles.searchInput} placeholder='Password' password={true} editable={enableInput}
                                  clearTextOnFocus={false}
                                  clearButtonMode="always"
                                  returnKeyType="go"
                                  onEndEditing={this.onPasswordDone.bind(this)}
                                  ref="password"
                                  value={this.state.password}
                                  onChange={this.onPasswordChange.bind(this)}/>
                   </View>
                   <Image source={this.props.images.hrms} style={styles.image}/>


                {this.state.error ?
                <View style={styles.errorBox}>
                    <Text style={styles.errorText}>{this.state.errorMsg}</Text>
                </View> : <Text></Text>}

                <View style={styles.centering}>
                    <ActivityIndicatorIOS
                    animating={this.state.isLoading}
                    style={[styles.loading, {height: 80}]}
                    size="large" />
                </View>
                </ScrollView>
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Product by Synerzip.com</Text>
                </View>

            </View>
            : <MainView />
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flex:1
    },
    loginBox:{
        flexDirection: 'column',
        marginTop:15,
        marginBottom:30,
        flex:1
    },
    logoImg:{
        width:200,
        height:19,
        alignSelf: 'center',
    },
    image:{
        marginTop:30,
        width: 130,
        height: 130,
        alignSelf: 'center',
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
    button: {
        height: 36,
        flex: 1,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginTop:10,
        marginBottom:0,
        marginLeft:20,
        marginRight:20,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    errorBox:{
        height: 36,
        flex: 1,
        backgroundColor: 'red',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 8,
        marginTop:10,
        marginBottom:0,
        marginLeft:20,
        marginRight:20,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },

    errorText:{
        fontSize: 12,
        color: 'white',
        alignSelf: 'center'
    },
    centering:{
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center'
    },
    loading:{
        alignSelf: 'center'
    },
    footerText:{
        fontSize: 12,
        color: '#CCCCCC',
        alignSelf: 'center',
    },
    footer:{
        position:'absolute',
        bottom:10,
        left:0,
        right:0,
        flex:1,
        padding:10,
    }
});


module.exports = LoginScreen;