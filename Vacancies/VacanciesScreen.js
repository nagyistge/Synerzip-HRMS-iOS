/**
 * Created by synerzip on 06/08/15.
 */

'use strict';

var React = require('react-native');

var {
    StyleSheet,
    Navigator,
    Component,
    StatusBarIOS,
    AlertIOS
    } = React;

var dataList = [
    {
        title:'C1_Sr. Android Developer_5-8 years',
        position:'Senior Android Developer',
        experience:'1 to 3 years',
        link:'http://synerzip.com/careers/openings-in-india/senior-android-developer/',
        role:[
            'Be a key developer and deploy fast, next generation mobile application with greater user experience ',
            'Introduce and integrate the cloud business communication solution for multiple user interactions',
            'Ability to face and resolve technical challenges',
            'Provide concrete implementations and write clear, maintainable code using best practices and prepare design documents '
        ],
        skills:{
            technical:{
                mustHave:[
                            '3+ Mobile Development building Android applications',
                            '1+ years of development with proficiency in Java/C/C++',
                            'Should be experienced in working on any of the BaaS APIs',
                            'Excellent understanding of OOPs concepts , Design Patterns',
                            'Should be good at Agile practices and programming techniques including pair programming, test driven equipment, and continuous integration',
                            'Should be experienced in working on real world application published on Appstore',
                            'Good understanding of competitive ecosystem',
                            'Good communication and interpersonal skills are must'
                        ]
            }
    },
        jobId:1
    },
    {
        title:'Cam_Postgres SQL Dev_(5+ yrs) ',
        link:'http://synerzip.com/careers/openings-in-india/ce-senior-postgresql-developer/',
        position:'Senior Developer',
        experience:'3 to 5 years',
        role:[],
        skills:
            {
                technical:{
                    mustHave:[
                        '5+ years experience on database development using Postgres SQL – need to have procedure designing and troubleshooting skills',
                        '3+ years experience on Data modeling and schema designing for customized data warehouses',
                        'Should be aware of/experience on ETL development on open source platform',
                        'Excellent analytical and communication skills'
                    ]
                }
            },
        extraInfo:['Notice Period 30 days at max'],
        jobId:2
    },
    {
        title:'RoR/RSPEC Developres',
        link:'http://synerzip.com/careers/openings-in-india/forus-ror-lead-developer/',
        position:'Developer',
        experience:'3 to 5 years',
        role:[
            'This position is for a team oriented professional who will be responsible for migrating a PHP application to a scalable ROR application.  The first phase will require strong RSPEC skills to write functional test cases to engineer the REST API being provided by the PHP application. These tests will also act as a regression test bed for the ROR application in phase 2.',
            'The candidate will work in a dynamic and agile environment with quick response times.',
            'The position provides opportunities to creatively work with new and innovative technologies.',
            'The candidate will have the opportunity to work both independently and within a team environment, depending on project scope.',
            'Must be highly motivated and capable of keeping current with emerging applications and technologies. ',
            'This position requires strong communication skills, both written and verbal.'
        ],
        skills:
        {
            technical:{
                mustHave:[
                    'Proficient with both the Ruby language and the Rails framework.',
                    'Proficient with RSPEC',
                    'Strong background in relational database design',
                    'Experience building highly-interactive, scalable Ruby on Rails web applications and services',
                    'Strong architectural experience building frameworks and reusable code libraries',
                    'Experience in working with web APIs (XML/JSON)',
                    'Experience working under version control systems. (preferably Git)',
                    'Ability to write efficient, well-structured, well-documented, and reusable code',
                    'Proficiency and solid experience with of HTML5, CSS, JS, AJAX',
                    'Understanding of frameworks, database design/programming',
                    'Ability to present his/her thoughts, skills in a whiteboard discussion or planning poker',
                    'Excellent verbal and written communication is a must.']
            }
        },
        extraInfo:['There will be a final client interview round before hiring is done.  The client interview will be technical in nature.'],
        jobId:3
    },
    {
        title:'CMS_Dev_.NET Windows phone_(1-3)',
        position:'This is a project involving maintaining a product in restaurant/order management system.',
        experience:'5 to 8 years',
        role:[
            'Developer'
        ],
        skills:
        {
            technical:{
                mustHave:[
                    'Experience working as a Windows 8/Windows Phone/Surface developer',
                    'Good knowledge of C# and .Net',
                    'Experience with WPF / Silverlight / XAML and familiar with Metro UI',
                    'Experience leveraging Windows 8 / Windows Phone and native application development',
                    'Experience with development and code debugging in Visual Studio and UI development',
                    'Experience in ADO.NET, SQL Server, Stored procedures',
                    'Experience in writing and executing SQL queries',
                    'Good OOP and coding skills',
                    'Basic knowledge of writing unit test'
                ],
                niceToHave:[
                    'Experience on Third Party control (Dev express etc.) will be added plus',
                    'Experience on Expression Blend will be added plus'
                ]
            },
            nonTechnical:[
                'Should have good debugging skills, Communication skills and should be able to work independently',
                'Ability to work with a team of engineers in cross-functional agile projects',
                'Good problem solving skills in a fast-paced environment'
            ]
        },
        jobId:4
    },
    {
        title:'Cam_Sr. JavaScript Developer',
        position:'Senior Developer',
        experience:'5+ years',
        role:[],
        skills:[],
        jobId:5
    },
    {
        title:'CMS_Dev.Net Developer',
        position:'Developer',
        role:[],
        skills:[],
        experience:'1 to 3 years',
        jobId:6
    },
    {
        title:'CMS_Android Developer',
        position:'Senior Android Developer',
        role:[],
        skills:[],
        experience:'3+ years',
        jobId:7
    },
    {
        title:'FuelQuest_Java_GWT_Developer',
        position:'Senior Developer',
        role:[],
        skills:[],
        experience:'5 to 10 years',
        jobId:8
    },
    {
        title:'QSI Angular Developer',
        position:'Developer',
        role:[],
        skills:[],
        experience:'1 to 3 years',
        jobId:9
    },
    {
        title:'StepOne_React_Developer',
        position:'Senior Developer',
        role:[],
        skills:[],
        experience:'1 to 5 years',
        jobId:10
    }
];
class VacanciesScreen extends React.Component{
    constructor(props) {
        super(props);
        this.uploadRoute = null;
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

    componentWillReceiveProps(nextProps){

        if(nextProps.receivedUrl){
            this.navigator.immediatelyResetRouteStack([{name: 'Upload Resume', index: 2}]);
        }else{
            this.navigator.immediatelyResetRouteStack([{name: 'Vacancies', index: 0}]);
        }
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
        this.navigator = navigator;
        if (route.index == 0) {
            var VacanciesList = require('./VacanciesList');
            return(
                <VacanciesList topNavigator={navigator}
                    vacanciesLoaded={this.state.vacanciesLoaded}
                    vacanciesListData={this.state.vacanciesListData}
                    onSearch={this.onSearch.bind(this)}
                    forUpload={route.forUpload}
                    onUploadSelect={route.onUploadSelect}
                    backToUpload={this.backToUpload.bind(this)}/>
            );
        }else if(route.index == 1){
            var VacanciesDetail = require('./VacanciesDetail');
            return (<VacanciesDetail selectedData={route.passProps.selectedData}
                forUpload={route.forUpload} topNavigator={navigator}
                onUploadSelect={route.onUploadSelect}/>);
        }else if(route.index == 2){
            var UploadResumeScreen = require('./UploadResumeScreen');
            return (<UploadResumeScreen receivedUrl={this.props.receivedUrl} topNavigator={navigator} onUploadCancel={this.props.onUploadCancel}/>);
        }
    }
    backToUpload(){
            this.navigator.pop();

    }
    render(){
        //AlertIOS.alert("Vacancies Scrn:"+this.props.receivedUrl);
        StatusBarIOS.setStyle('default');

        if(this.props.receivedUrl){
                return (
                    <Navigator
                    initialRoute={{name: 'Upload Resume', index: 2}}
                    renderScene={(route, navigator) =>
                    this._renderScene(route,navigator)
                }/>

            );

        }else{

            return (
                <Navigator
                        initialRoute={{name: 'Vacancies', index: 0}}
                        renderScene={(route, navigator) =>
                        this._renderScene(route,navigator)
                        }/>

            );
        }

    }
}

var styles = StyleSheet.create({



});

module.exports = VacanciesScreen;
