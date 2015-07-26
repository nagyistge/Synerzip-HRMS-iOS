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

var MyLeaveScreen = require('./MyLeaveScreen');
var ProfileScreen = require('./ProfileScreen');
var DirectoryScene = require('./DirectoryScene');

class MainView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            selectedTab:'leave',
            notifCount: 2,
        }
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
                <MyLeaveScreen />
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
                <Text>Approvals</Text>
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
                <DirectoryScene />
            </TabBarIOS.Item>
            <TabBarIOS.Item
                title="Setting"
                icon={require('image!settings')}
                selected={this.state.selectedTab === 'settings'}
                onPress={() => {
                    this.setState({
                        selectedTab: 'settings',
                    });
                }}>
                <ProfileScreen />
            </TabBarIOS.Item>
        </TabBarIOS>
        );
    }
}

module.exports = MainView;
