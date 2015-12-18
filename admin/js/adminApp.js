var myPanel = angular.module('MyPanel',['ngRoute', 'ngAnimate', 'ui.bootstrap','ui.router','ngFileUpload']);
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

        .otherwise({redirectTo:'/'});
});