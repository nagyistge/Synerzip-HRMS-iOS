/**
 * Created by synerzip on 06/08/15.
 */

'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Navigator,
    Component,
    StatusBarIOS
    } = React;

var dataList = [
    {
        title:'C1_Sr. Android Developer_5-8 years',
        position:'Senior Android Developer',
        experience:'1 to 3 years'
    },
    {
        title:'Cam_Postgres SQL Dev_(5+ yrs) ',
        position:'Senior Developer',
        experience:'3 to 5 years'
    },
    {
        title:'RoR/RSPEC Developres',
        position:'Developer',
        experience:'3 to 5 years'
    },
    {
        title:'C1_Java/J2EE Engg',
        position:'Senior J2EE Developer',
        experience:'5 to 8 years'
    },
    {
        title:'Cam_Sr. JavaScript Developer',
        position:'Senior Developer',
        experience:'5+ years'
    },
    {
        title:'CMS_Dev.Net Developer',
        position:'Developer',
        experience:'1 to 3 years'
    },
    {
        title:'CMS_Android Developer',
        position:'Senior Android Developer',
        experience:'3+ years'
    },
    {
        title:'FuelQuest_Java_GWT_Developer',
        position:'Senior Developer',
        experience:'5 to 10 years'
    },
    {
        title:'QSI Angular Developer',
        position:'Developer',
        experience:'1 to 3 years'
    },
    {
        title:'StepOne_React_Developer',
        position:'Senior Developer',
        experience:'1 to 5 years'
    }
];
class VacanciesScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            vacanciesLoaded:false,
            vacanciesListData:{
                data:[],
                totalRecordCount:0,
                offset:10,
                startIndex:0
            },
        }
    }
    fetchVacanciesData(){

        var intervalObj = setInterval(()=>{

                clearInterval(intervalObj);
                this.setState({
                    vacanciesListData:{
                        data:dataList,
                        totalRecordCount:28,
                        offset:10,
                        startIndex:0
                    },
                    vacanciesLoaded:true
                });

                },1000);
    }
    componentDidMount(){
        StatusBarIOS.setStyle('default');
        this.fetchVacanciesData();
    }
    onSearch(searchText){
            this.setState({
                vacanciesListData:{
                    data:[],
                    totalRecordCount:0,
                    offset:10,
                    startIndex:0
                },
                vacanciesLoaded:false
            });

            var intervalObj = setInterval(()=>{

            clearInterval(intervalObj);
            this.setState({
                vacanciesListData:{
                    data:dataList,
                    totalRecordCount:28,
                    offset:10,
                    startIndex:0
                },
                vacanciesLoaded:true
                });

            },1000);
    }
    _renderScene(route,navigator) {
        if (route.index == 0) {
            var VacanciesList = require('./VacanciesList');
            return(
                <VacanciesList navigator={navigator}
                    vacanciesLoaded={this.state.vacanciesLoaded}
                    vacanciesListData={this.state.vacanciesListData}
                    onSearch={this.onSearch.bind(this)}/>
            );
        }
    }
    render(){
        StatusBarIOS.setStyle('default');
        return (
            <Navigator
                initialRoute={{name: 'Vacancies', index: 0}}
                renderScene={(route, navigator) =>
                    this._renderScene(route,navigator)
                }/>

        );
    }
}

var styles = StyleSheet.create({



});

module.exports = VacanciesScreen;
