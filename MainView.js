/**
 * Created by synerzip on 25/07/15.
 */
'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Navigator,
    Component,
    AlertIOS,
    TabBarIOS,
    StatusBarIOS
    } = React;

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'leave',
            notifCount: 2,
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.receivedUrl){
            this.setState({selectedTab:'vacancies'});
        }
    }

    componentDidMount(){
        //AlertIOS.alert(this.props.receivedUrl);
        if(this.props.receivedUrl){
            this.setState({selectedTab:'vacancies'});
        }
    }

    getMyLeaveScreen(){
        var MyLeaveScreen = require('./Leave/MyLeaveScreen');
        return(
            <MyLeaveScreen />
        );
    }
    getApprovaleScreen(){
        return (<Text>Approvals</Text>);
    }
    getDirectoryScreen(){
        var DirectoryScene = require('./Directory/DirectoryScene');
        return (<DirectoryScene />);
    }

    getProfileScreen(){
        var ProfileScreen = require('./More/ProfileScreen');
        return ( <ProfileScreen />);
    }

    getMoreScreen(navigator){
        var MoreScreen = require('./More/MoreScreen');

        return (<MoreScreen topNavigator={navigator}/>);
    }


    getVacanciesScreen(){
        var VacanciesScreen = require('./Vacancies/VacanciesScreen');
        return (<VacanciesScreen receivedUrl={this.props.receivedUrl} onUploadCancel={this.props.onUploadCancel}/>);
    }
    _renderScene(route,navigator){
        if(route.index == 1){
            var CameraScene = require('./Common/CameraScene');
            //console.log("In Main View.........."+route.passProps.onCapture)
            return (<CameraScene topNavigator={navigator} onCapture={route.passProps.onCapture}/>);
            //return (<Text>Hello</Text>);
        }else if(route.index == 0){
            StatusBarIOS.setStyle('default');
            return(
                <TabBarIOS>
                    <TabBarIOS.Item
                        title="Leave"
                        icon={require('image!leave')}
                        selected={this.state.selectedTab === 'leave'}
                        onPress={() => {
                            this.setState({
                        selectedTab: 'leave',
                        });
                        }}>
                        {this.getMyLeaveScreen(navigator)}
                     </TabBarIOS.Item>
                     <TabBarIOS.Item
                        title="Approval"
                        icon={require('image!notification')}
                        badge={this.state.notifCount > 0 ? this.state.notifCount : undefined}
                        selected={this.state.selectedTab === 'approval'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'approval',
                            });
                        }}>
                        {this.getApprovaleScreen()}
                     </TabBarIOS.Item>
                     <TabBarIOS.Item
                        title="Directory"
                        icon={require('image!contacts')}
                        selected={this.state.selectedTab === 'directory'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'directory',
                            });
                        }}>
                        {this.getDirectoryScreen()}
                     </TabBarIOS.Item>
                     <TabBarIOS.Item
                        title="Vacancies"
                        icon={require('image!vacancies')}
                        selected={this.state.selectedTab === 'vacancies'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'vacancies',
                            });
                        }}>
                        {this.getVacanciesScreen()}
                     </TabBarIOS.Item>
                     <TabBarIOS.Item
                        title="More"
                        icon={require('image!menu')}
                        selected={this.state.selectedTab === 'menu'}
                        onPress={() => {
                            this.setState({
                                selectedTab: 'menu',
                            });
                        }}>
                        {this.getMoreScreen(navigator)}
                     </TabBarIOS.Item>
                    </TabBarIOS>);
        }
    }
    render(){

        return(
            <Navigator
                initialRoute={{name: 'Main Tab', index: 0}}
                configureScene={(route) => Navigator.SceneConfigs.FloatFromBottom}
                renderScene={(route, navigator) =>
                    this. _renderScene(route,navigator)
                }/>

        );
    }
}

module.exports = MainView;
