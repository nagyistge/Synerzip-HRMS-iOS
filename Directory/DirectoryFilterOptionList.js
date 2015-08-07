/**
 * Created by synerzip on 31/07/15.
 */
'use strict'

var React  = require('react-native');

var {
    StyleSheet,
    Text,
    ListView,
    View,
    Image,
    ScrollView,
    ActivityIndicatorIOS,
    TouchableHighlight,
    TouchableOpacity,
    Component,
    LinkingIOS,
    AlertIOS
    } = React;


var staticSuggestionData = [
    {
        empid: 111,
        name: 'Yogesh Patel',
        type:0
    },
    {
        empid: 2,
        name: 'Rajesh Patel',
        type:0
    },
    {
        empid: 3,
        name: 'Nidhi Sharma',
        type:0
    },
    {
        empid: 4,
        name: 'ABC',
        type:1
    },
    {
        empid: 5,
        name: 'XYZ',
        type:1
    },
    {
        empid: 6,
        name: 'Abhu',
        type:1
    },
    {
        empid: 7,
        name: 'Smita Sharma',
        type:0
    },
    {
        empid: 8,
        name: 'Rajesh Sharma',
        type:0
    },
    {
        empid: 9,
        name: 'Ashutosh Kumar',
        type:0
    },
    {
        empid: 10,
        name: 'Rohit Ghatol',
        type:0
    },
    {
        empid: 11,
        name: 'Rahul Ghatol',
        type:0
    },
    {
        empid: 12,
        name: 'Rahul Tarfdar',
        type:0
    },
    {
        empid: 13,
        name: 'Vinayak Joglekar',
        type:0
    },
    {
        empid: 14,
        name: 'Hemant Sharma',
        type:0
    },
    {
        empid: 15,
        name: 'Rest Clouda',
        type:1
    },
    {
        empid: 16,
        name: 'FuelQuest',
        type:1
    },
    {
        empid: 17,
        name: 'Rx Admin',
        type:1
    },
];

class DirectoryFilterOptionList extends React.Component{
    constructor(props){
        super(props);
        var getSectionData = (dataBlob, sectionID) => {
            return dataBlob[sectionID];
        }

        var getRowData = (dataBlob, sectionID, rowID) => {
            return dataBlob[sectionID + ':' + rowID];
        }

        this.state = {
            loaded : false,
            dataSource : new ListView.DataSource({
                    getSectionData          : getSectionData,
                    getRowData              : getRowData,
                    rowHasChanged           : (row1, row2) => row1 !== row2,
                    sectionHeaderHasChanged : (s1, s2) => s1 !== s2
            })

        };
    }

    componentDidMount(){
        this.setFilterData(this.props.searchText);
    }
    componentWillReceiveProps(nextProps){
        //Populate data
        this.setFilterData(nextProps.searchText);

    }
    setFilterData(searchText){
        var dataBlob = {},sectionIDs = [], rowIDs = [];

        sectionIDs.push(0);
        sectionIDs.push(1);
        dataBlob[0] = "Employee";
        dataBlob[1] = "Project";
        rowIDs[0] = [];
        rowIDs[1] = [];
        for (var i = 0; i < staticSuggestionData.length; i++) {
            var data = staticSuggestionData[i];
            if(!data.name.toLowerCase().startsWith(searchText.toLowerCase())){
                continue;
            }
            if(data.type == 0){
                rowIDs[0].push(data.empid);
                dataBlob[0 + ':' + data.empid] = data;
            }else{
                rowIDs[1].push(data.empid);
                dataBlob[1 + ':' + data.empid] = data;
            }

        }

        this.setState({
            dataSource : this.state.dataSource.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs),
            loaded     : true
        });
    }
    renderLoadingView() {
        return (

            <View style={styles.container}>
                <ActivityIndicatorIOS
                    animating={!this.state.loaded}
                     style={[styles.activityIndicator, {height: 80}]}
                        size="large"
                    />

                </View>
            );
    }

    renderListView() {
        return (
            <View style={styles.container}>

            <ListView
                dataSource = {this.state.dataSource}
                style      = {styles.listview}
                renderRow  = {this.renderRow.bind(this)}
                renderSectionHeader = {this.renderSectionHeader.bind(this)}
                contentInset={{bottom:49}}
                keyboardShouldPersistTaps={false}
                keyboardDismissMode='interactive'
            />
            </View>
        );
    }
    renderSectionHeader(sectionData, sectionID) {
        return (
            <View style={styles.section}>
                <Text style={styles.text}>{sectionData}</Text>
            </View>
            );
    }
    render() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return this.renderListView();
    }
    renderRow(rowData, sectionID, rowID) {
        return (
            <TouchableOpacity onPress={this.onPressRow.bind(this,rowData, sectionID)}>
                <View style={styles.rowStyle}>
                    <Text style={styles.rowText}>{rowData.name}</Text>
                </View>
            </TouchableOpacity>
            );
    }
    onPressRow(rowData, sectionID) {
        this.props.selectOption(rowData);
    }
}

var styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    listview:{
        backgroundColor: 'transparent',
        flexWrap: 'nowrap',
    },
    activityIndicator: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3F51B5',
        flexDirection: 'column',
        paddingTop: 25
    },
    headerText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white'
    },
    text: {
        color: '#9e9e9e',
        paddingHorizontal: 8,
        fontSize: 16
    },
    rowStyle: {
        paddingVertical: 10,
        paddingLeft: 16,
        borderTopColor: 'white',
        borderLeftColor: 'white',
        borderRightColor: 'white',
        borderBottomColor: '#E0E0E0',
        borderWidth: 1
    },
    rowText: {
        color: '#212121',
        fontSize: 16
    },
    subText: {
        fontSize: 14,
        color: '#757575'
    },
    section: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 6,
        backgroundColor: '#f5f5f5',
    }
});

module.exports = DirectoryFilterOptionList;
