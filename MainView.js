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
    Component,
    TabBarIOS
    } = React;

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'leave',
            notifCount: 2,
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

    getMoreScreen(){
        var MoreScreen = require('./More/MoreScreen');
        return (<MoreScreen />);
    }
    render(){
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
                {this.getMyLeaveScreen()}
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
                {this.getProfileScreen()}
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
                    {this.getMoreScreen()}
            </TabBarIOS.Item>
        </TabBarIOS>
        );
    }
}

module.exports = MainView;
