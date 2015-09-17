var myPanel = angular.module('MyPanel',['ngRoute', 'ngAnimate', 'ui.bootstrap']);
myPanel.config(function($routeProvider){

    $routeProvider
        .when('/', {
            templateUrl: 'main.html',
            controller: 'panelCotroller'
        })

        .when('/searchstats',{
            templateUrl:'searchStatistics.html',
            controller: 'searchController'
        })

        .when('/adminusers', {
            templateUrl: 'adminussers.html',
            controller: 'adminsControllers'
        })

        .when('/uisettings',{
            templateUrl: 'uisettings.html',
            controller: 'uisettingsController'
        })



        .otherwise({redirectTo:'/'});
});